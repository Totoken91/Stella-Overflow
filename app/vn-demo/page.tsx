"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as engine from "@/lib/engine";
import { useGameStore } from "@/lib/gameState";
import Background from "@/components/game/Background";
import SpriteWindow from "@/components/game/SpriteWindow";
import DialogueBox from "@/components/game/DialogueBox";
import ChoiceList from "@/components/game/ChoiceList";
import SceneFrame from "@/components/game/SceneFrame";

export default function VnDemoPage() {
  const [initialized, setInitialized] = useState(false);
  const [storyLoaded, setStoryLoaded] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const [choices, setChoices] = useState<Array<{ text: string; index: number }>>(
    []
  );
  const [ended, setEnded] = useState(false);
  const skipRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    useGameStore.getState().reset();
    engine.init("/story/test-ui.json").then((ok) => {
      setStoryLoaded(ok);
      setInitialized(true);
      if (ok) {
        const t = engine.getText();
        setText(t);
        setChoices(engine.getChoices());
      }
    });
  }, []);

  const advance = useCallback(() => {
    const next = engine.getText();
    if (next !== null) {
      setText(next);
      setChoices(engine.getChoices());
    } else {
      const c = engine.getChoices();
      setChoices(c);
      if (c.length === 0) {
        setText(null);
        setEnded(true);
      }
    }
  }, []);

  const handleChoice = useCallback(
    (index: number) => {
      engine.choose(index);
      advance();
    },
    [advance]
  );

  const handleNext = useCallback(() => {
    if (choices.length === 0) advance();
  }, [choices.length, advance]);

  const handleScreenClick = useCallback(() => {
    if (choices.length > 0 || !text) return;
    if (skipRef.current) {
      skipRef.current();
    } else {
      advance();
    }
  }, [choices.length, text, advance]);

  return (
    <div
      className="game-container fixed inset-0 overflow-hidden bg-black"
      onClick={handleScreenClick}
    >
      <SceneFrame>
        <Background />
        <SpriteWindow />

        {initialized && storyLoaded && !ended && text && (
          <DialogueBox
            text={text}
            onNext={handleNext}
            charDelay={20}
            skipRef={skipRef}
          />
        )}

        {choices.length > 0 && (
          <div
            className="pointer-events-auto absolute left-0 right-0 z-40"
            style={{ bottom: "calc(var(--vn-letterbox-h, 0px) + 14rem)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <ChoiceList choices={choices} onChoice={handleChoice} />
          </div>
        )}

        {ended && (
          <div
            className="absolute inset-0 z-40 flex items-center justify-center"
            style={{
              fontFamily: "var(--font-serif-display), serif",
              fontStyle: "italic",
              fontSize: "1.4rem",
              color: "var(--vn-cream)",
              letterSpacing: "0.05em",
            }}
          >
            fin de la démo
          </div>
        )}
      </SceneFrame>
    </div>
  );
}
