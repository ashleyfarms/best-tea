#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { neon } from '@neondatabase/serverless';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sqlPath = join(__dirname, '..', 'sql', '001_best_tea_places.sql');
const url = process.env.DATABASE_URL;

if (!url || !url.includes('://')) {
  console.error('[migrate] DATABASE_URL must be a postgres connection string');
  process.exit(1);
}

const sqlText = readFileSync(sqlPath, 'utf8');
const sql = neon(url);

const withoutLineComments = sqlText
  .split('\n')
  .map((line) => {
    const idx = line.indexOf('--');
    return idx >= 0 ? line.slice(0, idx) : line;
  })
  .join('\n');

const statements = withoutLineComments
  .split(';')
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

for (const statement of statements) {
  await sql.query(statement);
  console.log('[migrate] OK:', statement.slice(0, 72).replace(/\s+/g, ' ') + '…');
}

const count = await sql`SELECT COUNT(*)::int AS n FROM best_tea_places`;
console.log('[migrate] best_tea_places rows:', count[0].n);
