"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSaveStore } from "@/lib/saveStore";
import ChoiceItem from "@/components/game/ChoiceItem";
import SaveLoadMenu from "./SaveLoadMenu";
import styles from "@/styles/vn.module.css";

// ─── Star pop/explosion particles (ported from old BootScreen) ───
const PARTICLE_COUNT = 8;

function StarParticles() {
  return (
    <>
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
        const distance = 70 + Math.random() * 35;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        return (
          <motion.span
            key={i}
            className="pointer-events-none absolute"
            style={{
              fontSize: "0.65rem",
              color: "#ff3d7f",
              left: "50%",
              top: "50%",
              filter: "drop-shadow(0 0 6px rgba(255,61,127,0.85))",
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x, y, opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            ✦
          </motion.span>
        );
      })}
    </>
  );
}

// Optional: blurred silhouette of Stella as the BG (uncomment when asset is ready)
// const BG_IMAGE = "/backgrounds/title-silhouette.jpg";
const BG_IMAGE: string | null = null;

type MenuKey = "new" | "continue" | "load" | "quit";

interface MenuEntry {
  key: MenuKey;
  label: string;
}

const MENU_ENTRIES: MenuEntry[] = [
  { key: "new", label: "Nouvelle partie" },
  { key: "continue", label: "Continuer" },
  { key: "load", label: "Charger" },
  { key: "quit", label: "Quitter" },
];

export default function MainMenu() {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const loadSlots = useSaveStore((s) => s.loadSlots);
  const hasAutosave = useSaveStore((s) => s.hasAutosave);
  const setPendingLoad = useSaveStore((s) => s.setPendingLoad);

  const [exiting, setExiting] = useState(false);
  const [loadMenuOpen, setLoadMenuOpen] = useState(false);
  const [autosaveExists, setAutosaveExists] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [menuReady, setMenuReady] = useState(false);

  useEffect(() => { loadSlots(); }, [loadSlots]);
  useEffect(() => { setAutosaveExists(hasAutosave()); }, [hasAutosave]);

  // Animation timeline: pop at 0.8s, menu mount at 1.8s.
  // Reduced motion: skip timings, mount menu fast.
  useEffect(() => {
    if (reducedMotion) {
      setMenuReady(true);
      return;
    }
    const popTimer = setTimeout(() => setShowPop(true), 800);
    const menuTimer = setTimeout(() => setMenuReady(true), 1800);
    return () => {
      clearTimeout(popTimer);
      clearTimeout(menuTimer);
    };
  }, [reducedMotion]);

  const navigateToGame = useCallback(() => {
    sessionStorage.setItem("stella-from-menu", "1");
    setExiting(true);
    setTimeout(() => router.push("/game"), 400);
  }, [router]);

  const handleChoose = (index: number) => {
    const entry = MENU_ENTRIES[index];
    if (!entry) return;
    switch (entry.key) {
      case "new":
        setPendingLoad(null);
        navigateToGame();
        break;
      case "continue":
        if (autosaveExists) setPendingLoad(0);
        else setPendingLoad(null);
        navigateToGame();
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
      className={styles.metaScreen}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Optional Stella silhouette BG */}
      {BG_IMAGE && (
        <img
          src={BG_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "blur(8px) brightness(0.45)", zIndex: 5 }}
        />
      )}

      <div className={styles.metaScreenGlow} />
      <div className={styles.metaGrain} />

      {/* Content */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-6">
        {/* Title — fade + blur-in from old MainMenu (commit 96b782f) */}
        <motion.h1
          className={`${styles.titleText} mb-3 text-center`}
          style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", lineHeight: 1 }}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: reducedMotion ? 0.3 : 1.8,
            ease: [0.22, 1, 0.36, 1],
            delay: reducedMotion ? 0 : 0.3,
          }}
        >
          Stella{" "}
          {/* Star wrapper — scale pop at t=0.8s, continuous rotation after t=1s (CSS delay) */}
          <motion.span
            className={styles.titleStar}
            style={{ fontSize: "0.55em", position: "relative" }}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={
              reducedMotion
                ? { scale: 1, opacity: 1 }
                : { scale: [0.3, 1.3, 1], opacity: [0, 1, 1] }
            }
            transition={{
              duration: reducedMotion ? 0.3 : 0.6,
              delay: reducedMotion ? 0 : 0.8,
              times: reducedMotion ? undefined : [0, 0.55, 1],
              ease: "easeOut",
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
            </svg>
            {/* Particle explosion emitted once when the star pops */}
            {showPop && !reducedMotion && <StarParticles />}
          </motion.span>{" "}
          Overflow
        </motion.h1>

        <motion.p
          className={`${styles.tagline} text-center`}
          style={{ fontSize: "clamp(0.85rem, 2vw, 1.05rem)", marginBottom: "3.5rem" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0.3 : 0.9,
            delay: reducedMotion ? 0 : 1.2,
          }}
        >
          Tu n&apos;es pas le h&eacute;ros. Tu es celui qui d&eacute;cide si elle le devient.
        </motion.p>

        {/* Menu list — mounts at t=1.8s so ChoiceItem's CSS stagger fires clean */}
        {menuReady && (
          <ul
            className="flex flex-col"
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              width: "min(400px, 90vw)",
              gap: "0.35rem",
              display: "flex",
            }}
          >
            {MENU_ENTRIES.map((entry, i) => (
              <ChoiceItem
                key={entry.key}
                text={entry.label}
                index={i}
                number={i}
                onChoose={handleChoose}
                showNumber={false}
                disabled={entry.key === "continue" && !autosaveExists}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Credits */}
      <motion.div
        className={`${styles.credit} ${styles.creditMuted} fixed bottom-6 left-8 z-20`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.0 }}
      >
        totoken &middot; virgind3stroy3r
      </motion.div>

      <motion.div
        className={`${styles.credit} fixed bottom-6 right-8 z-20`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.0 }}
      >
        v0.1 — demo
      </motion.div>

      <SaveLoadMenu
        mode="load"
        open={loadMenuOpen}
        onClose={() => setLoadMenuOpen(false)}
        onLoadSlot={handleLoadSlot}
      />
    </motion.div>
  );
}
