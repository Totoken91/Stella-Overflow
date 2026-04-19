"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Howler } from "howler";
import styles from "@/styles/vn.module.css";

interface PreMenuProps {
  onStart: () => void;
}

/**
 * Click-to-start overlay. Satisfies the browser's autoplay gesture
 * requirement so the main menu music can play. Also resumes any
 * suspended AudioContext (Howler's global trick).
 */
export default function PreMenu({ onStart }: PreMenuProps) {
  const [leaving, setLeaving] = useState(false);

  const handleClick = () => {
    if (leaving) return;
    setLeaving(true);

    // Unlock Howler's audio context. It normally unlocks on the first
    // user gesture automatically, but calling this explicitly is safe
    // and makes the path deterministic.
    try {
      // @ts-expect-error Howler's context is not typed publicly
      const ctx: AudioContext | undefined = Howler.ctx;
      if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
    } catch {
      /* noop */
    }

    // Fade the overlay out, then hand off to the main menu so its
    // MusicPlayer can mount under a real user gesture.
    setTimeout(onStart, 400);
  };

  return (
    <motion.div
      className={`${styles.metaScreen} fixed inset-0 z-[200] flex items-center justify-center cursor-pointer`}
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={handleClick}
      aria-label="Cliquer pour commencer"
      role="button"
    >
      <div className={styles.metaScreenGlow} />
      <div className={styles.metaGrain} />

      <motion.div
        className="relative z-20 flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
      >
        <motion.div
          style={{
            width: 48,
            height: 48,
            color: "#ff3d7f",
            filter: "drop-shadow(0 0 16px rgba(255, 61, 127, 0.5))",
          }}
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: { duration: 2.4, ease: "easeInOut", repeat: Infinity },
            rotate: { duration: 12, ease: "linear", repeat: Infinity },
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
          </svg>
        </motion.div>

        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(244, 237, 228, 0.45)",
            animation: "subtitlePulse 2.4s ease-in-out infinite",
            marginTop: "0.5rem",
          }}
        >
          cliquer pour commencer
        </p>
      </motion.div>
    </motion.div>
  );
}
