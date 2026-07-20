const { getDB, setDB } = require('../lib/store');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
    const { veiculoId } = req.body || {};
    const data = await getDB();
    if (veiculoId) {
      const v = (data.veiculos || []).find(x => x.id === veiculoId);
      if (v) v.views = (v.views || 0) + 1;
    } else {
      data.acessos = (data.acessos || 0) + 1;
    }
    await setDB(data);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: String(e && e.message || e) });
  }
};
