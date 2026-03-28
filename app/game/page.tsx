"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootScreen from "@/components/game/BootScreen";
import MeshBackground from "@/components/game/MeshBackground";
import Background from "@/components/game/Background";
import SpriteWindow from "@/components/game/SpriteWindow";
import DialogueBox from "@/components/game/DialogueBox";
import ChoiceList from "@/components/game/ChoiceList";
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

  useEffect(() => {
    // Reset visual state so sprites don't appear from previous session
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

  // Click anywhere on screen to advance dialogue
  // (DialogueBox handles its own click with stopPropagation for typewriter skip)
  const handleScreenClick = useCallback(() => {
    if (booting || !storyLoaded || choices.length > 0 || !text) return;
    advance();
  }, [booting, storyLoaded, choices, text, advance]);

  return (
    <div
      className="game-container relative h-screen w-screen overflow-hidden"
      onClick={handleScreenClick}
    >
      {/* Game always renders behind boot screen so assets preload */}
      <MeshBackground />
      {initialized && storyLoaded && (
        <>
          <Background />
          <SpriteWindow />
          <AnimatePresence>
            {!booting && text && (
              <motion.div
                key="dialogue-ui"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="contents"
              >
                <DialogueBox text={text} onNext={handleNext} />
                <ChoiceList choices={choices} onChoice={handleChoice} />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Fallback if story failed to load */}
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

      {/* Boot screen overlays everything */}
      {booting && <BootScreen onComplete={handleBootComplete} />}
    </div>
  );
}
