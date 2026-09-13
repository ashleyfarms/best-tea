import type { Place } from './types';

/** Example Memphis spots so the list isn't empty on first load */
export const SEED_PLACES: Place[] = [
  {
    id: 'ex-memphis-central',
    cityId: 'memphis-tn',
    name: 'Central BBQ',
    address: 'Midtown / multiple locations',
    note: 'Sweet tea that tastes like a hug after a long day. Always cold, always right.',
    votes: 12,
    isExample: true,
    createdAt: '2026-01-15T12:00:00.000Z',
  },
  {
    id: 'ex-memphis-arnold',
    cityId: 'memphis-tn',
    name: "Arnold's Country Kitchen (spirit)",
    address: 'Downtown Memphis area favorite style',
    note: 'Classic Southern glass — amber, sweet, and proud. Example entry for Poss Jonah fans.',
    votes: 9,
    isExample: true,
    createdAt: '2026-01-16T12:00:00.000Z',
  },
  {
    id: 'ex-memphis-gus',
    cityId: 'memphis-tn',
    name: "Gus's World Famous Fried Chicken",
    address: 'Downtown Memphis',
    note: 'Tea cold enough to fog the glass. Perfect with hot chicken.',
    votes: 7,
    isExample: true,
    createdAt: '2026-01-17T12:00:00.000Z',
  },
];
