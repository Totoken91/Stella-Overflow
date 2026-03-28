import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  score: number;
  currentSprite: string | null;
  currentBg: string | null;
  currentMusic: string | null;
  lunae_trust: number;
  gave_choice: boolean;

  setSprite: (sprite: string | null) => void;
  setBg: (bg: string | null) => void;
  setMusic: (music: string | null) => void;
  addScore: (points: number) => void;
  setLunaeTrust: (value: number) => void;
  setGaveChoice: (value: boolean) => void;
  reset: () => void;
}

const initialState = {
  score: 0,
  currentSprite: null,
  currentBg: null,
  currentMusic: null,
  lunae_trust: 0,
  gave_choice: false,
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialState,

      setSprite: (sprite) => set({ currentSprite: sprite }),
      setBg: (bg) => set({ currentBg: bg }),
      setMusic: (music) => set({ currentMusic: music }),
      addScore: (points) => set((s) => ({ score: s.score + points })),
      setLunaeTrust: (value) => set({ lunae_trust: value }),
      setGaveChoice: (value) => set({ gave_choice: value }),
      reset: () => set(initialState),
    }),
    {
      name: "stella-overflow-state",
    }
  )
);
