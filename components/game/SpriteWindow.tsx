"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useGameStore } from "@/lib/gameState";

// ─── Individual character sprite ───
function SpriteCharacter({
  name,
  expression,
  isActive,
  spriteCount,
  positionIndex,
}: {
  name: string;
  expression: string;
  isActive: boolean;
  spriteCount: number;
  positionIndex: number;
}) {
  const [scope, animate] = useAnimate();
  const prevExpressionRef = useRef(expression);
  const spriteKey = `${name}-${expression}`;
  const [spriteSrc, setSpriteSrc] = useState(`/sprites/${name}-placeholder.png`);

  // Try to upgrade to exact expression image
  useEffect(() => {
    const exact = new Image();
    exact.onload = () => {
      if (exact.naturalWidth > 1) {
        setSpriteSrc(`/sprites/${spriteKey}.png`);
      } else {
        setSpriteSrc(`/sprites/${name}-placeholder.png`);
      }
    };
    exact.onerror = () => {
      setSpriteSrc(`/sprites/${name}-placeholder.png`);
    };
    exact.src = `/sprites/${spriteKey}.png`;
  }, [spriteKey, name]);

  // Bounce on expression change
  useEffect(() => {
    if (prevExpressionRef.current !== expression) {
      prevExpressionRef.current = expression;
      animate(
        scope.current,
        { scale: [1, 0.93, 1.06, 1] },
        { duration: 0.35, ease: "easeInOut" }
      );
    }
  }, [expression, animate, scope]);

  // Flip: left sprite (index 0 of 2) faces right, others face left
  const scaleX = spriteCount === 2 && positionIndex === 0 ? -1 : 1;
  const prevScaleXRef = useRef(scaleX);

  // Only animate scaleX when it actually changes value
  const scaleXChanged = prevScaleXRef.current !== scaleX;
  prevScaleXRef.current = scaleX;

  return (
    <motion.div
      ref={scope}
      layout
      key={name}
      initial={{ y: 60, opacity: 0, scale: 0.85 }}
      animate={{
        y: 0,
        opacity: isActive || spriteCount === 1 ? 1 : 0.6,
        scale: isActive || spriteCount === 1 ? 1 : 0.92,
        filter:
          isActive || spriteCount === 1
            ? "saturate(1)"
            : "saturate(0.5)",
      }}
      exit={{ x: 120, opacity: 0 }}
      transition={{
        y: { type: "spring", stiffness: 300, damping: 18 },
        scale: { type: "spring", stiffness: 300, damping: 18 },
        opacity: { type: "spring", stiffness: 300, damping: 18 },
        x: { duration: 0.3, ease: "easeIn" },
        filter: { duration: 0.3 },
        layout: { type: "spring", stiffness: 200, damping: 25 },
      }}
    >
      {/* Flip wrapper — animated only when scaleX value changes */}
      <motion.div
        animate={{ scaleX }}
        transition={
          scaleXChanged
            ? { type: "spring", stiffness: 400, damping: 25 }
            : { duration: 0 }
        }
      >
        <img
          src={spriteSrc}
          alt={name}
          className="max-h-[70vh] w-auto object-contain"
          style={{ animation: "spriteIdle 4s ease-in-out infinite" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `/sprites/${name}-placeholder.png`;
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Main sprite window ───
export default function SpriteWindow() {
  const visibleSprites = useGameStore((s) => s.visibleSprites);
  const currentExpression = useGameStore((s) => s.currentExpression);
  const currentSpeaker = useGameStore((s) => s.currentSpeaker);

  return (
    <div className="absolute bottom-44 left-0 right-0 z-20 flex items-end justify-center gap-8">
      <AnimatePresence>
        {visibleSprites.map((name, index) => (
          <SpriteCharacter
            key={name}
            name={name}
            expression={currentExpression[name] || "neutre"}
            isActive={currentSpeaker === name}
            spriteCount={visibleSprites.length}
            positionIndex={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
