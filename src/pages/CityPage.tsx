import { useCallback, useEffect, useRef, useState } from 'react';
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
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [toast, setToast] = useState({ visible: false, message: '' });
  const firstVoteRef = useRef(
    typeof sessionStorage !== 'undefined'
      ? sessionStorage.getItem('best-tea:first-cheer') !== '1'
      : true,
  );
  const toastTimer = useRef<number | null>(null);

  const refresh = useCallback(async () => {
    if (!city) {
      setPlaces([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError('');
    try {
      const list = await store.listByCity(city.id);
      setPlaces(list);
    } catch (err) {
      setLoadError(
        err instanceof Error ? err.message : 'Could not load places.',
      );
    } finally {
      setLoading(false);
    }
  }, [city, store]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToast({ visible: true, message });
    toastTimer.current = window.setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 2200);
  }, []);

  const onUpvote = useCallback(
    async (placeId: string) => {
      try {
        const result = await store.upvote(placeId);
        if (result.alreadyVoted) {
          await refresh();
          return;
        }
        // Optimistic: bump local list with returned place
        setPlaces((prev) =>
          [...prev]
            .map((p) => (p.id === result.place.id ? result.place : p))
            .sort((a, b) => b.votes - a.votes || a.name.localeCompare(b.name)),
        );

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
      } catch (err) {
        showToast(
          err instanceof Error ? err.message : 'Could not record cheer.',
        );
        await refresh();
      }
    },
    [store, showToast, refresh],
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

      {loading ? (
        <p className="lede">Pouring the list…</p>
      ) : loadError ? (
        <div className="empty">
          <p className="lede" role="alert">
            {loadError}
          </p>
          <button type="button" className="btn btn--primary" onClick={() => void refresh()}>
            Try again
          </button>
        </div>
      ) : places.length === 0 ? (
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
                onUpvote={(id) => {
                  void onUpvote(id);
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
