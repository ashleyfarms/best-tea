import { Link } from 'react-router-dom';
import { PossJonah } from '../components/PossJonah';

export function Home() {
  return (
    <div className="page home">
      <PossJonah moment="home" />

      <section className="hero hero--big">
        <p className="eyebrow">Poss Jonah says</p>
        <h1>Best iced tea in the South</h1>
        <div className="prose opening-copy">
          <p>
            Being from The South, iced tea is of the utmost importance. Some may
            gauge a restaurant on the cleanliness of the bathrooms. Some use the
            quality of service. Some even by the quality of the food! But in The
            South, the tea is the ultimate indicator of the business. If they
            have bad tea, well forget it, I&apos;ll never go back.
          </p>
          <p className="opening-copy__ask">
            What about you? Where have you found the best tea in town?
          </p>
        </div>
        <div className="cta-row">
          <Link to="/cities" className="btn btn--primary">
            🍵 Hunt the best glass
          </Link>
          <Link to="/nominate" className="btn btn--ghost">
            Pour one out for good tea
          </Link>
        </div>
      </section>

      <section className="how-steps" aria-label="How it works">
        <div className="how-step">
          <span className="how-step__icon" aria-hidden="true">
            🗺️
          </span>
          <h2>Pick a city</h2>
          <p>Browse Southern towns from Memphis to Charleston and beyond.</p>
        </div>
        <div className="how-step">
          <span className="how-step__icon" aria-hidden="true">
            👍
          </span>
          <h2>Cheer the best</h2>
          <p>One tap. No downvotes. Only the good stuff rises.</p>
        </div>
        <div className="how-step">
          <span className="how-step__icon" aria-hidden="true">
            🍯
          </span>
          <h2>Nominate kindly</h2>
          <p>Share a place and a short positive note. Keep it sweet.</p>
        </div>
      </section>
    </div>
  );
}
