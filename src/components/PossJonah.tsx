import { useMemo } from 'react';

const QUIPS = {
  home: [
    "Pull up a chair, friend. We're huntin' the best glass in the South.",
    "Tea tells the truth 'round here. Let's find yours.",
    "Sweet, cold, and honest — that's how we measure a place.",
  ],
  empty: [
    "This town's glass is still empty. Be the first to pour one out!",
    "No tea tales yet — your nomination could start the whole picnic.",
    "Quiet as a porch at dawn. Got a favorite spot to share?",
  ],
  success: [
    "Well now! That's a fine pour. Poss Jonah tips his hat to you.",
    "Bless your heart — that nomination's on the board!",
    "You just made this town a little sweeter. Much obliged!",
  ],
  cities: [
    "Pick a destination and hunt the best glass in town.",
    "Every city's got a champion — go find yours.",
  ],
  about: [
    "I'm Poss Jonah — neighbor, tea taster, and your friendly host.",
  ],
} as const;

export type PossMoment = keyof typeof QUIPS;

type Props = {
  moment: PossMoment;
  /** Override rotating quip with a fixed line */
  line?: string;
  className?: string;
};

function pickQuip(moment: PossMoment): string {
  const list = QUIPS[moment];
  const i = Math.floor(Math.random() * list.length);
  return list[i] ?? list[0];
}

/** Friendly host strip — Poss Jonah mascot + Southern speech bubble */
export function PossJonah({ moment, line, className = '' }: Props) {
  const quip = useMemo(() => line ?? pickQuip(moment), [moment, line]);

  return (
    <aside
      className={`poss ${className}`.trim()}
      aria-label="Poss Jonah says"
    >
      <img src="/poss-jonah-logo.png" alt="" className="poss__logo" />
      <div className="poss__bubble">
        <p className="poss__name">Poss Jonah</p>
        <p className="poss__line">{quip}</p>
      </div>
    </aside>
  );
}
