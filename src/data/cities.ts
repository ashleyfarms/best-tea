import type { City } from './types';

export const CITIES: City[] = [
  { id: 'memphis-tn', name: 'Memphis', state: 'Tennessee', stateAbbr: 'TN' },
  { id: 'nashville-tn', name: 'Nashville', state: 'Tennessee', stateAbbr: 'TN' },
  { id: 'knoxville-tn', name: 'Knoxville', state: 'Tennessee', stateAbbr: 'TN' },
  { id: 'chattanooga-tn', name: 'Chattanooga', state: 'Tennessee', stateAbbr: 'TN' },
  { id: 'birmingham-al', name: 'Birmingham', state: 'Alabama', stateAbbr: 'AL' },
  { id: 'huntsville-al', name: 'Huntsville', state: 'Alabama', stateAbbr: 'AL' },
  { id: 'mobile-al', name: 'Mobile', state: 'Alabama', stateAbbr: 'AL' },
  { id: 'atlanta-ga', name: 'Atlanta', state: 'Georgia', stateAbbr: 'GA' },
  { id: 'savannah-ga', name: 'Savannah', state: 'Georgia', stateAbbr: 'GA' },
  { id: 'charleston-sc', name: 'Charleston', state: 'South Carolina', stateAbbr: 'SC' },
  { id: 'columbia-sc', name: 'Columbia', state: 'South Carolina', stateAbbr: 'SC' },
  { id: 'charlotte-nc', name: 'Charlotte', state: 'North Carolina', stateAbbr: 'NC' },
  { id: 'raleigh-nc', name: 'Raleigh', state: 'North Carolina', stateAbbr: 'NC' },
  { id: 'louisville-ky', name: 'Louisville', state: 'Kentucky', stateAbbr: 'KY' },
  { id: 'lexington-ky', name: 'Lexington', state: 'Kentucky', stateAbbr: 'KY' },
  { id: 'new-orleans-la', name: 'New Orleans', state: 'Louisiana', stateAbbr: 'LA' },
  { id: 'baton-rouge-la', name: 'Baton Rouge', state: 'Louisiana', stateAbbr: 'LA' },
  { id: 'little-rock-ar', name: 'Little Rock', state: 'Arkansas', stateAbbr: 'AR' },
  { id: 'jackson-ms', name: 'Jackson', state: 'Mississippi', stateAbbr: 'MS' },
  { id: 'oxford-ms', name: 'Oxford', state: 'Mississippi', stateAbbr: 'MS' },
  { id: 'richmond-va', name: 'Richmond', state: 'Virginia', stateAbbr: 'VA' },
  { id: 'jacksonville-fl', name: 'Jacksonville', state: 'Florida', stateAbbr: 'FL' },
  { id: 'miami-fl', name: 'Miami', state: 'Florida', stateAbbr: 'FL' },
  { id: 'tampa-fl', name: 'Tampa', state: 'Florida', stateAbbr: 'FL' },
  { id: 'orlando-fl', name: 'Orlando', state: 'Florida', stateAbbr: 'FL' },
  { id: 'tallahassee-fl', name: 'Tallahassee', state: 'Florida', stateAbbr: 'FL' },
  { id: 'pensacola-fl', name: 'Pensacola', state: 'Florida', stateAbbr: 'FL' },
  { id: 'houston-tx', name: 'Houston', state: 'Texas', stateAbbr: 'TX' },
  { id: 'dallas-tx', name: 'Dallas', state: 'Texas', stateAbbr: 'TX' },
  { id: 'austin-tx', name: 'Austin', state: 'Texas', stateAbbr: 'TX' },
  { id: 'san-antonio-tx', name: 'San Antonio', state: 'Texas', stateAbbr: 'TX' },
  { id: 'fort-worth-tx', name: 'Fort Worth', state: 'Texas', stateAbbr: 'TX' },
  { id: 'el-paso-tx', name: 'El Paso', state: 'Texas', stateAbbr: 'TX' },
];

export function getCity(id: string): City | undefined {
  return CITIES.find((c) => c.id === id);
}

export function cityLabel(city: City): string {
  return `${city.name}, ${city.stateAbbr}`;
}

export function groupCitiesByState(): { state: string; stateAbbr: string; cities: City[] }[] {
  const map = new Map<string, { state: string; stateAbbr: string; cities: City[] }>();
  for (const city of CITIES) {
    const key = city.stateAbbr;
    if (!map.has(key)) {
      map.set(key, { state: city.state, stateAbbr: city.stateAbbr, cities: [] });
    }
    map.get(key)!.cities.push(city);
  }
  return Array.from(map.values()).sort((a, b) => a.state.localeCompare(b.state));
}
