const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const DEFAULT_MODEL = "claude-sonnet-4-5";

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { Allow: "POST" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 503,
      body: JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured" }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON" }),
    };
  }

  const { text, mood } = body || {};
  if (!text || typeof text !== "string") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing text" }),
    };
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
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error?.message || "Claude API request failed" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ intro: data.content?.[0]?.text?.trim() || "" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Claude API request failed" }),
    };
  }
};
