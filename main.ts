// Make the AI Judge Laugh: the Office Joke Open.
// Writes one original single-line joke about office life to entry.txt
// inside the harness output directory. Deterministic: the same line,
// byte for byte, on every run. Standard library only, no network,
// no randomness, no clock.
//
// The joke is built on a single office artifact, the calendar block for
// focus time: the protection meant to keep meetings away becomes the
// reason for a new meeting, and the payoff lands in the final words,
// where the new meeting turns out to be about the focus time itself.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line, 106 characters: a blocked focus-time slot invites a meeting
// about the focus time itself. Kept short on purpose: on an exact tie
// the smaller text places first.
const JOKE =
  "I blocked two hours for focus time, so my boss booked a meeting called 'Quick chat about your focus time'.";

const MAX_CHARS = 200;

function main(): void {
  if (JOKE.length === 0 || JOKE.length > MAX_CHARS) {
    throw new Error(
      `Joke must be 1 to ${MAX_CHARS} characters, got ${JOKE.length}.`,
    );
  }
  if (JOKE.trim().length === 0) {
    throw new Error("Joke must not be only white space.");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "output";
  mkdirSync(outDir, { recursive: true });
  // Exactly the line, no trailing newline and no extra words, so the
  // gate reads precisely what the judge will compare. A trailing
  // newline would count toward the 200-character gate, so none is added.
  writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
  console.log(`Wrote entry.txt (${JOKE.length} characters).`);
}

main();
