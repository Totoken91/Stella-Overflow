"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MusicPlayer from "@/components/game/MusicPlayer";
import styles from "@/styles/vn.module.css";

export type LoadingContext =
  | "initial"
  | "save_load"
  | "dissociation"
  | "ending"
  | "scene_transition";

const STATUS_MAP: Record<LoadingContext, string> = {
  initial: "initialisation",
  save_load: "récupération du fil",
  dissociation: "fragmentation en cours",
  ending: "réunion des éclats",
  scene_transition: "passage",
};

const BOOT_DELAY = 400;
const PROGRESS_DURATION = 1.5;
const FADE_OUT_DURATION = 0.8;

interface BootScreenProps {
  onComplete: () => void;
  context?: LoadingContext;
}

export default function BootScreen({
  onComplete,
  context = "initial",
}: BootScreenProps) {
  const [phase, setPhase] = useState<"black" | "progress" | "done">("black");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPhase("progress"), BOOT_DELAY);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "progress") return;
    const start = Date.now();
    const duration = PROGRESS_DURATION * 1000;
    let raf = 0;
    const frame = () => {
      const pct = Math.min((Date.now() - start) / duration, 1);
      setProgress(pct * 100);
      if (pct < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        setTimeout(() => setPhase("done"), 200);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(onComplete, FADE_OUT_DURATION * 1000);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  const status = STATUS_MAP[context];

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="boot"
          className={`${styles.metaScreen} z-50`}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_DURATION }}
        >
          <MusicPlayer track="theme-boot" volume={0.45} fadeMs={300} />
          <div className={styles.metaScreenGlow} />
          <div className={styles.metaGrain} />

          <div className={styles.loadingStage}>
            {/* Central star */}
            <motion.svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className={styles.loadingStar}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              aria-hidden
            >
              <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
            </motion.svg>

            {/* Progress bar */}
            {phase === "progress" && (
              <motion.div
                className={styles.loadingBar}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={styles.loadingBarFill}
                  style={{ width: `${progress}%` }}
                />
              </motion.div>
            )}

            {/* Status text with animated dots */}
            {phase === "progress" && (
              <motion.span
                className={styles.loadingStatus}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {status}
                <span className={styles.loadingDots} aria-hidden>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </motion.span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
