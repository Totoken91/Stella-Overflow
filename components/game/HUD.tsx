"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/styles/vn.module.css";

interface HUDProps {
  onBack?: () => void;
  canGoBack?: boolean;
  onToggleFastForward?: () => void;
  fastForward?: boolean;
  onOpenMenu?: () => void;
  /** Bump this counter whenever an autosave fires to flash the dot. */
  autosaveTick?: number;
}

const ICON_STROKE = 1.5;

function IconBack() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden>
      <path
        d="M13 5 L7 10 L13 15"
        stroke="currentColor"
        strokeWidth={ICON_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconForward() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden>
      <path
        d="M5 5 L11 10 L5 15 M9 5 L15 10 L9 15"
        stroke="currentColor"
        strokeWidth={ICON_STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden>
      <path
        d="M4 6 H16 M4 10 H16 M4 14 H16"
        stroke="currentColor"
        strokeWidth={ICON_STROKE}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HUD({
  onBack,
  canGoBack,
  onToggleFastForward,
  fastForward,
  onOpenMenu,
  autosaveTick = 0,
}: HUDProps) {
  const [autosaveFlash, setAutosaveFlash] = useState(false);
  const prevTickRef = useRef(autosaveTick);

  useEffect(() => {
    if (autosaveTick === prevTickRef.current) return;
    prevTickRef.current = autosaveTick;
    setAutosaveFlash(true);
    const t = setTimeout(() => setAutosaveFlash(false), 1200);
    return () => clearTimeout(t);
  }, [autosaveTick]);

  return (
    <div className={styles.hud} onClick={(e) => e.stopPropagation()}>
      {onBack && (
        <button
          type="button"
          className={styles.hudBtn}
          onClick={onBack}
          disabled={!canGoBack}
          title="Revenir en arrière"
          aria-label="Revenir en arrière"
        >
          <IconBack />
        </button>
      )}

      {onToggleFastForward && (
        <button
          type="button"
          className={`${styles.hudBtn} ${fastForward ? styles.hudBtnActive : ""}`}
          onClick={onToggleFastForward}
          title="Avance rapide"
          aria-label="Avance rapide"
          aria-pressed={fastForward}
        >
          <IconForward />
        </button>
      )}

      <span
        className={`${styles.autosaveDot} ${autosaveFlash ? styles.autosaveDotActive : ""}`}
        aria-hidden
      />

      {onOpenMenu && (
        <button
          type="button"
          className={styles.hudBtn}
          onClick={onOpenMenu}
          title="Menu"
          aria-label="Ouvrir le menu"
          style={{ width: "auto", padding: "0 0.75rem" }}
        >
          <span className={styles.hudLabel}>MENU</span>
        </button>
      )}
    </div>
  );
}
