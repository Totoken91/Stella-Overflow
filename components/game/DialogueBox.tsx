"use client";

import { useState, useEffect, useCallback } from "react";

interface DialogueBoxProps {
  text: string;
  onNext: () => void;
}

function parseDialogue(text: string): {
  speaker: string | null;
  content: string;
} {
  // Format: "NOM : texte"
  const match = text.match(/^([A-ZÀ-ÖØ-Ý\s]+)\s*:\s*([\s\S]+)$/);
  if (match) {
    return { speaker: match[1].trim(), content: match[2].trim() };
  }
  return { speaker: null, content: text.trim() };
}

const CHAR_DELAY = 20; // ms per character

export default function DialogueBox({ text, onNext }: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const { speaker, content } = parseDialogue(text);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);

    if (!content) {
      setIsComplete(true);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(content.slice(0, index));
      if (index >= content.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, CHAR_DELAY);

    return () => clearInterval(interval);
  }, [content]);

  const handleClick = useCallback(() => {
    if (!isComplete) {
      // Skip typewriter, show full text
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
        <div
          className="rounded-t-lg border border-[var(--pink-dark)] border-opacity-30
                      bg-black bg-opacity-80 px-6 py-5 backdrop-blur-sm"
        >
          {speaker && (
            <div
              className="mb-2 font-mono text-sm font-medium"
              style={{ color: "var(--pink-accent)" }}
            >
              {speaker}
            </div>
          )}
          <p
            className={`font-serif text-lg leading-relaxed ${
              speaker ? "text-[var(--cream)]" : "italic text-[var(--pink-soft)]"
            }`}
          >
            {displayedText}
            {!isComplete && (
              <span className="animate-pulse text-[var(--pink-accent)]">
                |
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
