import type { NominateInput, Place, PlaceStore } from './types';
import { SEED_PLACES } from './seed';

const PLACES_KEY = 'best-tea:places:v1';
const VOTES_KEY = 'best-tea:votes:v1';

function readPlaces(): Place[] {
  try {
    const raw = localStorage.getItem(PLACES_KEY);
    if (!raw) {
      localStorage.setItem(PLACES_KEY, JSON.stringify(SEED_PLACES));
      return [...SEED_PLACES];
    }
    const parsed = JSON.parse(raw) as Place[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(PLACES_KEY, JSON.stringify(SEED_PLACES));
      return [...SEED_PLACES];
    }
    return parsed;
  } catch {
    return [...SEED_PLACES];
  }
}

function writePlaces(places: Place[]): void {
  localStorage.setItem(PLACES_KEY, JSON.stringify(places));
}

function readVoteSet(): Set<string> {
  try {
    const raw = localStorage.getItem(VOTES_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function writeVoteSet(set: Set<string>): void {
  localStorage.setItem(VOTES_KEY, JSON.stringify([...set]));
}

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `p-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * v1: browser-local store (works offline / Netlify static demo).
 * Later: replace with Netlify Function + Neon implementing the same PlaceStore shape.
 *
 * Multi-user shared votes are NOT synced across browsers yet — see README.
 */
export const localStore: PlaceStore = {
  listByCity(cityId) {
    return readPlaces()
      .filter((p) => p.cityId === cityId)
      .sort((a, b) => b.votes - a.votes || a.name.localeCompare(b.name));
  },

  getPlace(id) {
    return readPlaces().find((p) => p.id === id);
  },

  nominate(input: NominateInput): Place {
    const name = input.name.trim();
    if (!name) throw new Error('Place name is required');
    if (!input.cityId) throw new Error('City is required');

    const place: Place = {
      id: newId(),
      cityId: input.cityId,
      name,
      address: input.address?.trim() || undefined,
      note: input.note?.trim() || undefined,
      votes: 1,
      isExample: false,
      createdAt: new Date().toISOString(),
    };

    const places = readPlaces();
    places.push(place);
    writePlaces(places);

    // Nominator's first upvote is locked in
    const votes = readVoteSet();
    votes.add(place.id);
    writeVoteSet(votes);

    return place;
  },

  upvote(placeId) {
    const votes = readVoteSet();
    if (votes.has(placeId)) {
      const place = readPlaces().find((p) => p.id === placeId);
      if (!place) throw new Error('Place not found');
      return { place, alreadyVoted: true };
    }

    const places = readPlaces();
    const idx = places.findIndex((p) => p.id === placeId);
    if (idx < 0) throw new Error('Place not found');

    places[idx] = { ...places[idx], votes: places[idx].votes + 1 };
    writePlaces(places);
    votes.add(placeId);
    writeVoteSet(votes);

    return { place: places[idx], alreadyVoted: false };
  },

  hasVoted(placeId) {
    return readVoteSet().has(placeId);
  },
};

/** Hook-friendly helpers that trigger re-renders via version bump */
export function getStore(): PlaceStore {
  return localStore;
}
