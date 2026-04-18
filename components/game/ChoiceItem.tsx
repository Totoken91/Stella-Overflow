"use client";

import { useState } from "react";
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
  /** Extra delay (ms) before the stagger animation fires. Lets callers
      reserve the layout from mount while starting the reveal later. */
  baseDelayMs?: number;
}

export default function ChoiceItem({
  text,
  index,
  number,
  onChoose,
  showNumber = true,
  disabled = false,
  baseDelayMs = 0,
}: ChoiceItemProps) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) onChoose(index);
      }}
      onMouseEnter={() => !disabled && setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        styles.choice,
        hover && !disabled ? styles.choiceHover : "",
        !showNumber ? styles.choiceNoNumber : "",
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
    </button>
  );
}
