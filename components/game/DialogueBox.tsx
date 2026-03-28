"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface DialogueBoxProps {
  text: string;
  onNext: () => void;
}

function parseDialogue(text: string): {
  speaker: string | null;
  content: string;
} {
  const match = text.match(/^([A-ZÀ-ÖØ-Ý\s]+)\s*:\s*([\s\S]+)$/);
  if (match) {
    return { speaker: match[1].trim(), content: match[2].trim() };
  }
  return { speaker: null, content: text.trim() };
}

const CHAR_DELAY = 20;
const BOX_HEIGHT = 140;

// ─── Corner ornament ───
function Corner({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const borders: Record<string, string> = {
    tl: "borderTop: 1.5px solid rgba(255,143,171,0.5); borderLeft: 1.5px solid rgba(255,143,171,0.5)",
    tr: "borderTop: 1.5px solid rgba(255,143,171,0.5); borderRight: 1.5px solid rgba(255,143,171,0.5)",
    bl: "borderBottom: 1.5px solid rgba(255,143,171,0.5); borderLeft: 1.5px solid rgba(255,143,171,0.5)",
    br: "borderBottom: 1.5px solid rgba(255,143,171,0.5); borderRight: 1.5px solid rgba(255,143,171,0.5)",
  };

  const pos: Record<string, React.CSSProperties> = {
    tl: { top: 6, left: 6 },
    tr: { top: 6, right: 6 },
    bl: { bottom: 6, left: 6 },
    br: { bottom: 6, right: 6 },
  };

  const borderStyle: React.CSSProperties = {
    ...(position === "tl" && {
      borderTop: "1.5px solid rgba(255,143,171,0.5)",
      borderLeft: "1.5px solid rgba(255,143,171,0.5)",
    }),
    ...(position === "tr" && {
      borderTop: "1.5px solid rgba(255,143,171,0.5)",
      borderRight: "1.5px solid rgba(255,143,171,0.5)",
    }),
    ...(position === "bl" && {
      borderBottom: "1.5px solid rgba(255,143,171,0.5)",
      borderLeft: "1.5px solid rgba(255,143,171,0.5)",
    }),
    ...(position === "br" && {
      borderBottom: "1.5px solid rgba(255,143,171,0.5)",
      borderRight: "1.5px solid rgba(255,143,171,0.5)",
    }),
  };

  return (
    <span
      className="pointer-events-none absolute"
      style={{
        width: 8,
        height: 8,
        ...pos[position],
        ...borderStyle,
      }}
    />
  );
}

export default function DialogueBox({ text, onNext }: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const generationRef = useRef(0);
  const lastClickRef = useRef(0);

  const { speaker, content } = parseDialogue(text);

  // Typewriter with generation guard
  useEffect(() => {
    const gen = ++generationRef.current;
    setDisplayedText("");
    setIsComplete(false);

    if (!content) {
      setIsComplete(true);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (generationRef.current !== gen) {
        clearInterval(interval);
        return;
      }
      index++;
      setDisplayedText(content.slice(0, index));
      if (index >= content.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, CHAR_DELAY);

    return () => clearInterval(interval);
  }, [content]);

  // Click with debounce
  const handleClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClickRef.current < 80) return;
    lastClickRef.current = now;

    if (!isComplete) {
      generationRef.current++;
      setDisplayedText(content);
      setIsComplete(true);
    } else {
      onNext();
    }
  }, [isComplete, content, onNext]);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-30 cursor-pointer"
      onClick={handleClick}
    >
      <div className="mx-auto max-w-4xl px-4 pb-6">
        {/* Speaker badge */}
        {speaker && (
          <div
            className="mb-2 inline-block rounded-full px-4 py-1.5"
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#FFB3C6",
              textShadow: "0 0 12px rgba(224,92,138,0.8)",
              background: "rgba(224, 92, 138, 0.15)",
              border: "1px solid rgba(224, 92, 138, 0.4)",
            }}
          >
            {speaker}
          </div>
        )}

        {/* Dialogue panel */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            height: `${BOX_HEIGHT}px`,
            background: "rgba(20, 8, 28, 0.75)",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            border: "1px solid transparent",
            backgroundClip: "padding-box",
            padding: "1.25rem 1.5rem",
            boxShadow:
              "0 0 30px rgba(224,92,138,0.2), 0 0 80px rgba(224,92,138,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Gradient border pseudo-element */}
          <div
            className="pointer-events-none absolute rounded-2xl"
            style={{
              inset: -1,
              zIndex: -1,
              background:
                "linear-gradient(135deg, rgba(255,143,171,0.6), rgba(127,216,216,0.4), rgba(200,160,248,0.5))",
              borderRadius: "calc(1rem + 1px)",
            }}
          />

          {/* Corner ornaments */}
          <Corner position="tl" />
          <Corner position="tr" />
          <Corner position="bl" />
          <Corner position="br" />

          {/* Text */}
          <p
            className="m-0 leading-relaxed"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.05rem",
              color: speaker
                ? "rgba(255, 240, 248, 0.92)"
                : "rgba(255, 240, 248, 0.92)",
              fontStyle: speaker ? "normal" : "italic",
              textShadow: "0 1px 12px rgba(255,179,198,0.15)",
            }}
          >
            {displayedText}
            {!isComplete && (
              <span
                style={{
                  color: "#FF8FAB",
                  filter:
                    "drop-shadow(0 0 6px rgba(255,143,171,0.8))",
                  display: "inline-block",
                  animation:
                    "advanceIndicator 1.4s ease-in-out infinite",
                }}
              >
                ✦
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
