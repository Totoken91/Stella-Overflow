import { create } from "zustand";
import type { SaveSlot } from "@/types/save";
import { SAVE_STORAGE_KEY, AUTOSAVE_SLOT_ID } from "@/types/save";
import * as engine from "@/lib/engine";
import { useGameStore } from "@/lib/gameState";

interface SaveStore {
  slots: Record<number, SaveSlot | null>;
  pendingLoad: number | null;
  loadSlots: () => void;
  save: (slotId: number) => boolean;
  load: (slotId: number) => boolean;
  deleteSave: (slotId: number) => void;
  autoSave: () => void;
  hasAutosave: () => boolean;
  setPendingLoad: (slotId: number | null) => void;
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

export const useSaveStore = create<SaveStore>()((set, get) => ({
  slots: {},
  pendingLoad: null,

  loadSlots: () => {
    const slots = readFromStorage();
    set({ slots });
  },

  save: (slotId: number) => {
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
    };

    const slots = { ...get().slots, [slotId]: slot };
    set({ slots });
    writeToStorage(slots);
    return true;
  },

  load: (slotId: number) => {
    const slot = get().slots[slotId];
    if (!slot) return false;
    return engine.loadState(slot.inkState);
  },

  deleteSave: (slotId: number) => {
    const slots = { ...get().slots, [slotId]: null };
    set({ slots });
    writeToStorage(slots);
  },

  autoSave: () => {
    get().save(AUTOSAVE_SLOT_ID);
  },

  hasAutosave: () => {
    return get().slots[AUTOSAVE_SLOT_ID] != null;
  },

  setPendingLoad: (slotId: number | null) => {
    set({ pendingLoad: slotId });
  },
}));
