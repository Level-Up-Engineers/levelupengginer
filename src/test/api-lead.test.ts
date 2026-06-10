import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import handler from "../../api/lead";

const mockRes = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("/api/lead", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, status: 200, text: async () => "" })
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("rejects non-POST requests", async () => {
    const res = mockRes();
    await handler({ method: "GET" }, res);
    expect(res.status).toHaveBeenCalledWith(405);
  });

  it("rejects submissions missing required fields", async () => {
    const res = mockRes();
    await handler({ method: "POST", body: { name: "A", email: "a@b.com" } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("rejects invalid email addresses", async () => {
    const res = mockRes();
    await handler(
      { method: "POST", body: { name: "A", email: "not-an-email", phone: "123" } },
      res
    );
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 500 when RESEND_API_KEY is not configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = mockRes();
    await handler(
      { method: "POST", body: { name: "A", email: "a@b.com", phone: "123" } },
      res
    );
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("sends a counseling lead email to the team and returns 200", async () => {
    const res = mockRes();
    await handler(
      {
        method: "POST",
        body: {
          mode: "counseling",
          name: "Rahul Kumar",
          email: "rahul@example.com",
          phone: "+91 9999999999",
          course: "generative-ai",
          message: "Interested in the internship track",
        },
      },
      res
    );

    expect(fetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({ method: "POST" })
    );
    const payload = JSON.parse((fetch as any).mock.calls[0][1].body);
    expect(payload.to).toEqual(["contact@levelupengineers.com"]);
    expect(payload.reply_to).toBe("rahul@example.com");
    expect(payload.subject).toBe("New Course Lead: Rahul Kumar – generative-ai");
    expect(payload.html).toContain("generative-ai");
    expect(payload.html).toContain("Interested in the internship track");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });

  it("sends a startup lead email with startup fields", async () => {
    const res = mockRes();
    await handler(
      {
        method: "POST",
        body: {
          mode: "startup",
          name: "Priya",
          email: "priya@example.com",
          phone: "123",
          startupName: "Acme AI",
          topic: "MVP Development",
        },
      },
      res
    );

    const payload = JSON.parse((fetch as any).mock.calls[0][1].body);
    expect(payload.subject).toBe("New Startup Studio Lead: Priya – MVP Development");
    expect(payload.html).toContain("Acme AI");
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("returns 502 when the email service fails", async () => {
    (fetch as any).mockResolvedValue({ ok: false, status: 401, text: async () => "bad key" });
    const res = mockRes();
    await handler(
      { method: "POST", body: { name: "A", email: "a@b.com", phone: "123" } },
      res
    );
    expect(res.status).toHaveBeenCalledWith(502);
  });

  it("escapes HTML in user-provided fields", async () => {
    const res = mockRes();
    await handler(
      {
        method: "POST",
        body: {
          name: "<script>alert(1)</script>",
          email: "a@b.com",
          phone: "123",
        },
      },
      res
    );
    const payload = JSON.parse((fetch as any).mock.calls[0][1].body);
    expect(payload.html).not.toContain("<script>");
    expect(payload.html).toContain("&lt;script&gt;");
  });
});
