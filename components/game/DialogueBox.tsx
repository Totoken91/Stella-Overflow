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
const BOX_HEIGHT = 140; // fixed height in px

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
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      <div className="mx-auto max-w-4xl px-4 pb-6">
        {/* Speaker name card — separate, above dialogue box */}
        {speaker && (
          <div
            className="mb-2 inline-block rounded-xl px-4 py-2"
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--pink-accent)",
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 143, 171, 0.3)",
            }}
          >
            {speaker}
          </div>
        )}

        {/* Dialogue box — fixed height */}
        <div
          className="overflow-hidden rounded-2xl"
          style={{
            height: `${BOX_HEIGHT}px`,
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 143, 171, 0.2)",
            borderLeft: "4px solid",
            borderImage:
              "linear-gradient(to bottom, var(--pink-deep), var(--teal)) 1",
            padding: "1.25rem 1.5rem",
          }}
        >
          <p
            className="m-0 leading-relaxed"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.05rem",
              color: speaker ? "var(--foreground)" : "var(--pink-dark)",
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
