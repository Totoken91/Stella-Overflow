"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function AutosaveIndicator({
  visible,
}: {
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 left-4 z-[55] rounded-full px-3 py-1.5"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(127, 216, 216, 0.3)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.08em",
              color: "var(--teal-dark)",
            }}
          >
            ✦ sauvegarde auto...
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
