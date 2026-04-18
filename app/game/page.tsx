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
import AutosaveToast from "@/components/game/AutosaveToast";
import EndScreen from "@/components/game/EndScreen";
import SceneFrame from "@/components/game/SceneFrame";
import HUD from "@/components/game/HUD";
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
  const [showAutosaveToast, setShowAutosaveToast] = useState(false);
  const [autosaveTick, setAutosaveTick] = useState(0);

  // Fast-forward
  const [fastForward, setFastForward] = useState(false);
  const ffRef = useRef(false);
  ffRef.current = fastForward;

  // Mirror `text` into a ref so autosave can read the latest displayed
  // passage without re-running the callback on every text change.
  const textRef = useRef<string | null>(null);
  textRef.current = text;

  const prevSceneRef = useRef("");
  const dialogueSkipRef = useRef<(() => void) | null>(null);

  const currentCG = useGameStore((s) => s.currentCG);
  const currentBg = useGameStore((s) => s.currentBg);
  const currentScene = useGameStore((s) => s.currentScene);
  const sceneMode = useGameStore((s) => s.sceneMode);
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

    useSaveStore.getState().loadSlots();

    engine.init().then((loaded) => {
      // When there's a pending load, restore the saved state BEFORE
      // flipping storyLoaded → the pre-advance effect won't fire on
      // the fresh story and overwrite the restored BG/sprites/etc.
      if (loaded && pendingLoad !== null) {
        const success = useSaveStore.getState().load(pendingLoad);
        useSaveStore.getState().setPendingLoad(null);
        if (success) {
          setBooting(false);
          // Prefer the exact passage the user was on at save time.
          const restoredText = useSaveStore.getState().consumePendingRestoreText();
          if (restoredText) {
            setText(restoredText);
            setChoices(engine.getChoices());
          } else {
            // Fallback for legacy slots without scene_state.lastText.
            const nextText = engine.getText();
            if (nextText) {
              setText(nextText);
              setChoices(engine.getChoices());
            }
          }
        }
      }

      setStoryLoaded(loaded);
      setInitialized(true);
    });
  }, []);

  const advance = useCallback((): string | null => {
    // If browsing history, clicking forward returns to current
    if (browsingHistory) {
      setBrowsingHistory(false);
      setHistoryIndex(-1);
      // Restore the current (latest) text from history
      const latest = historyRef.current[historyRef.current.length - 1];
      if (latest) {
        setText(latest.text);
        return latest.text;
      }
      return null;
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
      return nextText;
    }

    const currentChoices = engine.getChoices();
    setChoices(currentChoices);
    if (currentChoices.length === 0) {
      setText(null);
      setStoryEnded(true);
    }
    return null;
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
      // Capture the freshly-displayed passage so load restores exactly
      // it instead of advancing past the save point.
      const nextText = advance();
      useSaveStore.getState().autoSave(nextText);
      setShowAutosaveToast(true);
      setAutosaveTick((n) => n + 1);
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
      historyRef.current = [];
      setBrowsingHistory(false);
      setHistoryIndex(-1);
      // Restore the exact passage the user saved on; fall back to
      // advancing through the ink state for legacy slots.
      const restoredText = useSaveStore.getState().consumePendingRestoreText();
      if (restoredText) {
        setText(restoredText);
        setChoices(engine.getChoices());
      } else {
        const nextText = engine.getText();
        if (nextText) {
          setText(nextText);
          setChoices(engine.getChoices());
        }
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
      className={`game-container scene-${sceneMode} relative h-screen w-screen overflow-hidden`}
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
        <SceneFrame>
          <Background />
          <SpriteWindow />
          <CGOverlay onReady={handleCGReady} />

          {/* HUD cluster — always visible during gameplay */}
          {!booting && (
            <HUD
              onBack={goBack}
              canGoBack={canGoBack}
              onToggleFastForward={() => setFastForward((f) => !f)}
              fastForward={fastForward}
              onOpenMenu={() => setMenuOpen(true)}
              autosaveTick={autosaveTick}
            />
          )}

          {/* Eye toggle — during CG with dialogue (stays as its own affordance) */}
          {currentCG && text && !booting && (
            <button
              onClick={toggleDialogue}
              className="fixed left-4 z-[50] flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:opacity-100"
              style={{
                top: "calc(var(--vn-letterbox-h, 0px) + 0.75rem)",
                background: "rgba(10, 6, 18, 0.7)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 61, 127, 0.25)",
                color: "var(--vn-cream)",
                fontSize: "1.1rem",
                opacity: dialogueHidden ? 0.5 : 0.85,
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
                    "linear-gradient(90deg, transparent, #ff3d7f, transparent)",
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
                />
                <ChoiceList choices={choices} onChoice={handleChoice} />
              </motion.div>
            )}
          </AnimatePresence>

        </SceneFrame>
      )}

      {/* End of story */}
      <EndScreen
        visible={storyEnded && !booting}
        variant={sceneMode === "dissociation" ? "game-over" : "act-end"}
        onExit={() => router.push("/")}
      />

      {/* Autosave feedback */}
      <AutosaveToast
        visible={showAutosaveToast}
        onHide={() => setShowAutosaveToast(false)}
      />

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
        onSaveSlot={(slotId) => {
          useSaveStore.getState().save(slotId, textRef.current);
        }}
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
