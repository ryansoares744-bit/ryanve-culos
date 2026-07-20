const { authed, saveFoto } = require('../lib/store');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
    if (!authed(req)) return res.status(401).json({ error: 'unauthorized' });
    const { data } = req.body || {};
    if (!/^data:image\//i.test(data || '')) return res.status(400).json({ error: 'bad image' });
    // Tenta o Vercel Blob se estiver configurado; senão salva no Postgres
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { put } = require('@vercel/blob');
        const m = /^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i.exec(data);
        const buf = Buffer.from(m[2], 'base64');
        const blob = await put('veiculos/foto.jpg', buf, { access: 'public', contentType: m[1], addRandomSuffix: true });
        return res.status(200).json({ url: blob.url });
      } catch (e) { /* cai para o Postgres */ }
    }
    const url = await saveFoto(data);
    if (!url) return res.status(400).json({ error: 'bad image' });
    res.status(200).json({ url });
  } catch (e) {
    res.status(500).json({ error: String(e && e.message || e) });
  }
};
