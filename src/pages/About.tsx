import { HelpPalLink } from '../components/HelpPalLink';

export function About() {
  return (
    <div className="page about">
      <header className="page-head">
        <h1>About Best Tea</h1>
        <p className="lede">Poss Jonah&apos;s friendly guide to Southern iced tea.</p>
      </header>

      <div className="prose">
        <h2>Meet Poss Jonah</h2>
        <p>
          Poss Jonah is the warm voice behind Best Tea — a neighbor who knows
          that in The South, the tea tells the truth. Clean bathrooms are nice.
          Good service matters. Food counts. But if the tea is bad? Forget it.
        </p>
        <p>
          This app is user-driven and positivity-only. Nominate spots you love,
          upvote the best glass in town, and skip the worst lists entirely.
        </p>

        <h2>What Best Tea is</h2>
        <ul>
          <li>Free to use — no subscriptions, no paywalls</li>
          <li>City-by-city rankings powered by your upvotes</li>
          <li>Mobile-first, plain language, big tap targets</li>
          <li>Ad-supported later (placeholders today)</li>
        </ul>

        <h2>Help-Pal family</h2>
        <p>
          Best Tea is part of the Help-Pal collection of simple, useful apps.
        </p>
        <HelpPalLink />
      </div>
    </div>
  );
}
