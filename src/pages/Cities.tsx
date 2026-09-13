import { Link } from 'react-router-dom';
import { PossJonah } from '../components/PossJonah';
import { getCity, groupCitiesByState } from '../data/cities';

export function Cities() {
  const groups = groupCitiesByState();
  const memphis = getCity('memphis-tn');

  return (
    <div className="page">
      <header className="page-head">
        <h1>Pick a destination</h1>
        <p className="lede">
          Where have you found the best iced tea? Start with your town.
        </p>
      </header>

      <PossJonah moment="cities" />

      {memphis ? (
        <section className="featured-city" aria-label="Featured city">
          <p className="eyebrow">Quick pick</p>
          <Link to={`/city/${memphis.id}`} className="featured-city__card">
            <span className="featured-city__icon" aria-hidden="true">
              🍵
            </span>
            <span className="featured-city__text">
              <strong>{memphis.name}</strong>
              <span> · {memphis.stateAbbr} — Poss Jonah&apos;s hometown board</span>
            </span>
            <span className="featured-city__go" aria-hidden="true">
              →
            </span>
          </Link>
        </section>
      ) : null}

      <div className="state-groups">
        {groups.map((group) => (
          <section key={group.stateAbbr} className="state-group">
            <h2 className="state-group__title">
              <span className="state-chip">{group.stateAbbr}</span>
              {group.state}
            </h2>
            <ul className="city-list">
              {group.cities.map((city) => (
                <li key={city.id}>
                  <Link to={`/city/${city.id}`} className="city-chip">
                    <span className="city-chip__tea" aria-hidden="true">
                      🍵
                    </span>
                    <span>
                      {city.name}
                      <span className="city-chip__state"> · {city.stateAbbr}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
