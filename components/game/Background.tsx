"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useGameStore, type BgTransition } from "@/lib/gameState";

interface BackgroundProps {
  /**
   * Sync audio fades with BG fades. Placeholder hook — no audio player
   * is wired in yet, but the prop is exposed so it's ready when one lands.
   */
  syncAudio?: boolean;
}

/** Base duration table for each transition type (ms). */
const TIMINGS = {
  crossfade: { total: 600 },
  "fade-black": { out: 500, hold: 200, in: 700 },
  "fade-white": { out: 500, hold: 200, in: 700 },
  "fade-crimson": { out: 500, hold: 200, in: 700 },
  cut: { total: 0 },
} as const;

const OVERLAY_COLORS: Partial<Record<BgTransition, string>> = {
  "fade-black": "#000000",
  "fade-white": "#ffffff",
  "fade-crimson": "#8b1538",
};

export default function Background({ syncAudio = true }: BackgroundProps) {
  // syncAudio is reserved for when an audio player lands; reference it so
  // the linter doesn't complain and future wiring has a clear seam.
  void syncAudio;

  const reducedMotion = useReducedMotion();
  const currentBg = useGameStore((s) => s.currentBg);
  const bgTransition = useGameStore((s) => s.bgTransition);
  const sceneMode = useGameStore((s) => s.sceneMode);

  // Two stacked layers so we can crossfade. Only one is "active" at a time.
  const [layerA, setLayerA] = useState<string | null>(null);
  const [layerB, setLayerB] = useState<string | null>(null);
  const [activeIsA, setActiveIsA] = useState(true);
  const [crossfadeMs, setCrossfadeMs] = useState(600);

  // Color overlay for fade-through-color variants
  const [overlayColor, setOverlayColor] = useState<string | null>(null);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [overlayDuration, setOverlayDuration] = useState(500);

  const prevBgRef = useRef<string | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (currentBg === prevBgRef.current) return;
    const prevBg = prevBgRef.current;
    prevBgRef.current = currentBg;

    // Clear any in-flight timers — a new BG change cancels the previous one
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    // First BG, or clearing: no transition, just set
    if (!prevBg || !currentBg) {
      if (activeIsA) setLayerA(currentBg);
      else setLayerB(currentBg);
      return;
    }

    // Resolve effective transition. Reduced motion collapses color fades
    // into a short crossfade; `cut` stays a cut (user opted in).
    let effective: BgTransition = bgTransition;
    if (reducedMotion && effective !== "cut") effective = "crossfade";
    // Intimate scenes get a slightly slower crossfade for a softer feel.
    const intimate = sceneMode === "intimate" && effective === "crossfade";

    if (effective === "cut") {
      if (activeIsA) setLayerA(currentBg);
      else setLayerB(currentBg);
      return;
    }

    if (effective === "crossfade") {
      const duration = reducedMotion ? 200 : intimate ? 1000 : 600;
      setCrossfadeMs(duration);
      // Put the new BG on the INACTIVE layer, then flip which is active.
      // The CSS opacity transition handles the crossfade smoothly.
      if (activeIsA) setLayerB(currentBg);
      else setLayerA(currentBg);
      // Small delay so the image has a chance to commit before the flip
      timersRef.current.push(
        setTimeout(() => {
          setActiveIsA((prev) => !prev);
        }, 20)
      );
      return;
    }

    // Fade-through-color: black / white / crimson
    const color = OVERLAY_COLORS[effective];
    if (!color) return;
    const t = TIMINGS[effective];

    // Phase 1: fade overlay IN (out of old BG into color)
    setCrossfadeMs(0); // disable crossfade on layers; overlay hides everything
    setOverlayColor(color);
    setOverlayDuration(t.out);
    // Small tick so the transition applies
    timersRef.current.push(
      setTimeout(() => setOverlayOpacity(1), 20)
    );

    // Phase 2: swap BG behind the full-color overlay (instant, invisible)
    timersRef.current.push(
      setTimeout(() => {
        if (activeIsA) setLayerB(currentBg);
        else setLayerA(currentBg);
        setActiveIsA((prev) => !prev);
      }, t.out)
    );

    // Phase 3: hold on color
    // Phase 4: fade overlay OUT (from color into new BG)
    timersRef.current.push(
      setTimeout(() => {
        setOverlayDuration(t.in);
        setOverlayOpacity(0);
      }, t.out + t.hold)
    );

    // Phase 5: cleanup — remove overlay node
    timersRef.current.push(
      setTimeout(() => {
        setOverlayColor(null);
      }, t.out + t.hold + t.in)
    );
  }, [currentBg, bgTransition, reducedMotion, sceneMode, activeIsA]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const layerStyle = (isActive: boolean): React.CSSProperties => ({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: isActive ? 1 : 0,
    transition: `opacity ${crossfadeMs}ms ease-in-out`,
    pointerEvents: "none",
  });

  return (
    <div className="absolute inset-0 z-10" aria-hidden>
      {layerA && (
        <img
          key={`A-${layerA}`}
          src={`/backgrounds/${layerA}.png`}
          alt=""
          style={layerStyle(activeIsA)}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}
      {layerB && (
        <img
          key={`B-${layerB}`}
          src={`/backgrounds/${layerB}.png`}
          alt=""
          style={layerStyle(!activeIsA)}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}
      {overlayColor && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
            transition: `opacity ${overlayDuration}ms ease-in-out`,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
