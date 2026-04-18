"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useGameStore } from "@/lib/gameState";
import { smartPunct } from "@/lib/typography";
import styles from "@/styles/vn.module.css";

interface DialogueBoxProps {
  text: string;
  onNext: () => void;
  charDelay?: number;
  skipRef?: React.MutableRefObject<(() => void) | null>;
  /**
   * Temporary slot for HUD controls (back, fast-forward, menu).
   * Rendered at top-right of the box until the HUD component takes over.
   */
  controls?: React.ReactNode;
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

export default function DialogueBox({
  text,
  onNext,
  charDelay = 20,
  skipRef,
  controls,
}: DialogueBoxProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  const generationRef = useRef(0);
  const lastClickRef = useRef(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const warnedRef = useRef<string>("");

  const emphasis = useGameStore((s) => s.emphasis);
  const sceneMode = useGameStore((s) => s.sceneMode);
  const disturbanceTrigger = useGameStore((s) => s.disturbanceTrigger);

  const { speaker, content: rawContent } = parseDialogue(text);
  const content = smartPunct(rawContent);
  const dissociation = sceneMode === "dissociation";

  // One-shot 300ms pulse whenever the disturbance counter bumps.
  useEffect(() => {
    if (disturbanceTrigger === 0) return;
    setPulseKey((k) => k + 1);
  }, [disturbanceTrigger]);

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
    }, charDelay);

    return () => clearInterval(interval);
  }, [content, charDelay]);

  const handleClickInner = useCallback(() => {
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

  useEffect(() => {
    if (skipRef) skipRef.current = handleClickInner;
    return () => {
      if (skipRef) skipRef.current = null;
    };
  }, [skipRef, handleClickInner]);

  // Overflow detection: once typing is complete, check whether the
  // content would exceed the fixed box height. If so, emit a one-shot
  // warning so the writer knows to split the passage in the .ink.
  useEffect(() => {
    if (!isComplete) return;
    const el = boxRef.current;
    if (!el) return;
    if (warnedRef.current === content) return;
    if (el.scrollHeight > el.clientHeight + 2) {
      warnedRef.current = content;
      const preview = content.length > 80 ? content.slice(0, 80) + "…" : content;
      console.warn(
        `[DialogueBox] Passage trop long pour la boîte fixe, split-le dans le .ink: "${preview}"`
      );
    }
  }, [isComplete, content]);

  const wrapperClass = [
    styles.boxWrapper,
    dissociation ? styles.boxWrapperDisturbed : "",
  ]
    .filter(Boolean)
    .join(" ");

  const textClass = [
    emphasis === "thought" ? styles.emphasisThought : "",
    emphasis === "whisper" ? styles.emphasisWhisper : "",
    dissociation ? styles.chromaticPersistent : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-30 cursor-pointer"
      style={{
        paddingBottom: "calc(var(--vn-letterbox-h, 0px) + 1.5rem)",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        transition: "padding-bottom 600ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleClickInner();
      }}
    >
      <div className={wrapperClass}>
        {speaker && (
          <div className={styles.pill}>{speaker}</div>
        )}

        {controls && (
          <div
            className={styles.controlsSlot}
            onClick={(e) => e.stopPropagation()}
          >
            {controls}
          </div>
        )}

        <div className={styles.box} ref={boxRef}>
          <p
            key={pulseKey}
            className={`m-0 ${textClass} ${pulseKey > 0 ? styles.chromaticPulse : ""}`}
          >
            {displayedText}
            {!isComplete && <span className={styles.caret}>|</span>}
          </p>
        </div>
      </div>
    </div>
  );
}
