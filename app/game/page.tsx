"use client";

import { useState, useEffect, useCallback } from "react";
import Background from "@/components/game/Background";
import SpriteLayer from "@/components/game/SpriteLayer";
import DialogueBox from "@/components/game/DialogueBox";
import ChoiceList from "@/components/game/ChoiceList";
import * as engine from "@/lib/engine";

export default function GamePage() {
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
      if (loaded) {
        advance();
      }
    });
  }, []);

  const advance = useCallback(() => {
    const nextText = engine.getText();
    if (nextText !== null) {
      setText(nextText);
      setChoices(engine.getChoices());
    } else {
      // Story might be at choices or ended
      const currentChoices = engine.getChoices();
      setChoices(currentChoices);
      if (currentChoices.length === 0) {
        setText(null); // story ended
      }
    }
  }, []);

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

  if (!initialized) {
    return <div className="flex h-screen items-center justify-center bg-black" />;
  }

  if (!storyLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <p className="font-mono text-sm text-[var(--pink-soft)] opacity-60">
          [ histoire non charg&eacute;e ]
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <Background />
      <SpriteLayer />
      {text && <DialogueBox text={text} onNext={handleNext} />}
      <ChoiceList choices={choices} onChoice={handleChoice} />
    </div>
  );
}
