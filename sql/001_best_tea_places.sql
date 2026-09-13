-- Best Tea shared nominations (Neon). Prefixed to avoid clobbering other apps.
CREATE TABLE IF NOT EXISTS best_tea_places (
  id TEXT PRIMARY KEY,
  city_id TEXT NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  note TEXT,
  votes INTEGER NOT NULL DEFAULT 1 CHECK (votes >= 0),
  is_example BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS best_tea_places_city_votes_idx
  ON best_tea_places (city_id, votes DESC, name ASC);

-- Optional server-side vote dedupe (not required if client keeps localStorage locks).
CREATE TABLE IF NOT EXISTS best_tea_vote_locks (
  place_id TEXT NOT NULL REFERENCES best_tea_places(id) ON DELETE CASCADE,
  voter_key TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (place_id, voter_key)
);

-- Seed Memphis examples once (idempotent by primary key).
INSERT INTO best_tea_places (id, city_id, name, address, note, votes, is_example, created_at)
VALUES
  (
    'ex-memphis-central',
    'memphis-tn',
    'Central BBQ',
    'Midtown / multiple locations',
    'Sweet tea that tastes like a hug after a long day. Always cold, always right.',
    12,
    TRUE,
    '2026-01-15T12:00:00.000Z'
  ),
  (
    'ex-memphis-arnold',
    'memphis-tn',
    'Arnold''s Country Kitchen (spirit)',
    'Downtown Memphis area favorite style',
    'Classic Southern glass — amber, sweet, and proud. Example entry for Poss Jonah fans.',
    9,
    TRUE,
    '2026-01-16T12:00:00.000Z'
  ),
  (
    'ex-memphis-gus',
    'memphis-tn',
    'Gus''s World Famous Fried Chicken',
    'Downtown Memphis',
    'Tea cold enough to fog the glass. Perfect with hot chicken.',
    7,
    TRUE,
    '2026-01-17T12:00:00.000Z'
  )
ON CONFLICT (id) DO NOTHING;
