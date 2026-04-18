/**
 * French-friendly punctuation substitutions for VN text.
 *
 * - ASCII double quotes `"..."`  → French guillemets `« ... »`
 * - ASCII triple dot `...`       → typographic ellipsis `…`
 * - Ordinary `-` surrounded by text stays untouched (don't confuse with tiret cadratin)
 *
 * Idempotent: running it twice yields the same result.
 */

const GUILLEMET_L = "\u00AB"; // «
const GUILLEMET_R = "\u00BB"; // »
const NBSP = "\u00A0"; // espace insécable (French typographic rule inside guillemets)

function smartQuotes(input: string): string {
  let out = "";
  let open = true;
  for (const ch of input) {
    if (ch === '"') {
      if (open) {
        out += `${GUILLEMET_L}${NBSP}`;
      } else {
        out += `${NBSP}${GUILLEMET_R}`;
      }
      open = !open;
    } else {
      out += ch;
    }
  }
  return out;
}

function smartEllipsis(input: string): string {
  return input.replace(/\.{3,}/g, "\u2026");
}

export function smartPunct(input: string): string {
  if (!input) return input;
  return smartQuotes(smartEllipsis(input));
}
