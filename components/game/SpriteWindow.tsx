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

  // Resolve sprite src with a 3-tier fallback chain:
  //   1. Exact expression  (e.g. stella-surprise.png)
  //   2. Character's neutre (e.g. stella-neutre.png) — covers missing
  //      expressions while still showing the real art
  //   3. Placeholder silhouette — last resort if even neutre isn't there
  useEffect(() => {
    let cancelled = false;

    const tryLoad = (src: string) =>
      new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img.naturalWidth > 1);
        img.onerror = () => resolve(false);
        img.src = src;
      });

    (async () => {
      const exact = `/sprites/${spriteKey}.png`;
      const neutre = `/sprites/${name}-neutre.png`;
      const placeholder = `/sprites/${name}-placeholder.png`;

      if (await tryLoad(exact)) {
        if (!cancelled) setSpriteSrc(exact);
        return;
      }
      // Don't re-test neutre if the exact WAS neutre
      if (expression !== "neutre" && (await tryLoad(neutre))) {
        if (!cancelled) setSpriteSrc(neutre);
        return;
      }
      if (!cancelled) setSpriteSrc(placeholder);
    })();

    return () => {
      cancelled = true;
    };
  }, [spriteKey, name, expression]);

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
      key={name}
      layout="position"
      initial={{ y: 80, opacity: 0, scale: 0.8 }}
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
        y: { type: "spring", stiffness: 180, damping: 16, delay: 0.05 },
        scale: { type: "spring", stiffness: 180, damping: 16, delay: 0.05 },
        opacity: { duration: 0.6, ease: "easeOut", delay: 0.05 },
        x: { duration: 0.3, ease: "easeIn" },
        filter: { duration: 0.3 },
        layout: { type: "spring", stiffness: 120, damping: 20 },
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
