import { useCallback, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AdSlot } from '../components/AdSlot';
import { PlaceCard } from '../components/PlaceCard';
import { PossJonah } from '../components/PossJonah';
import { TeaGlass } from '../components/TeaGlass';
import { VoteToast } from '../components/VoteToast';
import { cityLabel, getCity } from '../data/cities';
import { getStore } from '../data/store';
import type { Place } from '../data/types';

const VOTE_TOASTS = [
  'Poss Jonah tips his hat!',
  'That glass just got colder.',
  'Much obliged — vote counted!',
  'Sweet! The board noticed.',
];

export function CityPage() {
  const { cityId = '' } = useParams();
  const city = getCity(cityId);
  const store = getStore();
  const [tick, setTick] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const firstVoteRef = useRef(
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('best-tea:first-cheer') !== '1'
      : true,
  );
  const toastTimer = useRef<number | null>(null);

  const places: Place[] = useMemo(() => {
    void tick;
    if (!city) return [];
    return store.listByCity(city.id);
  }, [city, store, tick]);

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToast({ visible: true, message });
    toastTimer.current = window.setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 2200);
  }, []);

  const onUpvote = useCallback(
    (placeId: string) => {
      const result = store.upvote(placeId);
      setTick((t) => t + 1);
      if (result.alreadyVoted) return;

      if (firstVoteRef.current) {
        firstVoteRef.current = false;
        try {
          sessionStorage.setItem('best-tea:first-cheer', '1');
        } catch {
          /* ignore */
        }
        showToast('First cheer of the day — Poss Jonah is proud!');
      } else {
        const msg =
          VOTE_TOASTS[Math.floor(Math.random() * VOTE_TOASTS.length)] ??
          VOTE_TOASTS[0];
        showToast(msg);
      }
    },
    [store, showToast],
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
      <VoteToast message={toast.message} visible={toast.visible} />

      <header className="page-head">
        <p className="eyebrow">
          <Link to="/cities">Cities</Link> / {city.stateAbbr}
        </p>
        <h1 className="city-title">
          <TeaGlass size={36} className="city-title__glass" />
          Best tea in {cityLabel(city)}
        </h1>
        <p className="lede">
          It&apos;s a friendly contest — crown the best glass, cheer your
          favorites, nominate with kindness.
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
          <PossJonah moment="empty" />
          <Link
            to={`/nominate?city=${city.id}`}
            className="btn btn--primary"
          >
            Pour the first nomination
          </Link>
        </div>
      ) : (
        <ul className="place-list">
          {places.map((place, i) => (
            <li key={place.id}>
              {i === 2 ? (
                <AdSlot slot="in-feed" className="place-list__ad" />
              ) : null}
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
