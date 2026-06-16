const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const DEFAULT_MODEL = "claude-sonnet-4-5";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "ANTHROPIC_API_KEY is not configured" });
    return;
  }

  const { text, mood } = req.body || {};
  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "Missing text" });
    return;
  }

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: process.env.CLAUDE_MODEL || DEFAULT_MODEL,
        max_tokens: 120,
        system: [
          "You are Zomato AI Chef, a friendly food-ordering assistant.",
          "Write one short, warm sentence that introduces dish suggestions for the user's mood or craving.",
          "Do not make a list. Do not use markdown. Keep it under 22 words.",
          mood ? `Detected mood category: ${mood}.` : "",
        ].filter(Boolean).join(" "),
        messages: [{ role: "user", content: text.slice(0, 500) }],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      res.status(response.status).json({ error: data.error?.message || "Claude API request failed" });
      return;
    }

    res.status(200).json({ intro: data.content?.[0]?.text?.trim() || "" });
  } catch (error) {
    res.status(500).json({ error: "Claude API request failed" });
  }
};
