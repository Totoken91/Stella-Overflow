"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { smartPunct } from "@/lib/typography";
import styles from "@/styles/vn.module.css";

interface ChoiceItemProps {
  text: string;
  index: number;
  number: number;
  onChoose: (index: number) => void;
  /** When false, the right-side "01/02" label is hidden (menu mode). */
  showNumber?: boolean;
  /** When true, the choice is visually de-emphasized (e.g. no save slot). */
  disabled?: boolean;
  /** Extra delay (ms) before the stagger animation fires. */
  baseDelayMs?: number;
  /** When true, text left-aligns and underline grows from left. */
  leftAlign?: boolean;
  /** When true, hovering spawns a rose spark that drifts upward. */
  hoverSpark?: boolean;
}

export default function ChoiceItem({
  text,
  index,
  number,
  onChoose,
  showNumber = true,
  disabled = false,
  baseDelayMs = 0,
  leftAlign = false,
  hoverSpark = false,
}: ChoiceItemProps) {
  const [hover, setHover] = useState(false);
  const [sparks, setSparks] = useState<number[]>([]);

  const handleEnter = () => {
    if (disabled) return;
    setHover(true);
    if (hoverSpark) {
      const id = Date.now() + Math.random();
      setSparks((s) => [...s, id]);
      setTimeout(() => {
        setSparks((s) => s.filter((x) => x !== id));
      }, 1200);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) onChoose(index);
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHover(false)}
      className={[
        styles.choice,
        hover && !disabled ? styles.choiceHover : "",
        !showNumber ? styles.choiceNoNumber : "",
        leftAlign ? styles.choiceLeftAlign : "",
        disabled ? styles.choiceDisabled : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ animationDelay: `${baseDelayMs + number * 80}ms` }}
      type="button"
      disabled={disabled}
    >
      <span className={styles.choiceIndicator} aria-hidden>
        ❯
      </span>
      <span className={styles.choiceText}>{smartPunct(text)}</span>
      {showNumber && (
        <span className={styles.choiceNumber} aria-hidden>
          {String(number + 1).padStart(2, "0")}
        </span>
      )}
      {/* Hover spark — emitted next to the chevron */}
      {hoverSpark &&
        sparks.map((id) => (
          <motion.span
            key={id}
            className={styles.hoverSpark}
            aria-hidden
            initial={{ y: 0, opacity: 0.9, scale: 1 }}
            animate={{ y: -32, opacity: 0, scale: 0.3 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            ✦
          </motion.span>
        ))}
    </button>
  );
}
