import { Story } from "inkjs";
import { useGameStore } from "./gameState";

let story: Story | null = null;
let storyLoaded = false;

function processTags(tags: string[] | null) {
  if (!tags) return;

  const store = useGameStore.getState();

  for (const tag of tags) {
    const [key, ...rest] = tag.split(":");
    const value = rest.join(":").trim();

    switch (key.trim().toUpperCase()) {
      case "SPRITE":
        store.setSprite(value || null);
        break;
      case "BG":
        store.setBg(value || null);
        break;
      case "MUSIC":
        store.setMusic(value || null);
        break;
    }
  }
}

export async function init(): Promise<boolean> {
  try {
    const response = await fetch("/story/scene1.json");
    const jsonText = await response.text();

    // Check if the JSON is empty or just "{}"
    const parsed = JSON.parse(jsonText);
    if (!parsed || !parsed.inkVersion) {
      storyLoaded = false;
      return false;
    }

    story = new Story(jsonText);
    storyLoaded = true;
    return true;
  } catch {
    storyLoaded = false;
    return false;
  }
}

export function isLoaded(): boolean {
  return storyLoaded;
}

export function getText(): string | null {
  if (!story || !storyLoaded) return null;
  if (!story.canContinue) return null;

  const text = story.Continue();
  processTags(story.currentTags);
  return text ?? null;
}

export function getChoices(): Array<{ text: string; index: number }> {
  if (!story || !storyLoaded) return [];
  return story.currentChoices.map((c) => ({
    text: c.text,
    index: c.index,
  }));
}

export function choose(index: number): void {
  if (!story || !storyLoaded) return;
  story.ChooseChoiceIndex(index);
}

export function getVariable(name: string): unknown {
  if (!story || !storyLoaded) return undefined;
  return story.variablesState.$(name);
}
