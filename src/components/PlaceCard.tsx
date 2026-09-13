import { useState } from 'react';
import type { Place } from '../data/types';
import { TeaGlass } from './TeaGlass';

type Props = {
  place: Place;
  rank: number;
  hasVoted: boolean;
  onUpvote: (id: string) => void;
};

function rankBadge(rank: number): { className: string; label: string } {
  if (rank === 1) return { className: 'place-card--gold', label: '👑' };
  if (rank === 2) return { className: 'place-card--silver', label: '🥈' };
  if (rank === 3) return { className: 'place-card--bronze', label: '🥉' };
  return { className: '', label: `#${rank}` };
}

export function PlaceCard({ place, rank, hasVoted, onUpvote }: Props) {
  const [popping, setPopping] = useState(false);
  const medal = rankBadge(rank);

  function handleVote() {
    if (hasVoted) return;
    setPopping(true);
    onUpvote(place.id);
    window.setTimeout(() => setPopping(false), 450);
  }

  return (
    <article
      className={`place-card ${medal.className}`.trim()}
    >
      <div className="place-card__rank" aria-hidden="true">
        {medal.label}
      </div>
      <div className="place-card__body">
        <h3 className="place-card__name">{place.name}</h3>
        {place.address ? (
          <p className="place-card__meta">{place.address}</p>
        ) : null}
        {place.note ? (
          <blockquote className="place-card__note">
            &ldquo;{place.note}&rdquo;
          </blockquote>
        ) : null}
        {place.isExample ? (
          <span className="place-card__badge">Starter pick</span>
        ) : null}
      </div>
      <button
        type="button"
        className={`vote-btn${hasVoted ? ' vote-btn--done' : ''}${
          popping ? ' vote-btn--pop' : ''
        }`}
        onClick={handleVote}
        disabled={hasVoted}
        aria-label={
          hasVoted
            ? `Already cheered ${place.name}`
            : `Cheer ${place.name}`
        }
      >
        <span className="vote-btn__icon" aria-hidden="true">
          {hasVoted ? '✓' : <TeaGlass size={22} />}
        </span>
        <span className="vote-btn__count">{place.votes}</span>
        <span className="vote-btn__label">
          {hasVoted ? 'Cheered' : 'Cheer'}
        </span>
      </button>
    </article>
  );
}
