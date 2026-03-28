"use client";

import { useState, useEffect, useCallback } from "react";
import BootScreen from "@/components/game/BootScreen";
import MeshBackground from "@/components/game/MeshBackground";
import Background from "@/components/game/Background";
import SpriteWindow from "@/components/game/SpriteWindow";
import DialogueBox from "@/components/game/DialogueBox";
import ChoiceList from "@/components/game/ChoiceList";
import * as engine from "@/lib/engine";

export default function GamePage() {
  const [booting, setBooting] = useState(true);
  const [text, setText] = useState<string | null>(null);
  const [choices, setChoices] = useState<
    Array<{ text: string; index: number }>
  >([]);
  const [storyLoaded, setStoryLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
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

  if (booting) {
    return (
      <div className="game-container relative h-screen w-screen overflow-hidden">
        <BootScreen onComplete={handleBootComplete} />
      </div>
    );
  }

  if (!initialized || !storyLoaded) {
    return (
      <div className="game-container relative flex h-screen w-screen items-center justify-center overflow-hidden">
        <MeshBackground />
        <p
          className="relative z-10 opacity-60"
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "0.85rem",
            color: "var(--pink-dark)",
          }}
        >
          [ histoire non chargée ]
        </p>
      </div>
    );
  }

  return (
    <div className="game-container relative h-screen w-screen overflow-hidden">
      <MeshBackground />
      <Background />
      <SpriteWindow />
      {text && <DialogueBox text={text} onNext={handleNext} />}
      <ChoiceList choices={choices} onChoice={handleChoice} />
    </div>
  );
}
