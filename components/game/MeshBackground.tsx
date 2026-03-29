"use client";

import { useGameStore } from "@/lib/gameState";

const BG_THEMES: Record<
  string,
  { base: string; blob1: string; blob2: string; blob3: string }
> = {
  "toit-lycee": {
    base: "linear-gradient(160deg, #FFF5F8 0%, #FFE4EE 40%, #F0F4FA 100%)",
    blob1: "rgba(255, 214, 224, 0.5)",
    blob2: "rgba(212, 206, 240, 0.5)",
    blob3: "rgba(127, 216, 216, 0.5)",
  },
  "couloir-lycee": {
    base: "linear-gradient(160deg, #F0F0F5 0%, #E8E4F0 40%, #F5F0FA 100%)",
    blob1: "rgba(200, 190, 220, 0.4)",
    blob2: "rgba(180, 175, 210, 0.35)",
    blob3: "rgba(160, 200, 200, 0.3)",
  },
  soir: {
    base: "linear-gradient(160deg, #2C1A3E 0%, #1A1030 40%, #201535 100%)",
    blob1: "rgba(180, 120, 200, 0.35)",
    blob2: "rgba(100, 80, 160, 0.3)",
    blob3: "rgba(80, 120, 160, 0.25)",
  },
};

const DEFAULT_THEME = BG_THEMES["toit-lycee"];

// No-BG theme (transition between scenes — dark)
const DARK_THEME = {
  base: "linear-gradient(160deg, #1A0A1E 0%, #140C18 40%, #0E0A14 100%)",
  blob1: "rgba(180, 120, 200, 0.2)",
  blob2: "rgba(100, 80, 160, 0.15)",
  blob3: "rgba(80, 120, 160, 0.15)",
};

export default function MeshBackground() {
  const currentBg = useGameStore((s) => s.currentBg);

  const theme = currentBg
    ? BG_THEMES[currentBg] || DEFAULT_THEME
    : DARK_THEME;

  return (
    <div
      className="noise-overlay pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{
        background: theme.base,
        transition: "background 1.5s ease-in-out",
      }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: "50vmax",
          height: "50vmax",
          background: theme.blob1,
          top: "-15%",
          left: "-15%",
          filter: "blur(90px)",
          animation: "blobMove1 18s ease-in-out infinite alternate",
          willChange: "transform",
          transition: "background 1.5s ease-in-out",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "45vmax",
          height: "45vmax",
          background: theme.blob2,
          top: "35%",
          right: "-15%",
          filter: "blur(90px)",
          animation: "blobMove2 22s ease-in-out infinite alternate",
          willChange: "transform",
          transition: "background 1.5s ease-in-out",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "42vmax",
          height: "42vmax",
          background: theme.blob3,
          bottom: "-15%",
          left: "25%",
          filter: "blur(90px)",
          animation: "blobMove3 20s ease-in-out infinite alternate",
          willChange: "transform",
          transition: "background 1.5s ease-in-out",
        }}
      />
    </div>
  );
}
