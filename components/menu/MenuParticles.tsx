"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Subtle rose embers drifting upward across the title screen.
 * Canvas-based for perf (15-20 particles, no external lib).
 * Respects prefers-reduced-motion by rendering a static dusting.
 */
export default function MenuParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Ember {
      x = 0;
      y = 0;
      size = 0;
      speed = 0;
      opacity = 0;
      glow = false;
      phase = 0;

      constructor(init: boolean) {
        this.reset(init);
      }

      reset(init: boolean) {
        this.x = Math.random() * window.innerWidth;
        this.y = init
          ? Math.random() * window.innerHeight
          : window.innerHeight + 20;
        this.size = Math.random() * 1.8 + 0.8;
        this.speed = Math.random() * 0.35 + 0.12; // slow upward drift
        this.opacity = Math.random() * 0.25 + 0.15;
        this.glow = Math.random() < 0.22;
        this.phase = Math.random() * Math.PI * 2;
      }

      step() {
        this.y -= this.speed;
        // Tiny horizontal sway
        this.x += Math.sin(this.phase) * 0.18;
        this.phase += 0.015;
        if (this.y < -20) this.reset(false);
      }

      draw(c: CanvasRenderingContext2D) {
        const pulsed = this.glow
          ? this.opacity * (0.65 + 0.35 * Math.sin(this.phase * 1.4))
          : this.opacity;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(255, 61, 127, ${pulsed})`;
        c.fill();
        if (this.glow) {
          c.beginPath();
          c.arc(this.x, this.y, this.size * 3.2, 0, Math.PI * 2);
          c.fillStyle = `rgba(255, 61, 127, ${pulsed * 0.16})`;
          c.fill();
        }
      }
    }

    const embers = Array.from({ length: 18 }, () => new Ember(true));

    if (reducedMotion) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      embers.forEach((e) => e.draw(ctx));
      return () => window.removeEventListener("resize", resize);
    }

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const e of embers) {
        e.step();
        e.draw(ctx);
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 13 }}
      aria-hidden
    />
  );
}
