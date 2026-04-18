"use client";

import { useState } from "react";
import { smartPunct } from "@/lib/typography";
import styles from "@/styles/vn.module.css";

interface ChoiceItemProps {
  text: string;
  index: number;
  number: number;
  onChoose: (index: number) => void;
}

export default function ChoiceItem({ text, index, number, onChoose }: ChoiceItemProps) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={() => onChoose(index)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`${styles.choice} ${hover ? styles.choiceHover : ""}`}
      style={{ animationDelay: `${number * 80}ms` }}
      type="button"
    >
      <span className={styles.choiceIndicator} aria-hidden>
        ❯
      </span>
      <span className={styles.choiceText}>{smartPunct(text)}</span>
      <span className={styles.choiceNumber} aria-hidden>
        {String(number + 1).padStart(2, "0")}
      </span>
    </button>
  );
}
