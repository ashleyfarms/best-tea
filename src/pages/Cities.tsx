import { Link } from 'react-router-dom';
import { cityLabel, groupCitiesByState } from '../data/cities';

export function Cities() {
  const groups = groupCitiesByState();

  return (
    <div className="page">
      <header className="page-head">
        <h1>Pick a city</h1>
        <p className="lede">
          Where have you found the best iced tea? Start with your town.
        </p>
      </header>

      <div className="state-groups">
        {groups.map((group) => (
          <section key={group.stateAbbr} className="state-group">
            <h2 className="state-group__title">
              {group.state}{' '}
              <span className="state-group__abbr">{group.stateAbbr}</span>
            </h2>
            <ul className="city-list">
              {group.cities.map((city) => (
                <li key={city.id}>
                  <Link to={`/city/${city.id}`} className="city-chip">
                    {cityLabel(city)}
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
