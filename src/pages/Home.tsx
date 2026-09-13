import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="page home">
      <section className="hero">
        <p className="eyebrow">Poss Jonah welcomes you</p>
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
            Find tea by city
          </Link>
          <Link to="/nominate" className="btn btn--ghost">
            Nominate a spot
          </Link>
        </div>
      </section>

      <section className="card-grid how">
        <div className="info-card">
          <h2>Pick a city</h2>
          <p>Browse Southern towns from Memphis to Charleston and beyond.</p>
        </div>
        <div className="info-card">
          <h2>Upvote the best</h2>
          <p>One tap. No downvotes. Only the good stuff rises.</p>
        </div>
        <div className="info-card">
          <h2>Nominate with kindness</h2>
          <p>Share a place and a short positive note. Keep it sweet.</p>
        </div>
      </section>
    </div>
  );
}
