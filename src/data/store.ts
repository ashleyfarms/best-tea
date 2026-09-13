import type { NominateInput, Place, PlaceStore } from './types';

const VOTES_KEY = 'best-tea:votes:v1';

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

function markVoted(placeId: string): void {
  const votes = readVoteSet();
  votes.add(placeId);
  writeVoteSet(votes);
}

async function parseError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    if (data?.error) return data.error;
  } catch {
    /* ignore */
  }
  return `Request failed (${res.status})`;
}

/**
 * Shared Neon-backed store via Netlify Functions.
 * localStorage is ONLY used for one-cheer-per-browser UX locks.
 */
export const apiStore: PlaceStore = {
  async listByCity(cityId) {
    const res = await fetch(
      `/api/places?cityId=${encodeURIComponent(cityId)}`,
    );
    if (!res.ok) throw new Error(await parseError(res));
    const data = (await res.json()) as { places: Place[] };
    return Array.isArray(data.places) ? data.places : [];
  },

  async nominate(input: NominateInput): Promise<Place> {
    const name = input.name.trim();
    if (!name) throw new Error('Place name is required');
    if (!input.cityId) throw new Error('City is required');

    const res = await fetch('/api/places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cityId: input.cityId,
        name,
        address: input.address?.trim() || undefined,
        note: input.note?.trim() || undefined,
      }),
    });
    if (!res.ok) throw new Error(await parseError(res));
    const data = (await res.json()) as { place: Place };
    // Nominator's first upvote is locked in locally
    markVoted(data.place.id);
    return data.place;
  },

  async upvote(placeId) {
    if (readVoteSet().has(placeId)) {
      return {
        place: {
          id: placeId,
          cityId: '',
          name: '',
          votes: 0,
          createdAt: new Date().toISOString(),
        },
        alreadyVoted: true,
      };
    }

    const res = await fetch(
      `/api/places/${encodeURIComponent(placeId)}/upvote`,
      { method: 'POST' },
    );
    if (!res.ok) throw new Error(await parseError(res));
    const data = (await res.json()) as { place: Place };
    markVoted(placeId);
    return { place: data.place, alreadyVoted: false };
  },

  hasVoted(placeId) {
    return readVoteSet().has(placeId);
  },
};

export function getStore(): PlaceStore {
  return apiStore;
}
