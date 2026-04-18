"use client";

import ChoiceItem from "./ChoiceItem";
import styles from "@/styles/vn.module.css";

interface Choice {
  text: string;
  index: number;
}

interface ChoiceListProps {
  choices: Choice[];
  /** Kept for backward compatibility with /game page.tsx */
  onChoice?: (index: number) => void;
  onChoose?: (index: number) => void;
}

export default function ChoiceList({ choices, onChoice, onChoose }: ChoiceListProps) {
  if (choices.length === 0) return null;
  const handle = onChoose ?? onChoice ?? (() => {});

  return (
    <ul className={styles.choiceList} role="menu">
      {choices.map((c, i) => (
        <ChoiceItem
          key={c.index}
          text={c.text}
          index={c.index}
          number={i}
          onChoose={handle}
        />
      ))}
    </ul>
  );
}
