"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSaveStore, formatTimestamp } from "@/lib/saveStore";
import { USER_SLOT_IDS } from "@/types/save";
import ConfirmDialog from "./ConfirmDialog";

interface SaveLoadMenuProps {
  mode: "save" | "load";
  open: boolean;
  onClose: () => void;
  onLoadSlot?: (slotId: number) => void;
  /**
   * Called when the user confirms a save. The host wires this so the
   * currently displayed passage can be captured alongside the ink state.
   * Falls back to the store's save() with no text if unset.
   */
  onSaveSlot?: (slotId: number) => void;
}

export default function SaveLoadMenu({
  mode,
  open,
  onClose,
  onLoadSlot,
  onSaveSlot,
}: SaveLoadMenuProps) {
  const slots = useSaveStore((s) => s.slots);
  const save = useSaveStore((s) => s.save);
  const deleteSave = useSaveStore((s) => s.deleteSave);
  const [confirmOverwrite, setConfirmOverwrite] = useState<number | null>(null);

  const performSave = (slotId: number) => {
    if (onSaveSlot) onSaveSlot(slotId);
    else save(slotId);
  };

  const handleSlotClick = (slotId: number) => {
    const slot = slots[slotId];

    if (mode === "save") {
      if (slot) {
        setConfirmOverwrite(slotId);
      } else {
        performSave(slotId);
        onClose();
      }
    } else {
      if (slot && onLoadSlot) {
        onLoadSlot(slotId);
        onClose();
      }
    }
  };

  const handleConfirmOverwrite = () => {
    if (confirmOverwrite !== null) {
      performSave(confirmOverwrite);
      setConfirmOverwrite(null);
      onClose();
    }
  };

  const handleDelete = (e: React.MouseEvent, slotId: number) => {
    e.stopPropagation();
    deleteSave(slotId);
  };

  return (
    <>
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
            <div onClick={(e) => e.stopPropagation()}>
              <h2
                className="mb-6 text-center"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.4rem",
                  fontStyle: "italic",
                  color: "var(--pink-soft)",
                }}
              >
                {mode === "save" ? "Sauvegarder" : "Charger"}
              </h2>

              <div className="flex flex-col gap-3" style={{ width: 340 }}>
                {USER_SLOT_IDS.map((slotId, i) => {
                  const slot = slots[slotId];
                  return (
                    <motion.div
                      key={slotId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.3 }}
                      className="cursor-pointer rounded-2xl p-4 transition-all"
                      style={{
                        background: "rgba(255, 255, 255, 0.08)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 143, 171, 0.2)",
                      }}
                      onClick={() => handleSlotClick(slotId)}
                      whileTap={{ scale: 0.97 }}
                    >
                      {slot ? (
                        <>
                          <div className="mb-1 flex items-center justify-between">
                            <span
                              style={{
                                fontFamily: "var(--font-dm-mono)",
                                fontSize: "0.6rem",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: "rgba(255, 179, 198, 0.6)",
                              }}
                            >
                              Slot {slotId}
                            </span>
                            <button
                              onClick={(e) => handleDelete(e, slotId)}
                              className="transition-opacity hover:opacity-100"
                              style={{
                                fontFamily: "var(--font-dm-mono)",
                                fontSize: "0.6rem",
                                color: "rgba(255, 143, 171, 0.4)",
                                opacity: 0.6,
                              }}
                            >
                              supprimer
                            </button>
                          </div>
                          <div
                            className="mb-1"
                            style={{
                              fontFamily: "var(--font-playfair)",
                              fontSize: "0.9rem",
                              color: "var(--pink-soft)",
                              fontWeight: 600,
                            }}
                          >
                            {slot.sceneLabel}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-dm-mono)",
                              fontSize: "0.65rem",
                              color: "rgba(255, 179, 198, 0.5)",
                            }}
                          >
                            {formatTimestamp(slot.timestamp)}
                          </div>
                        </>
                      ) : (
                        <div
                          className="py-3 text-center"
                          style={{
                            fontFamily: "var(--font-dm-mono)",
                            fontSize: "0.8rem",
                            fontStyle: "italic",
                            color: "rgba(255, 179, 198, 0.35)",
                          }}
                        >
                          {mode === "save"
                            ? "— sauvegarder ici —"
                            : "— emplacement vide —"}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <button
                onClick={onClose}
                className="mx-auto mt-5 block rounded-full px-6 py-2 transition-opacity hover:opacity-100"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  color: "rgba(255, 179, 198, 0.5)",
                  border: "1px solid rgba(255, 143, 171, 0.15)",
                  opacity: 0.7,
                }}
              >
                fermer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={confirmOverwrite !== null}
        title="Écraser cette sauvegarde ?"
        message="Les données de cet emplacement seront remplacées."
        confirmLabel="Écraser"
        cancelLabel="Annuler"
        onConfirm={handleConfirmOverwrite}
        onCancel={() => setConfirmOverwrite(null)}
      />
    </>
  );
}
