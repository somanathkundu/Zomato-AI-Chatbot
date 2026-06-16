# 🍽️ Zomato AI Chef

A smart, conversational food suggestion demo that combines **AI-powered intros** with a **robust local ordering system**. Designed to be lightweight, fast, and easy to customize.

---

### 🚀 Quick Status
![Platform: Web](https://img.shields.io/badge/Platform-Web-red)
![Frontend: Vanilla JS](https://img.shields.io/badge/Frontend-Vanilla--JS-yellow)
![Backend: Serverless Functions](https://img.shields.io/badge/Backend-Serverless-black)
![AI: Anthropic Claude](https://img.shields.io/badge/AI-Claude--3.5-orange)

---

## 🌟 Features

- **Mood-Based Suggestions:** Detects cravings like "spicy", "healthy", or "filling" and suggests matching dishes.
- **AI Enhancement:** Uses Claude 3.5 to write unique, context-aware intro sentences for your food recommendations.
- **Smart Fallback:** If the AI is unavailable, the system automatically switches to high-quality local responses so the user experience never breaks.
- **Interactive Cart:** Add dishes, view totals, and proceed through a mock checkout flow.
- **Specialized Flows:** Dedicated logic for vegetarian-only menus, drink pairings, and "something more" requests.
- **Ready to Use:** Pre-configured with popular dishes and a complete chat flow.

---

## 📂 Project Structure

| File / Folder | Purpose |
| :--- | :--- |
| `index.html` | The main UI structure and initial welcome message. |
| `js/script.js` | **The Brain.** Handles chat logic, mood detection, cart state, and UI updates. |
| `css/style.css` | All visual styling (Clean, Zomato-inspired red/white theme). |
| `api/claude.js` | **Vercel** serverless function for AI intros. |
| `netlify/functions/` | **Netlify** serverless function for AI intros. |
| `vercel.json` | Configuration for deployment on Vercel. |
| `netlify.toml` | Configuration for deployment on Netlify. |

---

## ⚙️ For Developers: Data & Logic

### Centralized Data Management
All dish data, including names, emojis, descriptions, and **prices**, is stored in a single centralized object at the top of `js/script.js`:

```javascript
const DISH_DATA = {
  chicken_vindaloo: { 
    emoji: "🍛", 
    name: "Chicken Vindaloo", 
    meta: "Goan • Very spicy", 
    rating: "4.7★", 
    price: "₹320" 
  },
  // ... more items
};
```

**How to update prices or add items:**
1.  **Edit `DISH_DATA`:** Change the values in the main object to update prices or metadata globally.
2.  **Edit `CATEGORY MAPPINGS`:** Scroll down to the `DISHES` object in `js/script.js` to add or remove items from specific mood categories (e.g., `spicy`, `comfort`).

### AI Integration
The app calls `/api/claude` with the user's text and detected mood. Platform-specific configurations handle routing this to either a Vercel or Netlify serverless function.

---

## 🛠️ Setup & Deployment

### Environment Variables
To enable the AI intro feature, you must set these variables in your deployment platform:

- `ANTHROPIC_API_KEY`: Your real Anthropic API key.
- `CLAUDE_MODEL` (Optional): Defaults to `claude-sonnet-4-5`.

---

### 🔺 Deploying to Vercel
1.  Connect your repository to **Vercel**.
2.  Add your `ANTHROPIC_API_KEY` in the project settings (Environment Variables).
3.  Deploy. Vercel will automatically use `api/claude.js` for AI requests.

**Local Testing (Vercel):**
- Install Vercel CLI: `npm i -g vercel`
- Run: `vercel dev`

---

### ◈ Deploying to Netlify
1.  Connect your repository to **Netlify**.
2.  Add your `ANTHROPIC_API_KEY` in the Site configuration (Environment Variables).
3.  Deploy. Netlify will use the `netlify/functions/claude.js` via the `netlify.toml` redirect.

**Local Testing (Netlify):**
- Install Netlify CLI: `npm i -g netlify-cli`
- Run: `netlify dev`

---

## 🛡️ Important Notes
- **Privacy:** Never commit your `.env` file or hardcode your API key.
- **Offline Mode:** The app is fully functional without an API key; it will simply use high-quality local fallbacks for the intro sentences.
- **Mock System:** The checkout and payment flows are simulated for demo purposes and do not process real transactions.

---

*Powered by Claude AI · Zomato AI Chef Demo*
