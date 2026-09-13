/** Shared place + vote types. Swap LocalStore for Netlify Function + Neon later. */

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

/** Data-store contract — implement with localStorage now, Neon later */
export interface PlaceStore {
  listByCity(cityId: CityId): Place[];
  getPlace(id: string): Place | undefined;
  nominate(input: NominateInput): Place;
  upvote(placeId: string): { place: Place; alreadyVoted: boolean };
  hasVoted(placeId: string): boolean;
}
