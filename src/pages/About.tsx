import { Link } from 'react-router-dom';
import { PossJonah } from '../components/PossJonah';
import { HelpPalLink } from '../components/HelpPalLink';

export function About() {
  return (
    <div className="page about">
      <header className="page-head">
        <h1>About Best Tea</h1>
        <p className="lede">A friendly little contest for Southern iced tea.</p>
      </header>

      <PossJonah
        moment="about"
        line="I'm Poss Jonah — neighbor, tea taster, and your host. Pull up a chair."
      />

      <div className="prose">
        <p>
          In The South, the tea tells the truth. Clean bathrooms are nice. Good
          service matters. Food counts. But if the tea is bad? Forget it.
        </p>
        <p>
          Poss Jonah is our mascot: a tough opossum in plaid, fedora, and
          work boots, leaning on a lamppost with a wheat stem in his teeth.
          He hosts this hunt — no cowboy-emoji stand-in, just the real
          possum tipping his hat when the tea is honest.
        </p>
        <p>
          Best Tea is free, user-driven, and positivity-only. Hunt the best
          glass by city, cheer your favorites, and nominate spots you love —
          no worst lists, no subscriptions.
        </p>
        <p>
          See our <Link to="/privacy">Privacy Policy</Link> for how nominations,
          votes, and ads are handled.
        </p>
        <HelpPalLink />
      </div>
    </div>
  );
}
