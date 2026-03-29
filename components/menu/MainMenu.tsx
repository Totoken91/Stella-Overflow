"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSaveStore } from "@/lib/saveStore";
import SaveLoadMenu from "./SaveLoadMenu";

const MENU_BUTTONS = [
  { key: "new", label: "NOUVELLE PARTIE" },
  { key: "continue", label: "CONTINUER" },
  { key: "load", label: "CHARGER" },
  { key: "quit", label: "QUITTER" },
] as const;

export default function MainMenu() {
  const router = useRouter();
  const loadSlots = useSaveStore((s) => s.loadSlots);
  const hasAutosave = useSaveStore((s) => s.hasAutosave);
  const setPendingLoad = useSaveStore((s) => s.setPendingLoad);
  const [exiting, setExiting] = useState(false);
  const [loadMenuOpen, setLoadMenuOpen] = useState(false);
  const [autosaveExists, setAutosaveExists] = useState(false);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  useEffect(() => {
    setAutosaveExists(hasAutosave());
  }, [hasAutosave]);

  const navigateToGame = useCallback(() => {
    setExiting(true);
    setTimeout(() => router.push("/game"), 400);
  }, [router]);

  const handleClick = (key: string) => {
    switch (key) {
      case "new":
        setPendingLoad(null);
        navigateToGame();
        break;
      case "continue":
        if (autosaveExists) {
          setPendingLoad(0); // autosave slot
          navigateToGame();
        }
        break;
      case "load":
        setLoadMenuOpen(true);
        break;
      case "quit":
        window.close();
        break;
    }
  };

  const handleLoadSlot = (slotId: number) => {
    setPendingLoad(slotId);
    setLoadMenuOpen(false);
    navigateToGame();
  };

  return (
    <motion.div
      className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "#1A0A1E" }}
      animate={exiting ? { opacity: 0, scale: 0.98 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Mesh blobs */}
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
            animation: "blobMove1 18s ease-in-out infinite alternate",
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
            animation: "blobMove2 22s ease-in-out infinite alternate",
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
            animation: "blobMove3 20s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-4 text-center">
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontStyle: "italic",
            color: "var(--pink-soft)",
            textShadow: "0 0 30px rgba(255,143,171,0.5)",
            animation: "breathe 4s ease-in-out infinite",
          }}
        >
          <span
            style={{
              color: "var(--teal)",
              filter: "drop-shadow(0 0 10px rgba(127,216,216,0.8))",
              animation: "spin 4s linear infinite",
              display: "inline-block",
            }}
          >
            ✦
          </span>{" "}
          STELLA OVERFLOW
        </h1>
        <p
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "0.8rem",
            letterSpacing: "0.3em",
            color: "rgba(255, 179, 198, 0.45)",
            marginTop: "0.5rem",
          }}
        >
          un visual novel
        </p>
      </div>

      {/* Buttons */}
      <div
        className="relative z-10 mt-8 flex flex-col gap-3"
        style={{ width: 240 }}
      >
        {MENU_BUTTONS.map((btn, i) => {
          const isDisabled = btn.key === "continue" && !autosaveExists;
          return (
            <motion.button
              key={btn.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              whileTap={isDisabled ? {} : { scale: 0.97 }}
              onClick={() => !isDisabled && handleClick(btn.key)}
              disabled={isDisabled}
              className="w-full rounded-xl py-3.5 text-center transition-all"
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "0.85rem",
                letterSpacing: "0.15em",
                color: isDisabled
                  ? "rgba(255, 179, 198, 0.25)"
                  : "var(--pink-soft)",
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: `1px solid ${
                  isDisabled
                    ? "rgba(255, 143, 171, 0.08)"
                    : "rgba(255, 143, 171, 0.2)"
                }`,
                cursor: isDisabled ? "default" : "pointer",
                opacity: isDisabled ? 0.5 : 1,
              }}
              title={
                isDisabled ? "aucune partie en cours" : undefined
              }
            >
              {btn.label}
            </motion.button>
          );
        })}
      </div>

      {/* Load menu overlay */}
      <SaveLoadMenu
        mode="load"
        open={loadMenuOpen}
        onClose={() => setLoadMenuOpen(false)}
        onLoadSlot={handleLoadSlot}
      />
    </motion.div>
  );
}
