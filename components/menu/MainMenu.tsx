"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSaveStore } from "@/lib/saveStore";
import SaveLoadMenu from "./SaveLoadMenu";

// ─── Particles canvas ───
function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const COLORS = [
      [255, 214, 224],
      [127, 216, 216],
      [196, 184, 232],
      [255, 255, 255],
    ];

    class Particle {
      x = 0; y = 0; size = 0; speedY = 0; speedX = 0;
      opacity = 0; maxOpacity = 0; fadeSpeed = 0;
      phase = 0; wobble = 0; color = COLORS[0]; fadingIn = true;

      constructor(init: boolean) { this.reset(init); }
      reset(init: boolean) {
        this.x = Math.random() * w;
        this.y = init ? Math.random() * h : h + 10;
        this.size = Math.random() * 1.5 + 0.3;
        this.speedY = -(Math.random() * 0.3 + 0.1);
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.5 + 0.1;
        this.fadeSpeed = Math.random() * 0.003 + 0.001;
        this.phase = Math.random() * Math.PI * 2;
        this.wobble = Math.random() * 0.3 + 0.1;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.fadingIn = true;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.phase) * this.wobble * 0.02;
        this.phase += 0.01;
        if (this.fadingIn) {
          this.opacity += this.fadeSpeed * 2;
          if (this.opacity >= this.maxOpacity) {
            this.opacity = this.maxOpacity;
            this.fadingIn = false;
          }
        }
        if (this.y < -10 || this.opacity <= 0) this.reset(false);
      }
      draw(c: CanvasRenderingContext2D) {
        const [r, g, b] = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(${r},${g},${b},${this.opacity})`;
        c.fill();
        if (this.size > 1) {
          c.beginPath();
          c.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
          c.fillStyle = `rgba(${r},${g},${b},${this.opacity * 0.15})`;
          c.fill();
        }
      }
    }

    const particles = Array.from({ length: 60 }, () => new Particle(true));
    let raf: number;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => { p.update(); p.draw(ctx); });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}

// ─── Menu buttons config ───
const MENU_BUTTONS = [
  { key: "new", label: "Nouvelle partie", primary: true },
  { key: "continue", label: "Continuer", primary: false },
  { key: "load", label: "Charger", primary: false },
  { key: "quit", label: "Quitter", primary: false },
] as const;

// ─── Custom cursor ───
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("ontouchstart" in window) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mx = -100, my = -100, cx = -100, cy = -100;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMove);

    // Hover detection for buttons
    const btns = document.querySelectorAll(".menu-btn");
    const enter = () => cursor.classList.add("hovering");
    const leave = () => cursor.classList.remove("hovering");
    btns.forEach((b) => {
      b.addEventListener("mouseenter", enter);
      b.addEventListener("mouseleave", leave);
    });

    let raf: number;
    const animate = () => {
      cx = lerp(cx, mx, 0.12);
      cy = lerp(cy, my, 0.12);
      cursor.style.left = cx + "px";
      cursor.style.top = cy + "px";
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      btns.forEach((b) => {
        b.removeEventListener("mouseenter", enter);
        b.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor">
      <div className="cursor-dot" />
      <div className="cursor-ring" />
    </div>
  );
}

export default function MainMenu() {
  const router = useRouter();
  const loadSlots = useSaveStore((s) => s.loadSlots);
  const hasAutosave = useSaveStore((s) => s.hasAutosave);
  const setPendingLoad = useSaveStore((s) => s.setPendingLoad);
  const [exiting, setExiting] = useState(false);
  const [loadMenuOpen, setLoadMenuOpen] = useState(false);
  const [autosaveExists, setAutosaveExists] = useState(false);

  useEffect(() => { loadSlots(); }, [loadSlots]);
  useEffect(() => { setAutosaveExists(hasAutosave()); }, [hasAutosave]);

  const navigateToGame = useCallback(() => {
    sessionStorage.setItem("stella-from-menu", "1");
    setExiting(true);
    setTimeout(() => router.push("/game"), 400);
  }, [router]);

  const handleClick = (key: string) => {
    switch (key) {
      case "new":
        setPendingLoad(null);
        navigateToGame();
        break;
      case "continue":
        if (autosaveExists) { setPendingLoad(0); } else { setPendingLoad(null); }
        navigateToGame();
        break;
      case "load":
        setLoadMenuOpen(true);
        break;
      case "quit":
        window.close();
        break;
    }
  };

  const handleLoadSlot = (slotId: number) => {
    setPendingLoad(slotId);
    setLoadMenuOpen(false);
    navigateToGame();
  };

  return (
    <motion.div
      className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "#1A0E1A" }}
      animate={exiting ? { opacity: 0, scale: 0.98 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <ParticlesCanvas />

      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: "50vmax", height: "50vmax",
            background: "radial-gradient(circle, rgba(224,92,138,0.25) 0%, transparent 70%)",
            top: "-15%", right: "-10%",
            filter: "blur(100px)",
            animation: "orbFloat1 20s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "40vmax", height: "40vmax",
            background: "radial-gradient(circle, rgba(127,216,216,0.15) 0%, transparent 70%)",
            bottom: "-20%", left: "-10%",
            filter: "blur(100px)",
            animation: "orbFloat2 25s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "35vmax", height: "35vmax",
            background: "radial-gradient(circle, rgba(196,184,232,0.12) 0%, transparent 70%)",
            top: "30%", left: "40%",
            filter: "blur(100px)",
            animation: "orbFloat3 22s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[2]" />

      {/* Scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-[4]"
        style={{
          background:
            "repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-[3]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,5,10,0.7) 100%)",
        }}
      />

      {/* Menu content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Title */}
        <motion.div
          className="mb-3 text-center"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              letterSpacing: "0.06em",
              lineHeight: 1,
              color: "var(--pink-soft)",
              textShadow:
                "0 0 60px rgba(224,92,138,0.3), 0 0 120px rgba(224,92,138,0.1)",
            }}
          >
            Stella{" "}
            <span
              style={{
                display: "inline-block",
                color: "var(--teal)",
                fontStyle: "normal",
                fontSize: "0.5em",
                verticalAlign: "middle",
                margin: "0 0.15em",
                position: "relative",
                top: "-0.05em",
                filter: "drop-shadow(0 0 12px rgba(127,216,216,0.6))",
                animation: "starPulse 3s ease-in-out infinite",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1em", height: "1em" }}>
                <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
              </svg>
            </span>{" "}
            Overflow
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(0.85rem, 2vw, 1.15rem)",
            color: "rgba(255,214,224,0.5)",
            letterSpacing: "0.08em",
            marginBottom: "3.5rem",
          }}
        >
          Tu n'es pas le h&eacute;ros. Tu es celui qui d&eacute;cide si elle le devient.
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-2.5" style={{ width: "min(320px, 80vw)" }}>
          {MENU_BUTTONS.map((btn, i) => (
            <motion.button
              key={btn.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 + i * 0.15 }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClick(btn.key)}
              className={`group relative w-full overflow-hidden py-3.5 text-center menu-btn ${btn.primary ? "menu-btn--primary" : ""}`}
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "0.72rem",
                fontWeight: 300,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: btn.primary
                  ? "var(--pink-soft)"
                  : "rgba(255,214,224,0.7)",
                background: btn.primary
                  ? "rgba(224,92,138,0.08)"
                  : "rgba(255,255,255,0.06)",
                border: btn.primary
                  ? "1px solid rgba(255,143,171,0.2)"
                  : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* Top shimmer line */}
              <span
                className="absolute left-[-100%] top-0 h-px w-full transition-[left] duration-500 group-hover:left-[100%]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--pink-deep), transparent)",
                }}
              />
              {/* Bottom shimmer line */}
              <span
                className="absolute bottom-0 right-[-100%] h-px w-full transition-[right] duration-500 group-hover:right-[100%]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--teal), transparent)",
                }}
              />
              {btn.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Credits */}
      <motion.div
        className="fixed bottom-6 left-8 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "0.55rem",
          letterSpacing: "0.1em",
          color: "rgba(255,214,224,0.2)",
        }}
      >
        totoken &middot; virgind3stroy3r
      </motion.div>

      {/* Version */}
      <motion.div
        className="fixed bottom-6 right-8 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "0.55rem",
          letterSpacing: "0.15em",
          color: "rgba(255,214,224,0.2)",
        }}
      >
        v0.1 — demo
      </motion.div>

      <SaveLoadMenu
        mode="load"
        open={loadMenuOpen}
        onClose={() => setLoadMenuOpen(false)}
        onLoadSlot={handleLoadSlot}
      />

      <CustomCursor />
    </motion.div>
  );
}
