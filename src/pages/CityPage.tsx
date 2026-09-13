import { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AdSlot } from '../components/AdSlot';
import { PlaceCard } from '../components/PlaceCard';
import { cityLabel, getCity } from '../data/cities';
import { getStore } from '../data/store';
import type { Place } from '../data/types';

export function CityPage() {
  const { cityId = '' } = useParams();
  const city = getCity(cityId);
  const store = getStore();
  const [tick, setTick] = useState(0);

  const places: Place[] = useMemo(() => {
    void tick;
    if (!city) return [];
    return store.listByCity(city.id);
  }, [city, store, tick]);

  const onUpvote = useCallback(
    (placeId: string) => {
      store.upvote(placeId);
      setTick((t) => t + 1);
    },
    [store],
  );

  if (!city) {
    return (
      <div className="page">
        <header className="page-head">
          <h1>City not found</h1>
          <p className="lede">That town isn&apos;t on the list yet.</p>
          <Link to="/cities" className="btn btn--primary">
            Back to cities
          </Link>
        </header>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">
          <Link to="/cities">Cities</Link> / {city.stateAbbr}
        </p>
        <h1>Best tea in {cityLabel(city)}</h1>
        <p className="lede">
          Ranked by upvotes. Positivity only — nominate a spot you love.
        </p>
        <div className="cta-row">
          <Link
            to={`/nominate?city=${city.id}`}
            className="btn btn--primary"
          >
            Nominate in {city.name}
          </Link>
        </div>
      </header>

      {places.length === 0 ? (
        <div className="empty">
          <p>No nominations yet. Be the first to share a great glass.</p>
          <Link
            to={`/nominate?city=${city.id}`}
            className="btn btn--primary"
          >
            Nominate a place
          </Link>
        </div>
      ) : (
        <ul className="place-list">
          {places.map((place, i) => (
            <li key={place.id}>
              {i === 2 ? <AdSlot slot="in-feed" className="place-list__ad" /> : null}
              <PlaceCard
                place={place}
                rank={i + 1}
                hasVoted={store.hasVoted(place.id)}
                onUpvote={onUpvote}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
