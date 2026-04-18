export interface SaveSceneState {
  currentBg: string | null;
  currentMusic: string | null;
  currentCG: string | null;
  sceneMode: string;
  emphasis: string;
  bgTransition: string;
  currentSpeaker: string;
  visibleSprites: string[];
  currentExpression: Record<string, string>;
  /**
   * The last displayed dialogue text. Restored verbatim on load so the
   * user sees the passage they saved on, not the next one.
   */
  lastText: string | null;
}

export interface SaveSlot {
  id: number;
  timestamp: number;
  scene: string;
  sceneLabel: string;
  score: number;
  lunae_trust: number;
  gave_choice: boolean;
  inkState: string;
  scene_state?: SaveSceneState;
}

export const AUTOSAVE_SLOT_ID = 0;
export const USER_SLOT_IDS = [1, 2, 3] as const;
export const SAVE_STORAGE_KEY = "stella-overflow-saves";
