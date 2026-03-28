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

export default function DialogueBox({ text, onNext }: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [shimmerActive, setShimmerActive] = useState(false);

  const generationRef = useRef(0);
  const lastClickRef = useRef(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0 });

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

  // 3D tilt on mouse move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!boxRef.current) return;
      const rect = boxRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotY = ((x - midX) / midX) * 6;
      const rotX = ((midY - y) / midY) * 6;
      setTilt({ rotX, rotY });
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    setShimmerActive(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ rotX: 0, rotY: 0 });
    setTimeout(() => setShimmerActive(false), 600);
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-30 cursor-pointer"
      onClick={handleClick}
      style={{ perspective: "800px" }}
    >
      <div className="mx-auto max-w-4xl px-4 pb-6">
        <div
          ref={boxRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: "rgba(255, 255, 255, 0.07)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 143, 171, 0.2)",
            borderLeft: "4px solid",
            borderImage:
              "linear-gradient(to bottom, var(--pink-deep), var(--teal)) 1",
            padding: "1.25rem 1.5rem",
            transformStyle: "preserve-3d",
            willChange: "transform",
            transform: isHovering
              ? `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`
              : "rotateX(0) rotateY(0)",
            transition: isHovering
              ? "box-shadow 0.3s ease"
              : "transform 0.4s ease, box-shadow 0.3s ease",
            boxShadow: isHovering
              ? "0 16px 48px rgba(224, 92, 138, 0.12)"
              : "none",
          }}
        >
          {/* Shimmer overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)",
              transform: shimmerActive ? undefined : "translateX(-100%)",
              animation: shimmerActive
                ? "shimmer 0.6s ease forwards"
                : "none",
            }}
          />

          {/* Speaker pill */}
          {speaker && (
            <div
              className="mb-2 inline-block rounded-full px-3 py-1"
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--pink-accent)",
                background: "rgba(224, 92, 138, 0.15)",
                border: "1px solid rgba(255, 143, 171, 0.3)",
              }}
            >
              {speaker}
            </div>
          )}

          {/* Text content */}
          <p
            className="m-0 leading-relaxed"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.05rem",
              color: speaker ? "var(--cream)" : "var(--pink-soft)",
              fontStyle: speaker ? "normal" : "italic",
            }}
          >
            {displayedText}
            {!isComplete && (
              <span
                className="animate-pulse"
                style={{ color: "var(--pink-accent)" }}
              >
                |
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
