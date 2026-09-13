import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CITIES, cityLabel, getCity } from '../data/cities';
import { getStore } from '../data/store';

export function Nominate() {
  const [params] = useSearchParams();
  const preset = params.get('city') ?? '';
  const navigate = useNavigate();
  const store = getStore();

  const [cityId, setCityId] = useState(preset && getCity(preset) ? preset : '');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const cityOptions = useMemo(
    () =>
      [...CITIES].sort((a, b) =>
        cityLabel(a).localeCompare(cityLabel(b)),
      ),
    [],
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const trimmed = name.trim();
    if (!cityId) {
      setError('Please pick a city.');
      return;
    }
    if (!trimmed) {
      setError('Place name is required.');
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
      navigate(`/city/${place.cityId}`, { replace: false });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save nomination.');
    }
  }

  return (
    <div className="page">
      <header className="page-head">
        <h1>Nominate a spot</h1>
        <p className="lede">
          Share a place with great iced tea. Keep it positive — no roasting,
          no worst lists.
        </p>
      </header>

      <form className="form" onSubmit={onSubmit} noValidate>
        <label className="field">
          <span className="field__label">City *</span>
          <select
            className="field__input"
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            required
          >
            <option value="">Select a city…</option>
            {cityOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {cityLabel(c)}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">Place name *</span>
          <input
            className="field__input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Central BBQ"
            maxLength={120}
            required
            autoComplete="organization"
          />
        </label>

        <label className="field">
          <span className="field__label">Address or area (optional)</span>
          <input
            className="field__input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Neighborhood or street"
            maxLength={160}
          />
        </label>

        <label className="field">
          <span className="field__label">Why it&apos;s great (optional)</span>
          <textarea
            className="field__input field__input--area"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Short, positive note — sweetness, chill, glass size…"
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
            Submit nomination
          </button>
          <Link to={cityId ? `/city/${cityId}` : '/cities'} className="btn btn--ghost">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
