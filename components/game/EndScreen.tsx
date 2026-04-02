"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface EndScreenProps {
  visible: boolean;
  variant?: "act-end" | "game-over";
  onExit: () => void;
}

export default function EndScreen({
  visible,
  variant = "act-end",
  onExit,
}: EndScreenProps) {
  const [clickable, setClickable] = useState(false);

  useEffect(() => {
    if (!visible) {
      setClickable(false);
      return;
    }
    const t = setTimeout(() => setClickable(true), 2000);
    return () => clearTimeout(t);
  }, [visible]);

  const isGameOver = variant === "game-over";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-0 z-[50] flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{
            background: isGameOver
              ? "rgba(8, 4, 12, 0.95)"
              : "rgba(26, 10, 30, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            cursor: clickable ? "pointer" : "default",
          }}
          onClick={clickable ? onExit : undefined}
        >
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.8rem",
              fontStyle: "italic",
              color: isGameOver
                ? "rgba(255, 214, 224, 0.5)"
                : "var(--pink-soft)",
              textShadow: isGameOver
                ? "none"
                : "0 0 20px rgba(255, 143, 171, 0.4)",
              marginBottom: "1rem",
            }}
          >
            {isGameOver ? "Tu es qui, déjà ?" : "À suivre..."}
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: clickable ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              color: "rgba(255, 179, 198, 0.4)",
            }}
          >
            cliquer pour revenir au menu
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
