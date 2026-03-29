"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import BootScreen from "@/components/game/BootScreen";
import MeshBackground from "@/components/game/MeshBackground";
import Background from "@/components/game/Background";
import SpriteWindow from "@/components/game/SpriteWindow";
import DialogueBox from "@/components/game/DialogueBox";
import ChoiceList from "@/components/game/ChoiceList";
import CGOverlay from "@/components/game/CGOverlay";
import InGameMenu from "@/components/menu/InGameMenu";
import SaveLoadMenu from "@/components/menu/SaveLoadMenu";
import ConfirmDialog from "@/components/menu/ConfirmDialog";
import * as engine from "@/lib/engine";
import { useGameStore } from "@/lib/gameState";
import { useSaveStore } from "@/lib/saveStore";

export default function GamePage() {
  const router = useRouter();
  const [booting, setBooting] = useState(true);
  const [text, setText] = useState<string | null>(null);
  const [choices, setChoices] = useState<
    Array<{ text: string; index: number }>
  >([]);
  const [storyLoaded, setStoryLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [dialogueHidden, setDialogueHidden] = useState(false);
  const [storyEnded, setStoryEnded] = useState(false);
  // History: each entry is { text, inkState (before this line was consumed) }
  // We browse history without touching the ink engine
  const historyRef = useRef<Array<{ text: string }>>([]);
  const [browsingHistory, setBrowsingHistory] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(-1);;

  // Menu states
  const [menuOpen, setMenuOpen] = useState(false);
  const [saveMenuOpen, setSaveMenuOpen] = useState(false);
  const [saveMenuMode, setSaveMenuMode] = useState<"save" | "load">("save");
  const [confirmReturnOpen, setConfirmReturnOpen] = useState(false);

  // Fast-forward
  const [fastForward, setFastForward] = useState(false);
  const ffRef = useRef(false);
  ffRef.current = fastForward;

  const prevSceneRef = useRef("");
  const dialogueSkipRef = useRef<(() => void) | null>(null);

  const currentCG = useGameStore((s) => s.currentCG);
  const currentBg = useGameStore((s) => s.currentBg);
  const currentScene = useGameStore((s) => s.currentScene);
  const [sceneTransition, setSceneTransition] = useState(false);
  const prevBgRef = useRef<string | null>(null);

  // Init — redirect to menu if not coming from MainMenu
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fromMenu = sessionStorage.getItem("stella-from-menu");
      sessionStorage.removeItem("stella-from-menu");
      if (!fromMenu) {
        router.replace("/");
        return;
      }
    }

    const pendingLoad = useSaveStore.getState().pendingLoad;
    if (pendingLoad === null) {
      useGameStore.getState().reset();
    }

    engine.init().then((loaded) => {
      setStoryLoaded(loaded);
      setInitialized(true);

      // Handle pending load from main menu
      if (loaded && pendingLoad !== null) {
        useSaveStore.getState().loadSlots();
        const success = useSaveStore.getState().load(pendingLoad);
        useSaveStore.getState().setPendingLoad(null);
        if (success) {
          setBooting(false);
          // Advance once to get text + process tags from loaded position
          const nextText = engine.getText();
          if (nextText) {
            setText(nextText);
            setChoices(engine.getChoices());
          }
          return;
        }
      }
    });

    useSaveStore.getState().loadSlots();
  }, []);

  const advance = useCallback(() => {
    // If browsing history, clicking forward returns to current
    if (browsingHistory) {
      setBrowsingHistory(false);
      setHistoryIndex(-1);
      // Restore the current (latest) text from history
      const latest = historyRef.current[historyRef.current.length - 1];
      if (latest) setText(latest.text);
      return;
    }

    const nextText = engine.getText();
    if (nextText !== null) {
      // Save current displayed text to history before showing new one
      if (text) {
        historyRef.current.push({ text });
      }
      setText(nextText);
      setChoices(engine.getChoices());

      // Clear history on choices (can't go back past a choice)
      if (engine.getChoices().length > 0) {
        historyRef.current = [];
      }
    } else {
      const currentChoices = engine.getChoices();
      setChoices(currentChoices);
      if (currentChoices.length === 0) {
        setText(null);
        setStoryEnded(true);
      }
    }
  }, [text, browsingHistory]);

  const goBack = useCallback(() => {
    const hist = historyRef.current;
    if (hist.length === 0) return;

    if (!browsingHistory) {
      // First back press: save current text as the "latest" entry
      if (text) hist.push({ text });
      // Show the previous entry
      const idx = hist.length - 2;
      if (idx < 0) return;
      setBrowsingHistory(true);
      setHistoryIndex(idx);
      setText(hist[idx].text);
      setChoices([]);
    } else {
      // Already browsing: go further back
      const idx = historyIndex - 1;
      if (idx < 0) return;
      setHistoryIndex(idx);
      setText(hist[idx].text);
    }
  }, [text, browsingHistory, historyIndex]);

  const canGoBack = browsingHistory ? historyIndex > 0 : historyRef.current.length > 0;

  // Pre-advance during boot to process BG tags behind the boot screen
  useEffect(() => {
    if (storyLoaded && booting && !text) {
      advance();
    }
  }, [storyLoaded, booting, text, advance]);

  const handleBootComplete = useCallback(() => {
    setBooting(false);
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

  // CG contemplation done
  const handleCGReady = useCallback(() => {
    advance();
  }, [advance]);

  // Click anywhere to advance
  // Click anywhere: delegates to DialogueBox skip/advance logic
  const handleScreenClick = useCallback(() => {
    if (booting || !storyLoaded || choices.length > 0 || !text) return;
    if (menuOpen || saveMenuOpen || confirmReturnOpen) return;
    if (dialogueSkipRef.current) {
      dialogueSkipRef.current();
    } else {
      advance();
    }
  }, [booting, storyLoaded, choices, text, menuOpen, saveMenuOpen, confirmReturnOpen, advance]);

  // Toggle dialogue visibility
  const toggleDialogue = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setDialogueHidden((h) => !h);
  }, []);

  // Fade-to-black on scene transition (BG goes null then new)
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const prevBg = prevBgRef.current;
    prevBgRef.current = currentBg;

    if (prevBg !== null && currentBg === null) {
      // BG cleared → fade in overlay
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      setSceneTransition(true);
    } else if (currentBg !== null && sceneTransition) {
      // New BG arrived while in transition → schedule fade out
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = setTimeout(() => {
        setSceneTransition(false);
        transitionTimerRef.current = null;
      }, 300);
    }
  }, [currentBg, sceneTransition]);

  useEffect(() => {
    if (!currentCG) setDialogueHidden(false);
  }, [currentCG]);

  // Track scene changes + clear history (can't go back past scene boundary)
  useEffect(() => {
    if (currentScene && currentScene !== prevSceneRef.current) {
      prevSceneRef.current = currentScene;
      historyRef.current = [];
      setBrowsingHistory(false);
      setHistoryIndex(-1);
    }
  }, [currentScene]);

  // Stop fast-forward on scene transition
  useEffect(() => {
    if (sceneTransition && fastForward) {
      setFastForward(false);
    }
  }, [sceneTransition, fastForward]);

  // Fast-forward loop
  useEffect(() => {
    if (!fastForward || !text || sceneTransition) return;

    const timer = setTimeout(() => {
      if (!ffRef.current) return;
      // Stop on choices
      const currentChoices = engine.getChoices();
      if (currentChoices.length > 0) {
        setFastForward(false);
        return;
      }
      // Stop on STOP_FF tag
      if (engine.hasStopFF()) {
        setFastForward(false);
        return;
      }
      // Stop on end
      if (!engine.canContinue()) {
        setFastForward(false);
        return;
      }
      advance();
    }, 80);

    return () => clearTimeout(timer);
  }, [fastForward, text, advance]);

  // Menu handlers
  const handleSave = () => {
    setMenuOpen(false);
    setSaveMenuMode("save");
    setSaveMenuOpen(true);
  };

  const handleLoad = () => {
    setMenuOpen(false);
    setSaveMenuMode("load");
    setSaveMenuOpen(true);
  };

  const handleLoadSlot = (slotId: number) => {
    const success = useSaveStore.getState().load(slotId);
    if (success) {
      setSaveMenuOpen(false);
      setFastForward(false);
      // Advance once to get text + process tags from loaded position
      const nextText = engine.getText();
      if (nextText) {
        setText(nextText);
        setChoices(engine.getChoices());
      }
    }
  };

  const handleReturnToMenu = () => {
    setMenuOpen(false);
    setConfirmReturnOpen(true);
  };

  const confirmReturn = () => {
    setConfirmReturnOpen(false);
    router.push("/");
  };

  const anyOverlayOpen = menuOpen || saveMenuOpen || confirmReturnOpen;

  return (
    <div
      className="game-container relative h-screen w-screen overflow-hidden"
      onClick={handleScreenClick}
    >
      <MeshBackground />

      {/* Scene transition fade overlay — semi-transparent, not pure black */}
      <div
        className="pointer-events-none absolute inset-0 z-[15]"
        style={{
          background: "rgba(20, 10, 30, 0.7)",
          opacity: sceneTransition ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
        }}
      />

      {initialized && storyLoaded && (
        <>
          <Background />
          <SpriteWindow />
          <CGOverlay onReady={handleCGReady} />

          {/* Eye toggle — during CG with dialogue */}
          {currentCG && text && !booting && (
            <button
              onClick={toggleDialogue}
              className="fixed left-4 top-4 z-[50] flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:opacity-100"
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


          {/* Fast-forward shimmer bar */}
          <AnimatePresence>
            {fastForward && (
              <motion.div
                className="fixed bottom-0 left-0 right-0 z-[31] h-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--teal), transparent)",
                  backgroundSize: "200% 100%",
                  animation: "ffShimmer 1s linear infinite",
                }}
              />
            )}
          </AnimatePresence>

          {/* Dialogue + choices */}
          <AnimatePresence>
            {!booting && text && !dialogueHidden && (
              <motion.div
                key="dialogue-ui"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={currentCG ? "fixed inset-0 z-[46]" : "contents"}
              >
                <DialogueBox
                  text={text}
                  onNext={handleNext}
                  charDelay={fastForward ? 2 : 20}
                  skipRef={dialogueSkipRef}
                  controls={
                    <>
                      <button
                        onClick={goBack}
                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-all"
                        style={{
                          fontFamily: "var(--font-dm-mono)",
                          fontSize: "0.75rem",
                          color: canGoBack ? "var(--pink-dark)" : "rgba(107,45,74,0.3)",
                          background: "rgba(255, 255, 255, 0.6)",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 143, 171, 0.3)",
                          cursor: canGoBack ? "pointer" : "default",
                        }}
                        disabled={!canGoBack}
                      >
                        {"<"}
                      </button>
                      <button
                        onClick={() => setFastForward((f) => !f)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-all"
                        style={{
                          fontFamily: "var(--font-dm-mono)",
                          fontSize: "0.65rem",
                          color: fastForward ? "var(--teal-dark)" : "var(--pink-dark)",
                          background: "rgba(255, 255, 255, 0.6)",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                          border: fastForward
                            ? "1.5px solid var(--teal)"
                            : "1px solid rgba(255, 143, 171, 0.3)",
                          boxShadow: fastForward
                            ? "0 0 8px rgba(127,216,216,0.4)"
                            : "none",
                        }}
                      >
                        {">>"}
                      </button>
                      <button
                        onClick={() => setMenuOpen(true)}
                        className="flex h-8 items-center justify-center rounded-lg px-3 transition-all"
                        style={{
                          fontFamily: "var(--font-dm-mono)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.1em",
                          color: "var(--pink-dark)",
                          background: "rgba(255, 255, 255, 0.6)",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 143, 171, 0.3)",
                        }}
                      >
                        MENU
                      </button>
                    </>
                  }
                />
                <ChoiceList choices={choices} onChoice={handleChoice} />
              </motion.div>
            )}
          </AnimatePresence>

        </>
      )}

      {/* End of story */}
      <AnimatePresence>
        {storyEnded && !booting && (
          <motion.div
            className="absolute inset-0 z-[50] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{
              background: "rgba(26, 10, 30, 0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            onClick={() => router.push("/")}
          >
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.8rem",
                fontStyle: "italic",
                color: "var(--pink-soft)",
                textShadow: "0 0 20px rgba(255,143,171,0.4)",
                marginBottom: "1rem",
              }}
            >
              À suivre...
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: "rgba(255, 179, 198, 0.4)",
              }}
            >
              cliquer pour revenir au menu
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback */}
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

      {/* Boot screen */}
      {booting && <BootScreen onComplete={handleBootComplete} />}

      {/* In-game menu */}
      <InGameMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSave={handleSave}
        onLoad={handleLoad}
        onReturnToMenu={handleReturnToMenu}
      />

      {/* Save/Load menu */}
      <SaveLoadMenu
        mode={saveMenuMode}
        open={saveMenuOpen}
        onClose={() => setSaveMenuOpen(false)}
        onLoadSlot={handleLoadSlot}
      />

      {/* Confirm return to menu */}
      <ConfirmDialog
        open={confirmReturnOpen}
        title="Quitter la partie ?"
        message="Toute progression non sauvegardée sera perdue."
        confirmLabel="Quitter"
        cancelLabel="Rester"
        onConfirm={confirmReturn}
        onCancel={() => setConfirmReturnOpen(false)}
      />
    </div>
  );
}
