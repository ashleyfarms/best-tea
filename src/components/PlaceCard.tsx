import type { Place } from '../data/types';

type Props = {
  place: Place;
  rank: number;
  hasVoted: boolean;
  onUpvote: (id: string) => void;
};

export function PlaceCard({ place, rank, hasVoted, onUpvote }: Props) {
  return (
    <article className="place-card">
      <div className="place-card__rank" aria-hidden="true">
        #{rank}
      </div>
      <div className="place-card__body">
        <h3 className="place-card__name">{place.name}</h3>
        {place.address ? (
          <p className="place-card__meta">{place.address}</p>
        ) : null}
        {place.note ? <p className="place-card__note">{place.note}</p> : null}
        {place.isExample ? (
          <span className="place-card__badge">Example</span>
        ) : null}
      </div>
      <button
        type="button"
        className={`vote-btn${hasVoted ? ' vote-btn--done' : ''}`}
        onClick={() => onUpvote(place.id)}
        disabled={hasVoted}
        aria-label={
          hasVoted
            ? `Already voted for ${place.name}`
            : `Upvote ${place.name}`
        }
      >
        <span className="vote-btn__icon" aria-hidden="true">
          ▲
        </span>
        <span className="vote-btn__count">{place.votes}</span>
        <span className="vote-btn__label">
          {hasVoted ? 'Voted' : 'Upvote'}
        </span>
      </button>
    </article>
  );
}
