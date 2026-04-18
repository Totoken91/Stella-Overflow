"use client";

import type { ReactNode } from "react";
import { useGameStore } from "@/lib/gameState";
import styles from "@/styles/vn.module.css";

interface SceneFrameProps {
  children: ReactNode;
  /** Force letterbox off (e.g. menu screens). Default: true. */
  letterbox?: boolean;
}

/**
 * Wraps scene content with:
 *  - letterbox bars (top/bottom)
 *  - vignette darkening
 *  - animated SVG grain overlay
 *  - scanlines (dissociation mode only)
 *
 * Intensity adapts to `sceneMode` from the game store.
 * Children (BG, sprites, CG, dialogue, HUD) render in the middle z-stack.
 */
export default function SceneFrame({
  children,
  letterbox = true,
}: SceneFrameProps) {
  const sceneMode = useGameStore((s) => s.sceneMode);

  const tension = sceneMode === "tension";
  const intimate = sceneMode === "intimate";
  const dissociation = sceneMode === "dissociation";

  const frameClass = [
    styles.frame,
    intimate ? styles.frameIntimate : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={frameClass}>
      {children}

      <div
        className={`${styles.vignette} ${tension ? styles.vignetteTension : ""}`}
      />
      <div
        className={`${styles.grain} ${tension ? styles.grainTension : ""}`}
      />
      {dissociation && <div className={styles.scanlines} />}

      {letterbox && (
        <>
          <div
            className={`${styles.letterboxTop} ${intimate ? styles.letterboxIntimate : ""}`}
          />
          <div
            className={`${styles.letterboxBottom} ${intimate ? styles.letterboxIntimate : ""}`}
          />
        </>
      )}
    </div>
  );
}
