import { create } from "zustand";
import type { SaveSlot, SaveSceneState } from "@/types/save";
import { SAVE_STORAGE_KEY, AUTOSAVE_SLOT_ID } from "@/types/save";
import * as engine from "@/lib/engine";
import { useGameStore, type SceneMode, type Emphasis, type BgTransition } from "@/lib/gameState";

interface SaveStore {
  slots: Record<number, SaveSlot | null>;
  pendingLoad: number | null;
  /** Text to restore on next render after a load. Consumed once. */
  pendingRestoreText: string | null;
  loadSlots: () => void;
  save: (slotId: number, lastText?: string | null) => boolean;
  load: (slotId: number) => boolean;
  deleteSave: (slotId: number) => void;
  autoSave: (lastText?: string | null) => void;
  hasAutosave: () => boolean;
  setPendingLoad: (slotId: number | null) => void;
  consumePendingRestoreText: () => string | null;
}

function readFromStorage(): Record<number, SaveSlot | null> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(SAVE_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeToStorage(slots: Record<number, SaveSlot | null>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(slots));
  } catch {
    // localStorage full or unavailable
  }
}

function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  const day = d.getDate();
  const months = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${day} ${month} ${year} · ${hours}:${minutes}`;
}

export { formatTimestamp };

function captureSceneState(lastText: string | null): SaveSceneState {
  const g = useGameStore.getState();
  return {
    currentBg: g.currentBg,
    currentMusic: g.currentMusic,
    currentCG: g.currentCG,
    sceneMode: g.sceneMode,
    emphasis: g.emphasis,
    bgTransition: g.bgTransition,
    currentSpeaker: g.currentSpeaker,
    visibleSprites: [...g.visibleSprites],
    currentExpression: { ...g.currentExpression },
    lastText,
  };
}

function restoreSceneState(state: SaveSceneState) {
  const g = useGameStore.getState();
  g.setBg(state.currentBg);
  g.setMusic(state.currentMusic);
  g.setCG(state.currentCG);
  g.setSceneMode(state.sceneMode as SceneMode);
  g.setEmphasis(state.emphasis as Emphasis);
  g.setBgTransition(state.bgTransition as BgTransition);
  g.setSpeaker(state.currentSpeaker);
  g.setVisibleSprites(state.visibleSprites);
  for (const [char, expr] of Object.entries(state.currentExpression)) {
    g.setExpression(char, expr);
  }
}

export const useSaveStore = create<SaveStore>()((set, get) => ({
  slots: {},
  pendingLoad: null,
  pendingRestoreText: null,

  loadSlots: () => {
    const slots = readFromStorage();
    set({ slots });
  },

  save: (slotId: number, lastText: string | null = null) => {
    const inkState = engine.saveState();
    if (!inkState) return false;

    const gameState = useGameStore.getState();
    const slot: SaveSlot = {
      id: slotId,
      timestamp: Date.now(),
      scene: gameState.currentScene || "scene1",
      sceneLabel: gameState.currentSceneLabel || "Scène 1",
      score: (engine.getVariable("score") as number) ?? 0,
      lunae_trust: gameState.lunae_trust,
      gave_choice: gameState.gave_choice,
      inkState,
      scene_state: captureSceneState(lastText),
    };

    const slots = { ...get().slots, [slotId]: slot };
    set({ slots });
    writeToStorage(slots);
    return true;
  },

  load: (slotId: number) => {
    const slot = get().slots[slotId];
    if (!slot) return false;
    const success = engine.loadState(slot.inkState);
    if (!success) return false;

    const gs = useGameStore.getState();
    gs.setCurrentScene(slot.scene, slot.sceneLabel);

    if (slot.scene_state) {
      restoreSceneState(slot.scene_state);
      set({ pendingRestoreText: slot.scene_state.lastText });
    } else {
      set({ pendingRestoreText: null });
    }

    return true;
  },

  deleteSave: (slotId: number) => {
    const slots = { ...get().slots, [slotId]: null };
    set({ slots });
    writeToStorage(slots);
  },

  autoSave: (lastText: string | null = null) => {
    get().save(AUTOSAVE_SLOT_ID, lastText);
  },

  hasAutosave: () => {
    return get().slots[AUTOSAVE_SLOT_ID] != null;
  },

  setPendingLoad: (slotId: number | null) => {
    set({ pendingLoad: slotId });
  },

  consumePendingRestoreText: () => {
    const t = get().pendingRestoreText;
    set({ pendingRestoreText: null });
    return t;
  },
}));
