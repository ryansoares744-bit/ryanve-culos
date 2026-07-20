const { createPool } = require('@vercel/postgres');
const crypto = require('crypto');
const { seedDB } = require('./seed');

let pool;
function db() {
  if (!pool) pool = createPool({ connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL });
  return pool;
}
async function ensure() {
  await db().sql`CREATE TABLE IF NOT EXISTS rv_store (k TEXT PRIMARY KEY, v JSONB NOT NULL)`;
  await db().sql`CREATE TABLE IF NOT EXISTS rv_fotos (id BIGSERIAL PRIMARY KEY, mime TEXT NOT NULL, data TEXT NOT NULL)`;
}
async function saveFoto(dataUrl) {
  const m = /^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i.exec(dataUrl || '');
  if (!m) return null;
  await ensure();
  const r = await db().sql`INSERT INTO rv_fotos (mime, data) VALUES (${m[1]}, ${m[2]}) RETURNING id`;
  return '/api/foto?id=' + r.rows[0].id;
}
async function getFoto(id) {
  await ensure();
  const r = await db().sql`SELECT mime, data FROM rv_fotos WHERE id = ${id}`;
  return r.rows.length ? r.rows[0] : null;
}
// Move fotos base64 embutidas no JSON para a tabela rv_fotos (evita payload gigante)
async function sanear(data) {
  let mudou = false;
  for (const v of (data.veiculos || [])) {
    const fotos = v.fotos || [];
    for (let i = 0; i < fotos.length; i++) {
      if (typeof fotos[i] === 'string' && fotos[i].startsWith('data:image')) {
        const url = await saveFoto(fotos[i]);
        if (url) { fotos[i] = url; mudou = true; }
      }
    }
  }
  return mudou;
}
async function getDB() {
  await ensure();
  const r = await db().sql`SELECT v FROM rv_store WHERE k='db'`;
  if (r.rows.length) {
    const data = r.rows[0].v;
    if (await sanear(data)) await setDB(data);
    return data;
  }
  const seed = seedDB();
  await setDB(seed);
  return seed;
}
async function setDB(data) {
  await ensure();
  await db().sql`INSERT INTO rv_store (k, v) VALUES ('db', ${JSON.stringify(data)}) ON CONFLICT (k) DO UPDATE SET v = EXCLUDED.v`;
  return data;
}

function secret() { return process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || 'defina-AUTH_SECRET'; }
function makeToken(email) {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const p = Buffer.from(email + '|' + exp).toString('base64url');
  const sig = crypto.createHmac('sha256', secret()).update(p).digest('base64url');
  return p + '.' + sig;
}
function checkToken(t) {
  if (!t) return false;
  const [p, sig] = t.split('.');
  if (!p || !sig) return false;
  const good = crypto.createHmac('sha256', secret()).update(p).digest('base64url');
  if (sig.length !== good.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return false;
  const [email, exp] = Buffer.from(p, 'base64url').toString().split('|');
  return Number(exp) > Date.now() ? email : false;
}
function authed(req) {
  const h = req.headers.authorization || '';
  return checkToken(h.replace(/^Bearer\s+/i, ''));
}

module.exports = { getDB, setDB, makeToken, authed, seedDB, saveFoto, getFoto, sanear };
