import { Story } from "inkjs";
import { useGameStore } from "./gameState";

let story: Story | null = null;
let storyLoaded = false;

/**
 * Parse "etoile-neutre" → { character: "etoile", expression: "neutre" }
 */
function parseSpriteToken(token: string): {
  character: string;
  expression: string;
} {
  const dashIndex = token.indexOf("-");
  if (dashIndex === -1) {
    return { character: token, expression: "neutre" };
  }
  return {
    character: token.slice(0, dashIndex),
    expression: token.slice(dashIndex + 1),
  };
}

function processTags(tags: string[] | null) {
  if (!tags) return;

  const store = useGameStore.getState();

  for (const tag of tags) {
    const [key, ...rest] = tag.split(":");
    const value = rest.join(":").trim();
    const command = key.trim().toUpperCase();

    switch (command) {
      case "SPRITE": {
        // "etoile-neutre" or "etoile-neutre lunae-enthousiaste"
        const tokens = value.split(/\s+/).filter(Boolean);
        const newSprites: string[] = [];
        for (const token of tokens) {
          const { character, expression } = parseSpriteToken(token);
          newSprites.push(character);
          store.setExpression(character, expression);
        }
        store.setVisibleSprites(newSprites);
        break;
      }

      case "SPEAKER":
        store.setSpeaker(value || "");
        break;

      case "ENTER": {
        // "lunae-surprise"
        const { character, expression } = parseSpriteToken(value);
        store.addSprite(character, expression);
        break;
      }

      case "EXIT":
        store.removeSprite(value.trim());
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
