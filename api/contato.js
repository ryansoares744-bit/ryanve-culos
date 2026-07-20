const { getDB, setDB } = require('../lib/store');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
    const c = req.body || {};
    if (c.hp) return res.status(200).json({ ok: true }); // honeypot anti-spam
    if (!c.origem) return res.status(400).json({ error: 'bad body' });
    const data = await getDB();
    data.contatos = data.contatos || [];
    data.contatos.unshift({
      id: Date.now(),
      data: Date.now(),
      statusAt: 'novo',
      obs: '',
      nome: String(c.nome || '').slice(0, 120),
      whats: String(c.whats || '').slice(0, 40),
      veiculo: String(c.veiculo || '').slice(0, 160),
      origem: String(c.origem || '').slice(0, 80),
      msg: String(c.msg || '').slice(0, 2000)
    });
    data.contatos = data.contatos.slice(0, 500);
    await setDB(data);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: String(e && e.message || e) });
  }
};
