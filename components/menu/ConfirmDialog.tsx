"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "rgba(10, 4, 14, 0.8)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mx-4 w-full max-w-sm rounded-2xl p-6"
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 143, 171, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="mb-2"
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.1rem",
                color: "var(--pink-dark)",
              }}
            >
              {title}
            </h3>
            <p
              className="mb-5"
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "0.8rem",
                color: "var(--foreground)",
                opacity: 0.7,
              }}
            >
              {message}
            </p>
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 rounded-xl py-2.5 transition-colors"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "0.8rem",
                  background: "rgba(255, 255, 255, 0.5)",
                  border: "1px solid rgba(255, 143, 171, 0.15)",
                  color: "var(--foreground)",
                }}
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl py-2.5 transition-colors"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "0.8rem",
                  background: "rgba(224, 92, 138, 0.15)",
                  border: "1px solid rgba(224, 92, 138, 0.4)",
                  color: "var(--pink-accent)",
                }}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
