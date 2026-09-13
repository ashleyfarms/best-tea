/** Shared place + vote types. Neon-backed via Netlify Functions. */

export type CityId = string;

export interface City {
  id: CityId;
  name: string;
  state: string;
  stateAbbr: string;
}

export interface Place {
  id: string;
  cityId: CityId;
  name: string;
  address?: string;
  note?: string;
  votes: number;
  /** Seed/demo rows so Memphis isn't empty on first visit */
  isExample?: boolean;
  createdAt: string;
}

export interface NominateInput {
  cityId: CityId;
  name: string;
  address?: string;
  note?: string;
}

/** Data-store contract — API-backed places; localStorage vote locks only */
export interface PlaceStore {
  listByCity(cityId: CityId): Promise<Place[]>;
  nominate(input: NominateInput): Promise<Place>;
  upvote(placeId: string): Promise<{ place: Place; alreadyVoted: boolean }>;
  hasVoted(placeId: string): boolean;
}
