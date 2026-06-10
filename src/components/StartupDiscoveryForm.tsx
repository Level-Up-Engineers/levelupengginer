import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const StartupDiscoveryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startupName: "",
    stage: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "startup",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          startupName: formData.startupName,
          topic: formData.stage,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Submission failed");
      }

      toast({
        title: "Discovery call request received! 🚀",
        description: "Our team will reach out within 24 hours to schedule your free session.",
      });
      setFormData({ name: "", email: "", phone: "", startupName: "", stage: "", message: "" });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again, or reach us directly at contact@levelupengineers.com.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Your Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
      <Input
        placeholder="Startup / Product Name (optional)"
        value={formData.startupName}
        onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
      />
      <Select value={formData.stage} onValueChange={(val) => setFormData({ ...formData, stage: val })}>
        <SelectTrigger>
          <SelectValue placeholder="What stage are you at?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="idea">Just an Idea — haven't started yet</SelectItem>
          <SelectItem value="validation">Validating with early users</SelectItem>
          <SelectItem value="mvp">Building the MVP</SelectItem>
          <SelectItem value="live">Launched & looking to scale</SelectItem>
          <SelectItem value="fundraising">Fundraising — need a demo-ready product</SelectItem>
        </SelectContent>
      </Select>
      <Textarea
        placeholder="Tell us briefly what you're building and what help you need…"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        rows={4}
      />
      <Button type="submit" className="w-full" size="lg" disabled={submitting}>
        {submitting ? "Submitting…" : "Book My Free Discovery Call"}
      </Button>
    </form>
  );
};

export default StartupDiscoveryForm;
