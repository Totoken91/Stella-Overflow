"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/lib/gameState";

const CG_GRADIENTS: Record<string, string> = {
  "transformation-scene2":
    "linear-gradient(135deg, #D4CEF0, #FFB3C6, #FFD6E0, #C67FD8)",
  "dating-scene2-healthy":
    "linear-gradient(135deg, #FFD6E0, #7FD8D8, #FFB3C6, #B0E8E8)",
  "dating-scene2-unhealthy":
    "linear-gradient(135deg, #E05C8A, #6B2D4A, #FF8FAB, #3D2535)",
};

const DEFAULT_GRADIENT =
  "linear-gradient(135deg, #FFD6E0, #FF8FAB, #7FD8D8, #D4CEF0)";

export default function CGOverlay({
  onReady,
}: {
  onReady: () => void;
}) {
  const currentCG = useGameStore((s) => s.currentCG);
  const [realImage, setRealImage] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);

  // When a new CG appears, enter "waiting" state (contemplation)
  useEffect(() => {
    if (currentCG) {
      setWaiting(true);
    } else {
      setWaiting(false);
    }
  }, [currentCG]);

  // Check if a real CG PNG exists
  useEffect(() => {
    if (!currentCG) {
      setRealImage(null);
      return;
    }
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth > 1) {
        setRealImage(`/cg/${currentCG}.png`);
      }
    };
    img.onerror = () => setRealImage(null);
    img.src = `/cg/${currentCG}.png`;
  }, [currentCG]);

  // Click during contemplation → start dialogue
  const handleClick = () => {
    if (waiting) {
      setWaiting(false);
      onReady();
    }
  };

  const gradient = currentCG
    ? CG_GRADIENTS[currentCG] || DEFAULT_GRADIENT
    : DEFAULT_GRADIENT;

  return (
    <AnimatePresence>
      {currentCG && (
        <motion.div
          key="cg-overlay"
          className="fixed inset-0 z-[45]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.6, ease: "easeOut" },
            scale: { duration: 0.6, ease: "easeOut" },
          }}
          style={
            realImage
              ? {}
              : {
                  background: gradient,
                  backgroundSize: "200% 200%",
                  animation: "cgGradientShift 6s ease-in-out infinite",
                }
          }
          onClick={waiting ? handleClick : undefined}
        >
          {/* Real image if it exists */}
          {realImage && (
            <img
              src={realImage}
              alt={currentCG}
              className="h-full w-full object-cover"
              style={{ pointerEvents: "none" }}
            />
          )}

          {/* Waiting state: CG name + click hint */}
          {waiting && (
            <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
              {!realImage && (
                <div
                  className="rounded-full px-5 py-2"
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      fontSize: "0.8rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    {currentCG}
                  </span>
                </div>
              )}

              <span
                className="absolute bottom-8 animate-pulse"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  color: "rgba(255, 255, 255, 0.4)",
                }}
              >
                cliquer pour continuer
              </span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
