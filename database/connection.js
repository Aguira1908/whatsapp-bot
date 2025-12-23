import db from './knex.js';

export async function checkDB() {
  await db.raw('SELECT 1');
}
