"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AutosaveToastProps {
  visible: boolean;
  onHide: () => void;
}

export default function AutosaveToast({ visible, onHide }: AutosaveToastProps) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onHide, 1200);
    return () => clearTimeout(t);
  }, [visible, onHide]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.7, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-5 left-5 z-[60] flex items-center gap-2 pointer-events-none"
          style={{
            background: "rgba(26, 10, 30, 0.6)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(127, 216, 216, 0.2)",
            borderRadius: "6px",
            padding: "0.35rem 0.75rem",
          }}
        >
          <span style={{ color: "var(--teal)", fontSize: "0.6rem" }}>✦</span>
          <span
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255, 214, 224, 0.6)",
            }}
          >
            Sauvegardé
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
