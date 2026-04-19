"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useGameStore } from "@/lib/gameState";

/**
 * 3-tier fallback chain driven purely by <img>.onError so the initial
 * render never hits the placeholder: attempt the exact expression,
 * then the character's neutre, then placeholder.
 */
function useSpriteSrc(name: string, expression: string) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    // New expression → reset the cascade to "try exact first"
    setStage(0);
  }, [name, expression]);

  const src =
    stage === 0
      ? `/sprites/${name}-${expression}.png`
      : stage === 1
      ? `/sprites/${name}-neutre.png`
      : `/sprites/${name}-placeholder.png`;

  const onError = () => {
    setStage((s) => {
      // Skip neutre stage if that's what just failed (or if expression was already neutre)
      if (s === 0) return expression === "neutre" ? 2 : 1;
      if (s === 1) return 2;
      return 2;
    });
  };

  return { src, onError };
}

// ─── Standard human sprite (full-body, anchored bottom, VN framing) ───
function HumanSprite({
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
  const { src, onError } = useSpriteSrc(name, expression);

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

  const scaleX = spriteCount === 2 && positionIndex === 0 ? -1 : 1;
  const prevScaleXRef = useRef(scaleX);
  const scaleXChanged = prevScaleXRef.current !== scaleX;
  prevScaleXRef.current = scaleX;

  // Multi-sprite scenes (two+ humans on screen) need layout + lateral
  // exit so sprites redistribute cleanly when one enters/leaves.
  // Solo scenes (Stella alone 99% of Act 1) skip all of that — otherwise
  // a new humans array ref on every ink tick triggers a phantom layout
  // animation that slides Stella sideways for no reason.
  const isMulti = spriteCount > 1;

  return (
    <motion.div
      ref={scope}
      key={name}
      layout={isMulti ? "position" : false}
      initial={{ y: 80, opacity: 0, scale: 0.8 }}
      animate={{
        y: 0,
        opacity: isActive || spriteCount === 1 ? 1 : 0.6,
        scale: isActive || spriteCount === 1 ? 1 : 0.92,
        filter:
          isActive || spriteCount === 1 ? "saturate(1)" : "saturate(0.5)",
      }}
      exit={isMulti ? { x: 120, opacity: 0 } : { opacity: 0, y: 40 }}
      transition={{
        y: { type: "spring", stiffness: 180, damping: 16, delay: 0.05 },
        scale: { type: "spring", stiffness: 180, damping: 16, delay: 0.05 },
        opacity: { duration: 0.5, ease: "easeOut" },
        x: { duration: 0.3, ease: "easeIn" },
        filter: { duration: 0.3 },
        layout: { type: "spring", stiffness: 120, damping: 20 },
      }}
    >
      <motion.div
        animate={{ scaleX }}
        transition={
          scaleXChanged
            ? { type: "spring", stiffness: 400, damping: 25 }
            : { duration: 0 }
        }
      >
        <img
          src={src}
          alt={name}
          className="h-[130vh] w-auto object-contain"
          style={{ animation: "spriteIdle 4s ease-in-out infinite" }}
          onError={onError}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Lunae: small floating magical rabbit ───
function LunaeSprite({ expression }: { expression: string }) {
  const { src, onError } = useSpriteSrc("lunae", expression);

  return (
    <motion.div
      className="pointer-events-none absolute z-20"
      style={{ top: "18vh", right: "14vw" }}
      initial={{ opacity: 0, scale: 0.6, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
      exit={{ opacity: 0, scale: 0.6, y: -30 }}
      transition={{
        opacity: { duration: 0.6, ease: "easeOut" },
        scale: { type: "spring", stiffness: 180, damping: 16 },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <img
        src={src}
        alt="lunae"
        className="h-[55vh] w-auto object-contain drop-shadow-[0_0_36px_rgba(123,45,255,0.4)]"
        onError={onError}
      />
    </motion.div>
  );
}

// ─── Main sprite window ───
export default function SpriteWindow() {
  const visibleSprites = useGameStore((s) => s.visibleSprites);
  const currentExpression = useGameStore((s) => s.currentExpression);
  const currentSpeaker = useGameStore((s) => s.currentSpeaker);

  const humans = visibleSprites.filter((n) => n !== "lunae");
  const lunaeVisible = visibleSprites.includes("lunae");

  return (
    <>
      <div
        className="absolute left-0 right-0 z-20 flex items-end justify-center gap-8"
        style={{ bottom: "-40vh" }}
      >
        <AnimatePresence>
          {humans.map((name, index) => (
            <HumanSprite
              key={name}
              name={name}
              expression={currentExpression[name] || "neutre"}
              isActive={currentSpeaker === name}
              spriteCount={humans.length}
              positionIndex={index}
            />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lunaeVisible && (
          <LunaeSprite
            key="lunae"
            expression={currentExpression["lunae"] || "neutre"}
          />
        )}
      </AnimatePresence>
    </>
  );
}
