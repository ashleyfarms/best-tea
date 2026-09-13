import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PossJonah } from '../components/PossJonah';
import { TeaGlass } from '../components/TeaGlass';
import { CITIES, cityLabel, getCity } from '../data/cities';
import { getStore } from '../data/store';

export function Nominate() {
  const [params] = useSearchParams();
  const preset = params.get('city') ?? '';
  const store = getStore();

  const [cityId, setCityId] = useState(preset && getCity(preset) ? preset : '');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [doneCityId, setDoneCityId] = useState<string | null>(null);
  const [doneName, setDoneName] = useState('');

  const cityOptions = useMemo(
    () =>
      [...CITIES].sort((a, b) =>
        cityLabel(a).localeCompare(cityLabel(b)),
      ),
    [],
  );

  const doneCity = doneCityId ? getCity(doneCityId) : undefined;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const trimmed = name.trim();
    if (!cityId) {
      setError('Please pick a city — Poss Jonah needs a town!');
      return;
    }
    if (!trimmed) {
      setError('What\'s the place called?');
      return;
    }
    if (note.trim().length > 280) {
      setError('Keep the note under 280 characters — short and sweet.');
      return;
    }

    try {
      const place = store.nominate({
        cityId,
        name: trimmed,
        address,
        note,
      });
      setDoneCityId(place.cityId);
      setDoneName(place.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save nomination.');
    }
  }

  if (doneCityId && doneCity) {
    return (
      <div className="page">
        <div className="success-panel">
          <PossJonah moment="success" />
          <h1>You poured one out!</h1>
          <p className="lede">
            <strong>{doneName}</strong> is on the {cityLabel(doneCity)} board.
            Poss Jonah tippin&apos; his hat to you.
          </p>
          <div className="cta-row">
            <Link to={`/city/${doneCityId}`} className="btn btn--primary">
              See {doneCity.name} rankings
            </Link>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                setDoneCityId(null);
                setDoneName('');
                setName('');
                setAddress('');
                setNote('');
              }}
            >
              Nominate another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-head">
        <h1>Tell us your favorite tea!</h1>
        <p className="lede">
          Share a place with great iced tea. Keep it positive — no roasting,
          no worst lists.
        </p>
      </header>

      <form className="form" onSubmit={onSubmit} noValidate>
        <label className="field">
          <span className="field__label">Which town? *</span>
          <select
            className="field__input"
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            required
          >
            <option value="">Pick a Southern city…</option>
            {cityOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {cityLabel(c)}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">Where&apos;s the good tea? *</span>
          <input
            className="field__input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Central BBQ, Aunt May's diner…"
            maxLength={120}
            required
            autoComplete="organization"
          />
        </label>

        <label className="field">
          <span className="field__label">Neighborhood or street (optional)</span>
          <input
            className="field__input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="So folks can find that glass"
            maxLength={160}
          />
        </label>

        <label className="field">
          <span className="field__label">Why it&apos;s a winner (optional)</span>
          <textarea
            className="field__input field__input--area"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Sweetness, chill, glass size, porch vibes…"
            maxLength={280}
            rows={4}
          />
          <span className="field__hint">{note.length}/280</span>
        </label>

        {error ? (
          <p className="form__error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="cta-row">
          <button type="submit" className="btn btn--primary">
            <TeaGlass size={22} className="btn__tea" /> Add to the board
          </button>
          <Link to={cityId ? `/city/${cityId}` : '/cities'} className="btn btn--ghost">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
