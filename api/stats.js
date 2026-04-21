export default async function handler(req, res) {

  const players = [
    "rehan2109",
    "Nivs",
    "Chr1sser",
    "DeeQzy",
    "Sunlollyice",
    "Ska1ps"
  ];

  const result = {};

  for (const name of players) {

    const player = await fetchPlayer(name);
    const matches = await fetchMatches(player.player_id);

    matches.slice(0, 20).forEach(m => {
      const map = m.game_mode || "unknown";

      const key = `${name}-${map}`;
      result[key] = (result[key] || 0) + 1;
    });
  }

  res.status(200).json(result);
}

/* ===== FACEIT API ===== */

async function fetchPlayer(name) {
  const res = await fetch(
    `https://open.faceit.com/data/v4/players?nickname=${name}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ec8b77b8-69b6-4952-9f27-d261f8096ad7}`
      }
    }
  );

  return res.json();
}

async function fetchMatches(id) {
  const res = await fetch(
    `https://open.faceit.com/data/v4/players/${id}/history?game=cs2&limit=20`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ec8b77b8-69b6-4952-9f27-d261f8096ad7}`
      }
    }
  );

  const data = await res.json();
  return data.items || [];
}
