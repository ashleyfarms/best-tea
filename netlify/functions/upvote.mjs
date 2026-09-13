import { getSql, json, mapPlace } from './_db.mjs';

export async function handler(event) {
  try {
    if ((event.httpMethod || 'GET') !== 'POST') {
      return json(405, { error: 'Method not allowed' });
    }

    const id =
      event.queryStringParameters?.id ||
      event.pathParameters?.id ||
      '';
    if (!id) {
      return json(400, { error: 'place id is required' });
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
