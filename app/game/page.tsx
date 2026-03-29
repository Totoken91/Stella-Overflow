"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootScreen from "@/components/game/BootScreen";
import MeshBackground from "@/components/game/MeshBackground";
import Background from "@/components/game/Background";
import SpriteWindow from "@/components/game/SpriteWindow";
import DialogueBox from "@/components/game/DialogueBox";
import ChoiceList from "@/components/game/ChoiceList";
import CGOverlay from "@/components/game/CGOverlay";
import * as engine from "@/lib/engine";
import { useGameStore } from "@/lib/gameState";

export default function GamePage() {
  const [booting, setBooting] = useState(true);
  const [text, setText] = useState<string | null>(null);
  const [choices, setChoices] = useState<
    Array<{ text: string; index: number }>
  >([]);
  const [storyLoaded, setStoryLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [dialogueHidden, setDialogueHidden] = useState(false);

  const currentCG = useGameStore((s) => s.currentCG);

  useEffect(() => {
    useGameStore.getState().reset();
    engine.init().then((loaded) => {
      setStoryLoaded(loaded);
      setInitialized(true);
    });
  }, []);

  const advance = useCallback(() => {
    const nextText = engine.getText();
    if (nextText !== null) {
      setText(nextText);
      setChoices(engine.getChoices());
    } else {
      const currentChoices = engine.getChoices();
      setChoices(currentChoices);
      if (currentChoices.length === 0) {
        setText(null);
      }
    }
  }, []);

  const handleBootComplete = useCallback(() => {
    setBooting(false);
    if (storyLoaded) {
      advance();
    }
  }, [storyLoaded, advance]);

  const handleChoice = useCallback(
    (index: number) => {
      engine.choose(index);
      setChoices([]);
      advance();
    },
    [advance]
  );

  const handleNext = useCallback(() => {
    if (choices.length === 0) {
      advance();
    }
  }, [choices, advance]);

  // CG contemplation done → advance to get the dialogue lines
  const handleCGReady = useCallback(() => {
    advance();
  }, [advance]);

  // Click anywhere on screen to advance dialogue
  const handleScreenClick = useCallback(() => {
    if (booting || !storyLoaded || choices.length > 0 || !text) return;
    advance();
  }, [booting, storyLoaded, choices, text, advance]);

  // Toggle dialogue visibility (eye button)
  const toggleDialogue = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setDialogueHidden((h) => !h);
  }, []);

  // Show dialogue again when CG is dismissed
  useEffect(() => {
    if (!currentCG) {
      setDialogueHidden(false);
    }
  }, [currentCG]);

  return (
    <div
      className="game-container relative h-screen w-screen overflow-hidden"
      onClick={handleScreenClick}
    >
      <MeshBackground />
      {initialized && storyLoaded && (
        <>
          <Background />
          <SpriteWindow />
          <CGOverlay onReady={handleCGReady} />

          {/* Eye toggle button — only visible during CG with dialogue */}
          {currentCG && text && !booting && (
            <button
              onClick={toggleDialogue}
              className="fixed right-4 top-4 z-[50] flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:opacity-100"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "1.1rem",
                opacity: dialogueHidden ? 0.5 : 0.8,
              }}
              title={dialogueHidden ? "Afficher le dialogue" : "Masquer le dialogue"}
            >
              {dialogueHidden ? "◡" : "👁"}
            </button>
          )}

          <AnimatePresence>
            {!booting && text && !dialogueHidden && (
              <motion.div
                key="dialogue-ui"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={currentCG ? "relative z-[46]" : "contents"}
              >
                <DialogueBox text={text} onNext={handleNext} />
                <ChoiceList choices={choices} onChoice={handleChoice} />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {initialized && !storyLoaded && !booting && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <p
            className="opacity-60"
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "0.85rem",
              color: "var(--pink-dark)",
            }}
          >
            [ histoire non chargée ]
          </p>
        </div>
      )}

      {booting && <BootScreen onComplete={handleBootComplete} />}
    </div>
  );
}
