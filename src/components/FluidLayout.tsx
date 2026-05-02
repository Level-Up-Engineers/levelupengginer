import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface FluidLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const FluidLayout = ({ children, className = "" }: FluidLayoutProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const simulationStarted = useRef(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || simulationStarted.current) return;

    let cleanup: (() => void) | undefined;

    const init = async () => {
      try {
        const { default: webglFluid } = await import("webgl-fluid");
        simulationStarted.current = true;

        webglFluid(canvas, {
          SIM_RESOLUTION: 128,
          DYE_RESOLUTION: 1024,
          CAPTURE_RESOLUTION: 512,
          DENSITY_DISSIPATION: 1.1,
          VELOCITY_DISSIPATION: 0.75,
          PRESSURE: 0.8,
          PRESSURE_ITERATIONS: 20,
          CURL: 14,
          SPLAT_RADIUS: 0.22,
          SPLAT_FORCE: 16000,
          SHADING: true,
          COLORFUL: false,
          COLOR_UPDATE_SPEED: 2,
          PAUSED: false,
          BACK_COLOR: { r: 2, g: 8, b: 18 },
          TRANSPARENT: true,
          BLOOM: true,
          BLOOM_ITERATIONS: 5,
          BLOOM_RESOLUTION: 256,
          BLOOM_INTENSITY: 0.6,
          BLOOM_THRESHOLD: 0.75,
          BLOOM_SOFT_KNEE: 0.7,
          SUNRAYS: false,
        });

        // canvas is position:fixed at (0,0) → offsetX === clientX exactly
        const fire = (type: string, clientX: number, clientY: number) => {
          const evt = new MouseEvent(type, { clientX, clientY, bubbles: true, cancelable: true });
          Object.defineProperty(evt, "offsetX", { get: () => clientX });
          Object.defineProperty(evt, "offsetY", { get: () => clientY });
          canvas.dispatchEvent(evt);
        };

        const setOpacity = (v: number) => {
          canvas.style.opacity = String(v);
          canvas.style.transition = "opacity 0.8s ease-out";
        };

        // Restrict visible fluid area to hero container bounds
        const clip = () => {
          const r = container.getBoundingClientRect();
          canvas.style.clipPath = `inset(${Math.round(r.top)}px ${Math.round(window.innerWidth - r.right)}px ${Math.round(window.innerHeight - r.bottom)}px ${Math.round(r.left)}px)`;
        };
        clip();

        const moveCursor = (cx: number, cy: number) => {
          if (cursorDotRef.current) { cursorDotRef.current.style.left = `${cx}px`; cursorDotRef.current.style.top = `${cy}px`; }
          if (cursorRingRef.current) { cursorRingRef.current.style.left = `${cx}px`; cursorRingRef.current.style.top = `${cy}px`; }
        };

        const showCursor = () => {
          if (cursorDotRef.current) cursorDotRef.current.style.opacity = "1";
          if (cursorRingRef.current) cursorRingRef.current.style.opacity = "1";
        };

        const hideCursor = () => {
          if (cursorDotRef.current) cursorDotRef.current.style.opacity = "0";
          if (cursorRingRef.current) cursorRingRef.current.style.opacity = "0";
        };

        // webgl-fluid only injects dye when pointer.down === true.
        // Keep pointer "pressed" the whole time cursor is inside the hero.
        const onEnter = (e: MouseEvent) => {
          showCursor();
          setOpacity(0.65);
          fire("mousedown", e.clientX, e.clientY);
        };

        const onLeave = (e: MouseEvent) => {
          hideCursor();
          setOpacity(0.18);
          fire("mouseup", e.clientX, e.clientY);
        };

        const onMove = (e: MouseEvent) => {
          moveCursor(e.clientX, e.clientY);
          fire("mousemove", e.clientX, e.clientY);
        };

        container.addEventListener("mouseenter", onEnter);
        container.addEventListener("mouseleave", onLeave);
        container.addEventListener("mousemove", onMove);
        window.addEventListener("scroll", clip, { passive: true });
        window.addEventListener("resize", clip, { passive: true });

        // Idle ambient splats
        const idleInterval = setInterval(() => {
          if (Math.random() > 0.72) {
            const r = container.getBoundingClientRect();
            const cx = r.left + Math.random() * r.width;
            const cy = r.top + Math.random() * r.height;
            fire("mousedown", cx, cy);
            setTimeout(() => {
              fire("mousemove", cx + (Math.random() - 0.5) * 40, cy + (Math.random() - 0.5) * 40);
              setTimeout(() => fire("mouseup", cx, cy), 80);
            }, 40);
          }
        }, 3500);

        cleanup = () => {
          container.removeEventListener("mouseenter", onEnter);
          container.removeEventListener("mouseleave", onLeave);
          container.removeEventListener("mousemove", onMove);
          window.removeEventListener("scroll", clip);
          window.removeEventListener("resize", clip);
          clearInterval(idleInterval);
        };
      } catch (err) {
        console.warn("FluidLayout: init failed", err);
      }
    };

    init();
    return () => { if (cleanup) cleanup(); };
  }, [mounted]);

  const isLight = resolvedTheme === "light";

  return (
    <>
      {mounted && (
        <canvas
          ref={canvasRef}
          className={`fixed inset-0 w-screen h-screen pointer-events-none z-[1] ${
            isLight
              ? "invert grayscale brightness-75 contrast-[1.8]"
              : ""
          }`}
          style={{ opacity: 0.18, transition: "opacity 1s ease-out" }}
        />
      )}

      <div ref={cursorDotRef} style={{
        position: "fixed", width: 10, height: 10, borderRadius: "50%",
        background: "#34d399", pointerEvents: "none", zIndex: 9999,
        opacity: 0, transform: "translate(-50%,-50%)",
        mixBlendMode: "screen", transition: "opacity 0.2s", willChange: "left,top",
      }} />
      <div ref={cursorRingRef} style={{
        position: "fixed", width: 36, height: 36, borderRadius: "50%",
        border: "2px solid rgba(52,211,153,0.5)", pointerEvents: "none", zIndex: 9998,
        opacity: 0, transform: "translate(-50%,-50%)",
        transition: "left 0.08s ease-out, top 0.08s ease-out, opacity 0.3s",
        willChange: "left,top",
      }} />

      <div ref={containerRef} className={`relative z-10 ${className}`} style={{ cursor: "none" }}>
        {children}
      </div>
    </>
  );
};

export default FluidLayout;
