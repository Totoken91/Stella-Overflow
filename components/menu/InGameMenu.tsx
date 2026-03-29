"use client";

import { motion, AnimatePresence } from "framer-motion";

interface InGameMenuProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  onLoad: () => void;
  onReturnToMenu: () => void;
}

const BUTTONS = [
  { key: "save", label: "SAUVEGARDER" },
  { key: "load", label: "CHARGER" },
  { key: "return", label: "RETOUR AU MENU" },
  { key: "resume", label: "REPRENDRE" },
] as const;

export default function InGameMenu({
  open,
  onClose,
  onSave,
  onLoad,
  onReturnToMenu,
}: InGameMenuProps) {
  const handleClick = (key: string) => {
    switch (key) {
      case "save":
        onSave();
        break;
      case "load":
        onLoad();
        break;
      case "return":
        onReturnToMenu();
        break;
      case "resume":
        onClose();
        break;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[65] flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            background: "rgba(10, 4, 14, 0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
          onClick={onClose}
        >
          <div
            className="flex flex-col gap-3"
            style={{ width: 240 }}
            onClick={(e) => e.stopPropagation()}
          >
            {BUTTONS.map((btn, i) => (
              <motion.button
                key={btn.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleClick(btn.key)}
                className="w-full rounded-xl py-3.5 text-center transition-all"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.15em",
                  color: "var(--pink-soft)",
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 143, 171, 0.2)",
                }}
              >
                {btn.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
