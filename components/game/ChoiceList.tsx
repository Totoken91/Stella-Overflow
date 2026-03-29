"use client";

import { useState, useCallback } from "react";

interface Choice {
  text: string;
  index: number;
}

interface ChoiceListProps {
  choices: Choice[];
  onChoice: (index: number) => void;
}

function ChoiceButton({
  choice,
  onChoice,
}: {
  choice: Choice;
  onChoice: (index: number) => void;
}) {
  const [shimmer, setShimmer] = useState(false);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      setTilt({
        rotY: ((x - midX) / midX) * 8,
        rotX: ((midY - y) / midY) * 8,
      });
    },
    []
  );

  const handleEnter = useCallback(() => {
    setHovering(true);
    setShimmer(true);
  }, []);

  const handleLeave = useCallback(() => {
    setHovering(false);
    setTilt({ rotX: 0, rotY: 0 });
    setTimeout(() => setShimmer(false), 600);
  }, []);

  return (
    <button
      onClick={() => onChoice(choice.index)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative w-full overflow-hidden text-left"
      style={{
        fontFamily: "var(--font-dm-mono)",
        fontSize: "0.85rem",
        color: "var(--pink-dark)",
        background: "linear-gradient(135deg, #FFD6E0 0%, #FFBDD5 100%)",
        border: "1px solid rgba(255, 143, 171, 0.3)",
        borderRadius: "16px",
        padding: "1.2rem 1.5rem",
        transformStyle: "preserve-3d",
        willChange: "transform",
        transform: hovering
          ? `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`
          : "rotateX(0) rotateY(0)",
        transition: hovering
          ? "box-shadow 0.3s ease, border-color 0.3s ease"
          : "transform 0.4s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        boxShadow: hovering
          ? "0 16px 48px rgba(224, 92, 138, 0.15), 0 4px 12px rgba(0,0,0,0.06)"
          : "0 2px 8px rgba(224, 92, 138, 0.08)",
        borderColor: hovering
          ? "rgba(255, 143, 171, 0.6)"
          : "rgba(255, 143, 171, 0.3)",
      }}
    >
      {/* Hover brightness overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: "16px",
          background: "inherit",
          filter: "brightness(1.05)",
          opacity: hovering ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
      {/* Shimmer */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: "16px",
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.3) 55%, transparent 60%)",
          transform: shimmer ? undefined : "translateX(-100%)",
          animation: shimmer ? "shimmer 0.6s ease forwards" : "none",
        }}
      />
      <span className="relative z-10">{choice.text}</span>
    </button>
  );
}

export default function ChoiceList({ choices, onChoice }: ChoiceListProps) {
  if (choices.length === 0) return null;

  return (
    <div
      className="absolute bottom-44 left-0 right-0 z-40 flex justify-center"
      style={{ perspective: "800px" }}
    >
      <div className="flex w-full max-w-2xl flex-col gap-3 px-4">
        {choices.map((choice) => (
          <ChoiceButton key={choice.index} choice={choice} onChoice={onChoice} />
        ))}
      </div>
    </div>
  );
}
