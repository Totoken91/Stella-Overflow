import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SceneMode = "calm" | "tension" | "intimate" | "dissociation";
export type Emphasis = "none" | "thought" | "whisper";
export type BgTransition =
  | "crossfade"
  | "fade-black"
  | "fade-white"
  | "fade-crimson"
  | "cut";

interface GameState {
  // Narrative
  score: number;
  lunae_trust: number;
  gave_choice: boolean;

  // Scene
  currentBg: string | null;
  currentMusic: string | null;
  currentCG: string | null;
  currentScene: string;
  currentSceneLabel: string;
  sceneMode: SceneMode;

  // VN UI
  emphasis: Emphasis;
  disturbanceTrigger: number;
  bgTransition: BgTransition;

  // Sprites
  currentSpeaker: string;
  visibleSprites: string[];
  currentExpression: Record<string, string>;

  // Scene actions
  setBg: (bg: string | null) => void;
  setMusic: (music: string | null) => void;
  setCG: (cg: string | null) => void;
  setCurrentScene: (scene: string, label: string) => void;
  setSceneMode: (mode: SceneMode) => void;

  // VN UI actions
  setEmphasis: (e: Emphasis) => void;
  bumpDisturbance: () => void;
  setBgTransition: (t: BgTransition) => void;

  // Sprite actions
  setSpeaker: (name: string) => void;
  setVisibleSprites: (sprites: string[]) => void;
  setExpression: (character: string, expression: string) => void;
  addSprite: (character: string, expression: string) => void;
  removeSprite: (character: string) => void;

  // Score actions
  addScore: (points: number) => void;
  setLunaeTrust: (value: number) => void;
  setGaveChoice: (value: boolean) => void;
  reset: () => void;
}

const initialState = {
  score: 0,
  lunae_trust: 0,
  gave_choice: false,
  currentBg: null,
  currentMusic: null,
  currentCG: null,
  currentScene: "",
  currentSceneLabel: "",
  sceneMode: "calm" as SceneMode,
  emphasis: "none" as Emphasis,
  disturbanceTrigger: 0,
  bgTransition: "crossfade" as BgTransition,
  currentSpeaker: "",
  visibleSprites: [],
  currentExpression: {},
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialState,

      setBg: (bg) => set({ currentBg: bg }),
      setMusic: (music) => set({ currentMusic: music }),
      setCG: (cg) => set({ currentCG: cg }),
      setCurrentScene: (scene, label) =>
        set({ currentScene: scene, currentSceneLabel: label }),
      setSceneMode: (mode) => set({ sceneMode: mode }),

      setEmphasis: (e) => set({ emphasis: e }),
      bumpDisturbance: () => set((s) => ({ disturbanceTrigger: s.disturbanceTrigger + 1 })),
      setBgTransition: (t) => set({ bgTransition: t }),

      setSpeaker: (name) => set({ currentSpeaker: name }),

      setVisibleSprites: (sprites) =>
        set((s) => {
          // Only update if the list actually changed
          if (
            s.visibleSprites.length === sprites.length &&
            s.visibleSprites.every((v, i) => v === sprites[i])
          ) {
            return s;
          }
          return { visibleSprites: sprites };
        }),

      setExpression: (character, expression) =>
        set((s) => ({
          currentExpression: { ...s.currentExpression, [character]: expression },
        })),

      addSprite: (character, expression) =>
        set((s) => ({
          visibleSprites: s.visibleSprites.includes(character)
            ? s.visibleSprites
            : [...s.visibleSprites, character],
          currentExpression: { ...s.currentExpression, [character]: expression },
        })),

      removeSprite: (character) =>
        set((s) => {
          const { [character]: _, ...restExpressions } = s.currentExpression;
          return {
            visibleSprites: s.visibleSprites.filter((c) => c !== character),
            currentExpression: restExpressions,
            currentSpeaker:
              s.currentSpeaker === character ? "" : s.currentSpeaker,
          };
        }),

      addScore: (points) => set((s) => ({ score: s.score + points })),
      setLunaeTrust: (value) => set({ lunae_trust: value }),
      setGaveChoice: (value) => set({ gave_choice: value }),
      reset: () => set(initialState),
    }),
    {
      name: "stella-overflow-state",
      // Clear persisted state on load so game always starts fresh
      onRehydrateStorage: () => (state) => {
        state?.reset();
      },
    }
  )
);
