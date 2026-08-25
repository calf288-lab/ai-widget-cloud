const TG = { token: "8693289047:AAFhv6guzCyXsN5pEBUMDUkWApa2agoDqH0", chat_id: "619627066" };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { domain, phone } = req.body || {};
  try {
    await fetch('https://api.telegram.org/bot' + TG.token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG.chat_id, text: 'ЛИД с сайта ' + (domain || '?') + ': ' + (phone || '?') })
    });
  } catch (e) {}
  res.json({ ok: true });
}
