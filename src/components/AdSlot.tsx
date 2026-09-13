type Props = {
  slot: 'header' | 'in-feed';
  className?: string;
};

/**
 * AdSense-ready placeholder. Replace inner markup with real ad unit later.
 * Keep data-ad-slot attributes so ops can wire publisher IDs without redesign.
 */
export function AdSlot({ slot, className = '' }: Props) {
  const label =
    slot === 'header' ? 'Advertisement — header' : 'Advertisement — in feed';

  return (
    <aside
      className={`ad-slot ad-slot--${slot} ${className}`.trim()}
      aria-label={label}
      data-ad-slot={slot}
      data-ad-ready="placeholder"
    >
      <span className="ad-slot__badge">Ad</span>
      <span className="ad-slot__copy">
        Ad space reserved ({slot}). Google AdSense can plug in here.
      </span>
    </aside>
  );
}
