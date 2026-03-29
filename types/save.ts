export interface SaveSlot {
  id: number;
  timestamp: number;
  scene: string;
  sceneLabel: string;
  score: number;
  lunae_trust: number;
  gave_choice: boolean;
  inkState: string;
}

export const AUTOSAVE_SLOT_ID = 0;
export const USER_SLOT_IDS = [1, 2, 3] as const;
export const SAVE_STORAGE_KEY = "stella-overflow-saves";
