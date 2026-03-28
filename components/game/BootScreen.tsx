"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TITLE = "Stella ✦ Overflow";
const PARTICLE_COUNT = 8;
const BOOT_DELAY = 800; // ms before logo appears
const LETTER_STAGGER = 0.06; // seconds per letter
const TITLE_DURATION = TITLE.length * LETTER_STAGGER;
const PROGRESS_DURATION = 1.5; // seconds
const FADE_OUT_DURATION = 0.5;

function StarParticle({ index }: { index: number }) {
  const angle = (index / PARTICLE_COUNT) * Math.PI * 2;
  const distance = 80 + Math.random() * 40;
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return (
    <motion.span
      className="absolute"
      style={{
        fontSize: "0.8rem",
        color: "var(--pink-accent)",
        left: "50%",
        top: "50%",
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x, y, opacity: 0, scale: 0.3 }}
      transition={{
        duration: 0.8,
        delay: TITLE_DURATION * 0.6,
        ease: "easeOut",
      }}
    >
      ✦
    </motion.span>
  );
}

export default function BootScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<
    "black" | "logo" | "progress" | "done"
  >("black");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase 1: black screen
    const t1 = setTimeout(() => setPhase("logo"), BOOT_DELAY);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "logo") return;
    // After title finishes, start progress bar
    const t = setTimeout(
      () => setPhase("progress"),
      (TITLE_DURATION + 0.5) * 1000
    );
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "progress") return;
    // Animate progress 0→100
    const start = Date.now();
    const duration = PROGRESS_DURATION * 1000;
    const frame = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct * 100);
      if (pct < 1) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => setPhase("done"), 200);
      }
    };
    requestAnimationFrame(frame);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(onComplete, FADE_OUT_DURATION * 1000);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" ? (
        <motion.div
          key="boot"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "var(--pink-dark)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_DURATION }}
        >
          {/* Logo */}
          {(phase === "logo" || phase === "progress") && (
            <div className="relative mb-8">
              {/* Star particles */}
              <div className="pointer-events-none absolute inset-0">
                {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
                  <StarParticle key={i} index={i} />
                ))}
              </div>

              {/* Title letter by letter */}
              <h1
                className="relative"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "2rem",
                  fontStyle: "italic",
                  color: "var(--pink-soft)",
                }}
              >
                {TITLE.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * LETTER_STAGGER,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>
            </div>
          )}

          {/* Subtitle + progress bar */}
          {phase === "progress" && (
            <motion.div
              className="flex w-64 flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  color: "var(--pink-soft)",
                  opacity: 0.7,
                }}
              >
                initialisation...
              </span>

              {/* Progress bar */}
              <div
                className="w-full overflow-hidden rounded-full"
                style={{
                  height: "6px",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255, 214, 224, 0.15)",
                }}
              >
                <div
                  className="h-full rounded-full transition-none"
                  style={{
                    width: `${progress}%`,
                    background:
                      "linear-gradient(to right, var(--pink-accent), var(--teal))",
                  }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
