import { getSql, json, mapPlace } from './lib/db.mjs';

function extractPlaceId(event) {
  const q = event.queryStringParameters || {};
  if (q.id) return String(q.id);

  const candidates = [
    event.path,
    event.rawUrl,
    event.headers?.['x-original-path'],
    event.headers?.['x-forwarded-url'],
    event.headers?.referer,
  ].filter(Boolean);

  for (const c of candidates) {
    const m = String(c).match(
      /\/places\/([^/?#]+)\/upvote|/upvote\/([^/?#]+)/,
    );
    if (m) return decodeURIComponent(m[1] || m[2]);
  }

  // Netlify may pass splat / path segments
  if (event.pathParameters?.id) return String(event.pathParameters.id);
  return '';
}

export async function handler(event) {
  try {
    if ((event.httpMethod || 'GET') !== 'POST') {
      return json(405, { error: 'Method not allowed' });
    }

    const id = extractPlaceId(event);
    if (!id) {
      return json(400, {
        error: 'place id is required',
        debug: {
          path: event.path,
          rawUrl: event.rawUrl,
          query: event.queryStringParameters || null,
        },
      });
    }

    const sql = getSql();
    const rows = await sql`
      UPDATE best_tea_places
      SET votes = votes + 1
      WHERE id = ${id}
      RETURNING id, city_id, name, address, note, votes, is_example, created_at
    `;

    if (!rows.length) {
      return json(404, { error: 'Place not found' });
    }

    return json(200, { place: mapPlace(rows[0]) });
  } catch (err) {
    console.error('upvote error', err);
    return json(500, {
      error: err instanceof Error ? err.message : 'Server error',
    });
  }
}
