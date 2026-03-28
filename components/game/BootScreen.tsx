"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TITLE_PARTS = [
  { text: "Stella ", type: "word" },
  { text: "✦", type: "star" },
  { text: " Overflow", type: "word" },
];

const PARTICLE_COUNT = 8;
const BOOT_DELAY = 800;
const LETTER_STAGGER = 0.06;
const PROGRESS_DURATION = 1.5;
const FADE_OUT_DURATION = 0.5;

// Count total letters for timing
const TOTAL_LETTERS = TITLE_PARTS.reduce(
  (sum, p) => sum + p.text.length,
  0
);
const TITLE_DURATION = TOTAL_LETTERS * LETTER_STAGGER;

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
        filter: "drop-shadow(0 0 6px rgba(255,143,171,0.8))",
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
    const t1 = setTimeout(() => setPhase("logo"), BOOT_DELAY);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "logo") return;
    const t = setTimeout(
      () => setPhase("progress"),
      (TITLE_DURATION + 0.5) * 1000
    );
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "progress") return;
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

  // Build letter array with global index for stagger
  let globalIndex = 0;
  const letters = TITLE_PARTS.flatMap((part) =>
    part.text.split("").map((char) => ({
      char,
      type: part.type,
      index: globalIndex++,
    }))
  );

  return (
    <AnimatePresence>
      {phase !== "done" ? (
        <motion.div
          key="boot"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#1A0A1E" }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_DURATION }}
        >
          {/* Mesh blobs — visible during boot */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute rounded-full"
              style={{
                width: "50vmax",
                height: "50vmax",
                background: "rgba(255, 214, 224, 0.4)",
                top: "-15%",
                left: "-15%",
                filter: "blur(90px)",
                animation:
                  "blobMove1 18s ease-in-out infinite alternate",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: "45vmax",
                height: "45vmax",
                background: "rgba(212, 206, 240, 0.4)",
                top: "35%",
                right: "-15%",
                filter: "blur(90px)",
                animation:
                  "blobMove2 22s ease-in-out infinite alternate",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: "42vmax",
                height: "42vmax",
                background: "rgba(127, 216, 216, 0.4)",
                bottom: "-15%",
                left: "25%",
                filter: "blur(90px)",
                animation:
                  "blobMove3 20s ease-in-out infinite alternate",
              }}
            />
          </div>

          {/* Logo */}
          {(phase === "logo" || phase === "progress") && (
            <div className="relative z-10 mb-8">
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
                {letters.map((l, i) => {
                  if (l.type === "star" && l.char === "✦") {
                    return (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: l.index * LETTER_STAGGER,
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                        style={{
                          display: "inline-block",
                          color: "var(--teal)",
                          fontSize: "1.5em",
                          verticalAlign: "middle",
                          filter:
                            "drop-shadow(0 0 10px rgba(127,216,216,0.8))",
                          animation:
                            "spin 4s linear infinite",
                        }}
                      >
                        ✦
                      </motion.span>
                    );
                  }

                  return (
                    <motion.span
                      key={i}
                      initial={{
                        opacity: 0,
                        y: 10,
                        filter:
                          "drop-shadow(0 0 0px rgba(255,143,171,0))",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: [
                          "drop-shadow(0 0 0px rgba(255,143,171,0))",
                          "drop-shadow(0 0 8px rgba(255,143,171,0.9))",
                          "drop-shadow(0 0 4px rgba(255,143,171,0.4))",
                        ],
                      }}
                      transition={{
                        delay: l.index * LETTER_STAGGER,
                        duration: 0.5,
                        ease: "easeOut",
                        filter: {
                          delay: l.index * LETTER_STAGGER,
                          duration: 0.8,
                          times: [0, 0.4, 1],
                        },
                      }}
                      style={{ display: "inline-block" }}
                    >
                      {l.char === " " ? "\u00A0" : l.char}
                    </motion.span>
                  );
                })}
              </h1>
            </div>
          )}

          {/* Subtitle + progress bar */}
          {phase === "progress" && (
            <motion.div
              className="z-10 flex flex-col items-center gap-3"
              style={{ width: 320 }}
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
                  animation:
                    "subtitlePulse 2s ease-in-out infinite",
                }}
              >
                initialisation...
              </span>

              {/* Progress bar */}
              <div
                className="relative w-full overflow-hidden rounded-full"
                style={{
                  height: "6px",
                  background: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background:
                      "linear-gradient(to right, var(--pink-accent), var(--teal))",
                    transition: "width 16ms linear",
                    position: "relative",
                    overflow: "hidden",
                  }}
                />
                {/* Shimmer overlay on the filled portion */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                    animation:
                      "progressShimmer 1.2s ease-in-out infinite",
                    clipPath: `inset(0 ${100 - progress}% 0 0)`,
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
