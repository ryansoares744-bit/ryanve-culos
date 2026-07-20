const { getDB, setDB, authed, seedDB } = require('../lib/store');

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const data = await getDB();
      const adm = authed(req);
      const out = JSON.parse(JSON.stringify(data));
      if (!adm) { delete out.config.adminSenha; out.contatos = []; }
      return res.status(200).json(out);
    }
    if (req.method === 'POST') {
      if (!authed(req)) return res.status(401).json({ error: 'unauthorized' });
      if (req.query && req.query.reset) {
        const fresh = await setDB(seedDB());
        return res.status(200).json(fresh);
      }
      const body = req.body;
      if (!body || !Array.isArray(body.veiculos) || !body.config) return res.status(400).json({ error: 'bad body' });
      await setDB(body);
      return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: 'method' });
  } catch (e) {
    res.status(500).json({ error: String(e && e.message || e) });
  }
};
