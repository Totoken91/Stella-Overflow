import { Story } from "inkjs";
import { useGameStore, type SceneMode, type Emphasis, type BgTransition } from "./gameState";

const VALID_TRANSITIONS: readonly BgTransition[] = [
  "crossfade",
  "fade-black",
  "fade-white",
  "fade-crimson",
  "cut",
];

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

  // Pre-pass: TRANSITION must be set before BG is processed so the
  // Background component reads the correct transition for this change.
  for (const tag of tags) {
    const [key, ...rest] = tag.split(":");
    if (key.trim().toUpperCase() !== "TRANSITION") continue;
    const v = rest.join(":").trim().toLowerCase() as BgTransition;
    store.setBgTransition(
      VALID_TRANSITIONS.includes(v) ? v : "crossfade"
    );
    break;
  }

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

      case "CG":
        store.setCG(value || null);
        break;

      case "SCENE": {
        const sceneName = value.trim();
        const labels: Record<string, string> = {
          scene1: "Scène 1 — La Rencontre",
          scene2: "Scène 2 — Premier Sauvetage",
          scene3: "Scène 3 — Deuxième Intervention",
          scene4: "Scène 4 — La Célébrité",
          scene5: "Scène 5 — La Crise",
          scene6: "Scène 6 — Révélation de Lunae",
          scene7: "Scène 7 — L'Incident",
          scene8: "Scène 8 — L'Épilogue",
        };
        store.setCurrentScene(sceneName, labels[sceneName] || sceneName);
        break;
      }

      case "MOOD":
        store.setSceneMode(value as SceneMode);
        break;

      case "EMPHASIS": {
        const v = (value || "none").toLowerCase();
        const valid: Emphasis[] = ["none", "thought", "whisper"];
        store.setEmphasis((valid.includes(v as Emphasis) ? v : "none") as Emphasis);
        break;
      }

      case "DISTURB":
        store.bumpDisturbance();
        break;

      case "TRANSITION":
        // Handled in pre-pass above
        break;

      case "STOP_FF":
        // Checked externally via hasStopFF()
        break;
    }
  }
}

export async function init(url: string = "/story/scene1.json"): Promise<boolean> {
  try {
    const response = await fetch(url);
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

  // Emphasis + BG transition are per-line: reset before processing this
  // line's tags so the absence of the matching tag clears the previous
  // state.
  const store = useGameStore.getState();
  store.setEmphasis("none");
  store.setBgTransition("crossfade");

  let text = story.Continue();
  processTags(story.currentTags);

  while ((text === null || text.trim() === "") && story.canContinue) {
    text = story.Continue();
    processTags(story.currentTags);
  }

  return text && text.trim() !== "" ? text : null;
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

export function saveState(): string | null {
  if (!story || !storyLoaded) return null;
  // toJson() returns a string in inkjs 2.4
  return story.state.toJson();
}

export function loadState(stateJson: string): boolean {
  if (!story || !storyLoaded) return false;
  try {
    // LoadJson expects a parsed object in inkjs 2.4
    story.state.LoadJson(JSON.parse(stateJson));
    return true;
  } catch {
    return false;
  }
}

export function hasStopFF(): boolean {
  if (!story) return false;
  const tags = story.currentTags;
  if (!tags) return false;
  return tags.some((t) => t.trim().toUpperCase() === "STOP_FF");
}

export function canContinue(): boolean {
  if (!story || !storyLoaded) return false;
  return story.canContinue;
}
