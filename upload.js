const { getDB, makeToken } = require('../lib/store');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
    const { email, senha } = req.body || {};
    if (!email || !senha) return res.status(400).json({ error: 'missing' });
    const data = await getDB();
    const cfg = data.config || {};
    const emailOk = [process.env.ADMIN_EMAIL, cfg.adminEmail].filter(Boolean)
      .some(e => e.toLowerCase() === String(email).toLowerCase());
    const senhaOk = [cfg.adminSenha, process.env.ADMIN_PASSWORD].filter(Boolean)
      .some(s => s === senha);
    if (!emailOk || !senhaOk) return res.status(401).json({ error: 'invalid' });
    return res.status(200).json({ email, token: makeToken(email), em: Date.now() });
  } catch (e) {
    res.status(500).json({ error: String(e && e.message || e) });
  }
};
