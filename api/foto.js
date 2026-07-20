const { getFoto } = require('../lib/store');

module.exports = async (req, res) => {
  try {
    const id = Number(req.query && req.query.id);
    if (!id) return res.status(400).json({ error: 'missing id' });
    const f = await getFoto(id);
    if (!f) return res.status(404).json({ error: 'not found' });
    res.setHeader('Content-Type', f.mime);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.status(200).send(Buffer.from(f.data, 'base64'));
  } catch (e) {
    res.status(500).json({ error: String(e && e.message || e) });
  }
};
