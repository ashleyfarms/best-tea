import { getSql, json, mapPlace, newId } from './_db.mjs';

export async function handler(event) {
  try {
    const sql = getSql();
    const method = event.httpMethod || 'GET';

    if (method === 'GET') {
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

    if (method === 'POST') {
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

    return json(405, { error: 'Method not allowed' });
  } catch (err) {
    console.error('places error', err);
    return json(500, {
      error: err instanceof Error ? err.message : 'Server error',
    });
  }
}
