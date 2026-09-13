import { getSql, json, mapPlace, newId } from './lib/db.mjs';

function apiPath(event) {
  // After /api/* → /.netlify/functions/api/:splat , path often ends with /places...
  const raw = event.path || '';
  const idx = raw.indexOf('/api/');
  if (idx >= 0) return raw.slice(idx + 4); // keep leading path after /api
  // splat style: /.netlify/functions/api/places/...
  const m = raw.match(/\/\.netlify\/functions\/api(\/.*)?$/);
  if (m) return m[1] || '/';
  // fallback: strip function prefix
  return raw.replace(/^\/\.netlify\/functions\/api/, '') || '/';
}

export async function handler(event) {
  try {
    const sql = getSql();
    const method = event.httpMethod || 'GET';
    const path = apiPath(event);
    const parts = path.split('/').filter(Boolean); // e.g. ['places'] or ['places', id, 'upvote']

    // GET /places?cityId=
    if (method === 'GET' && parts[0] === 'places' && parts.length === 1) {
      const cityId =
        event.queryStringParameters?.cityId ||
        event.queryStringParameters?.city_id ||
        '';
      if (!cityId) {
        return json(400, { error: 'cityId query param is required' });
      }
      const rows = await sql`
        SELECT id, city_id, name, address, note, votes, is_example, created_at
        FROM best_tea_places
        WHERE city_id = ${cityId}
        ORDER BY votes DESC, name ASC
      `;
      return json(200, { places: rows.map(mapPlace) });
    }

    // POST /places
    if (method === 'POST' && parts[0] === 'places' && parts.length === 1) {
      let body;
      try {
        body = JSON.parse(event.body || '{}');
      } catch {
        return json(400, { error: 'Invalid JSON body' });
      }
      const cityId = String(body.cityId || body.city_id || '').trim();
      const name = String(body.name || '').trim();
      const address = body.address != null ? String(body.address).trim() : '';
      const note = body.note != null ? String(body.note).trim() : '';
      if (!cityId) return json(400, { error: 'cityId is required' });
      if (!name) return json(400, { error: 'name is required' });
      if (name.length > 120) return json(400, { error: 'name too long' });
      if (address.length > 160) return json(400, { error: 'address too long' });
      if (note.length > 280) return json(400, { error: 'note too long' });

      const id = newId();
      const rows = await sql`
        INSERT INTO best_tea_places (id, city_id, name, address, note, votes, is_example, created_at)
        VALUES (
          ${id},
          ${cityId},
          ${name},
          ${address || null},
          ${note || null},
          1,
          FALSE,
          NOW()
        )
        RETURNING id, city_id, name, address, note, votes, is_example, created_at
      `;
      return json(201, { place: mapPlace(rows[0]) });
    }

    // POST /places/:id/upvote
    if (
      method === 'POST' &&
      parts[0] === 'places' &&
      parts.length === 3 &&
      parts[2] === 'upvote'
    ) {
      const id = decodeURIComponent(parts[1]);
      const rows = await sql`
        UPDATE best_tea_places
        SET votes = votes + 1
        WHERE id = ${id}
        RETURNING id, city_id, name, address, note, votes, is_example, created_at
      `;
      if (!rows.length) return json(404, { error: 'Place not found' });
      return json(200, { place: mapPlace(rows[0]) });
    }

    return json(404, { error: 'Not found', path, parts });
  } catch (err) {
    console.error('api error', err);
    return json(500, {
      error: err instanceof Error ? err.message : 'Server error',
    });
  }
}
