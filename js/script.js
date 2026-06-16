// ── DISH DATA (Edit prices and names here!) ────────────────────────────────
const DISH_DATA = {
  // Spicy
  chicken_vindaloo: { emoji: "🍛", name: "Chicken Vindaloo", meta: "Goan • Very spicy", rating: "4.7★", price: "₹320" },
  andhra_chilli_chicken: { emoji: "🌶️", name: "Andhra Chilli Chicken", meta: "South Indian • Fiery", rating: "4.5★", price: "₹280" },
  schezwan_noodles: { emoji: "🍜", name: "Schezwan Noodles", meta: "Indo-Chinese • Hot", rating: "4.4★", price: "₹180" },

  // Comfort
  dal_makhani: { emoji: "🫕", name: "Dal Makhani", meta: "Punjabi • Slow cooked", rating: "4.8★", price: "₹220" },
  khichdi: { emoji: "🍚", name: "Khichdi with Ghee", meta: "Home style • Warm", rating: "4.6★", price: "₹150" },
  rajma_chawal: { emoji: "🥘", name: "Rajma Chawal", meta: "North Indian • Classic", rating: "4.7★", price: "₹200" },

  // Healthy
  quinoa_bowl: { emoji: "🥗", name: "Quinoa Buddha Bowl", meta: "Vegan • High protein", rating: "4.5★", price: "₹340" },
  grilled_chicken_salad: { emoji: "🍱", name: "Grilled Chicken Salad", meta: "Low carb • 380 kcal", rating: "4.4★", price: "₹290" },
  multigrain_wrap: { emoji: "🥙", name: "Multigrain Wrap", meta: "Whole wheat • 320 kcal", rating: "4.3★", price: "₹210" },

  // Dessert
  gulab_jamun: { emoji: "🍮", name: "Gulab Jamun", meta: "Classic • Warm & sweet", rating: "4.9★", price: "₹120" },
  mango_kulfi: { emoji: "🍨", name: "Mango Kulfi", meta: "Seasonal • Chilled", rating: "4.7★", price: "₹140" },
  lava_cake: { emoji: "🧁", name: "Chocolate Lava Cake", meta: "Bakery • Rich & gooey", rating: "4.8★", price: "₹220" },

  // Snack
  samosa: { emoji: "🧆", name: "Veg Samosa (2 pcs)", meta: "Street food • Crispy", rating: "4.6★", price: "₹60" },
  paneer_roll: { emoji: "🥪", name: "Paneer Kathi Roll", meta: "Quick bite • Filling", rating: "4.5★", price: "₹130" },
  masala_fries: { emoji: "🍟", name: "Masala French Fries", meta: "Street style • Spiced", rating: "4.4★", price: "₹110" },

  // Filling
  butter_chicken_naan: { emoji: "🍛", name: "Butter Chicken + Naan", meta: "North Indian • Rich", rating: "4.8★", price: "₹380" },
  chicken_biryani: { emoji: "🥩", name: "Chicken Biryani (Full)", meta: "Hyderabadi • Aromatic", rating: "4.9★", price: "₹350" },
  double_burger: { emoji: "🍔", name: "Double Patty Burger", meta: "American • 650 kcal", rating: "4.5★", price: "₹290" },

  // Veg Specials (some shared with categories)
  paneer_butter_masala: { emoji: "🫕", name: "Paneer Butter Masala", meta: "North Indian • Creamy", rating: "4.8★", price: "₹260" },
  veg_fried_rice: { emoji: "🥗", name: "Veg Fried Rice", meta: "Indo-Chinese • Light", rating: "4.4★", price: "₹160" },
  aloo_tikki_wrap: { emoji: "🥙", name: "Aloo Tikki Wrap", meta: "Street food • Spiced", rating: "4.5★", price: "₹130" },

  // Drinks
  masala_chaas: { emoji: "🥤", name: "Masala Chaas", meta: "Traditional • Cooling", rating: "4.7★", price: "₹60" },
  lime_soda: { emoji: "🧃", name: "Fresh Lime Soda", meta: "Refreshing • Light", rating: "4.5★", price: "₹70" },
  mango_lassi: { emoji: "🍹", name: "Mango Lassi", meta: "Sweet • Creamy", rating: "4.8★", price: "₹110" }
};

// ── CATEGORY MAPPINGS (References DISH_DATA) ────────────────────────────────
const DISHES = {
  spicy: [DISH_DATA.chicken_vindaloo, DISH_DATA.andhra_chilli_chicken, DISH_DATA.schezwan_noodles],
  comfort: [DISH_DATA.dal_makhani, DISH_DATA.khichdi, DISH_DATA.rajma_chawal],
  healthy: [DISH_DATA.quinoa_bowl, DISH_DATA.grilled_chicken_salad, DISH_DATA.multigrain_wrap],
  dessert: [DISH_DATA.gulab_jamun, DISH_DATA.mango_kulfi, DISH_DATA.lava_cake],
  snack: [DISH_DATA.samosa, DISH_DATA.paneer_roll, DISH_DATA.masala_fries],
  filling: [DISH_DATA.butter_chicken_naan, DISH_DATA.chicken_biryani, DISH_DATA.double_burger]
};

const VEG_DISHES = [
  DISH_DATA.paneer_butter_masala,
  DISH_DATA.veg_fried_rice,
  DISH_DATA.aloo_tikki_wrap,
  DISH_DATA.dal_makhani 
];

const DRINKS = [
  DISH_DATA.masala_chaas,
  DISH_DATA.lime_soda,
  DISH_DATA.mango_lassi
];

const MENU_LABELS = {
  spicy: "Spicy",
  comfort: "Comfort food",
  healthy: "Healthy",
  dessert: "Dessert",
  snack: "Light snack",
  filling: "Very hungry"
};

const FALLBACKS = {
  spicy: "Ooh, feeling fiery! Here are some top-rated spicy picks near you in Cuttack:",
  comfort: "Comfort food coming right up! These warm dishes will hit the spot:",
  healthy: "Great choice! Here are nutritious options that are both delicious and good for you:",
  dessert: "Sweet tooth activated! Here are some delightful desserts you'll love:",
  snack: "Light and tasty! Here are some great snacks near you:",
  filling: "Hungry? These hearty dishes will keep you full and satisfied!",
  default: "Tell me a mood or craving, and I'll guide you to a dish that fits:"
};

// ── HELPERS ──────────────────────────────────────────────────────────────────
function detectMood(text) {
  const t = text.toLowerCase();
  if (t.match(/spic|hot|fiery|chilli|burn|masala/)) return 'spicy';
  if (t.match(/comfort|cozy|warm|home|soul|sad|stress|heart/)) return 'comfort';
  if (t.match(/sweet|dessert|sugar|choc|cake|ice cream|kulfi|gulab/)) return 'dessert';
  if (t.match(/snack|light|quick|bite|small|little/)) return 'snack';
  if (t.match(/health|fit|diet|low.cal|nutriti|clean|fresh/)) return 'healthy';
  if (t.match(/hungry|starv|filling|full|heavy|big|large/)) return 'filling';
  return 'default';
}

function getTime() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

document.getElementById('welcome-time').textContent = getTime();

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));
}

function escapeJsString(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function getDishesForMood(mood) {
  if (mood === 'default') {
    return [
      DISHES.spicy[0],
      DISHES.comfort[0],
      DISHES.healthy[0],
      DISHES.filling[1]
    ];
  }
  return DISHES[mood] || DISHES.comfort;
}

function parsePrice(price) {
  return Number(String(price).replace(/[^\d]/g, "")) || 0;
}

function buildDishCards(dishes, options = {}) {
  const showActions = options.actions !== false;
  const mode = options.mode || '';
  const cards = dishes.map(d => `
    <div class="dish-card" onclick="orderDish('${escapeJsString(d.name)}', '${escapeJsString(d.price)}')">
      <div class="dish-emoji">${escapeHtml(d.emoji)}</div>
      <div class="dish-name">${escapeHtml(d.name)}</div>
      <div class="dish-meta">${escapeHtml(d.meta)}</div>
      <div class="dish-star">${escapeHtml(d.rating)}</div>
      <div class="dish-price">${escapeHtml(d.price)}</div>
    </div>`).join('');
  
  let actionButtons = '';
  if (showActions) {
    actionButtons = `
      <div class="quick-pills">
        <button class="qpill" onclick="sendMsg('Show more options')">🔄 More Options</button>
        ${mode !== 'veg' ? `<button class="qpill" onclick="sendMsg('Something vegetarian only')">🥗 Veg Only</button>` : ''}
        <button class="qpill" onclick="sendMsg('What drink goes with this?')">🥤 Pair a Drink</button>
        <button class="qpill" onclick="sendMsg('Show the menu')">📋 Main Menu</button>
        <button class="qpill" onclick="sendMsg('Show my cart')">🛒 View Cart</button>
      </div>`;
  }
  return `<div class="dish-grid">${cards}</div>${actionButtons}`;
}

function buildMenuOverview() {
  const emojis = {
    spicy: "🌶️",
    comfort: "🫕",
    healthy: "🥗",
    dessert: "🍮",
    snack: "🧆",
    filling: "🍛"
  };
  const buttons = Object.entries(MENU_LABELS).map(([mood, label]) =>
    `<button class="qpill" onclick="sendMsg('${escapeJsString(label)}')">${emojis[mood] || ""} ${escapeHtml(label)}</button>`
  ).join('');
  return `Pick a category to explore top-rated dishes in Cuttack:
    <div class="quick-pills">${buttons}
      <button class="qpill" onclick="sendMsg('Something vegetarian only')">🥗 Veg Only</button>
      <button class="qpill" onclick="sendMsg('What drink goes with this?')">🥤 Drinks</button>
      <button class="qpill" onclick="sendMsg('Show my cart')">🛒 View Cart</button>
    </div>`;
}

function addBubble(role, html) {
  const chat = document.getElementById('chat');
  const typingRow = document.getElementById('typing-row');
  const row = document.createElement('div');
  row.className = `msg-row${role === 'user' ? ' user' : ''}`;
  const avatarHtml = role === 'user'
    ? `<div class="avatar user">👤</div>`
    : `<div class="avatar bot">🍽️</div>`;
  const nameLabel = role === 'user' ? 'You' : 'Zomato AI';
  row.innerHTML = `
    ${avatarHtml}
    <div class="bubble-wrap">
      <div class="bubble-name">${nameLabel}</div>
      <div class="bubble ${role === 'user' ? 'user' : 'bot'}">${html}</div>
      <div class="bubble-time">${getTime()}</div>
    </div>`;
  chat.insertBefore(row, typingRow);
  row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function orderDish(name, price) {
  sendMsg(`I want to order ${name} for ${price}`);
}

// ── MAIN SEND ─────────────────────────────────────────────────────────────────
let busy = false;
let lastMood = 'comfort';
let cart = [];

async function sendMsg(override) {
  if (busy) return;
  const input = document.getElementById('userInput');
  const text = (override || input.value).trim();
  if (!text) return;
  input.value = '';

  addBubble('user', escapeHtml(text));
  busy = true;

  const typingRow = document.getElementById('typing-row');
  typingRow.style.display = 'flex';
  typingRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  const lowerText = text.toLowerCase();
  const mood = detectMood(text);
  if (mood !== 'default') lastMood = mood;
  const activeMood = mood === 'default' ? lastMood : mood;

  const drinkMatch = lowerText.includes('drink');
  const vegMatch = lowerText.includes('veg');
  const moreMatch = lowerText.includes('more options') || lowerText.includes('add more');
  const menuMatch = lowerText.includes('menu') || lowerText.includes('categories') || lowerText.includes('start over') || lowerText.includes('show the menu') || lowerText.includes('view menu');
  const cartMatch = lowerText.includes('cart') || lowerText.includes('total') || lowerText.includes('view cart') || lowerText.includes('show my cart');
  const checkoutMatch = lowerText.includes('checkout') || lowerText.includes('order now') || lowerText.includes('pay');
  const greetingMatch = lowerText.match(/^(hi|hello|hey|hola|greetings|yo|help)/);
  const orderMatch = text.match(/(?:^|\b)(?:i\s+want\s+to\s+order|order|add)\s+(.+?)(?:\s+for\s+(₹\d+))?$/i);

  let replyHtml = '';

  // ── Special cases ──
  if (checkoutMatch) {
    await delay(600);
    if (!cart.length) {
      replyHtml = `Your cart is empty right now. Pick a dish first, then I'll help you checkout.` + buildDishCards(getDishesForMood(lastMood));
      finishReply(replyHtml);
      return;
    }
    replyHtml = `<div class="order-badge">✅ Order placed!</div><br>${buildCartSummary()}<br>Your order is confirmed! Estimated delivery to <strong>your location</strong> is <strong>28–40 min</strong>. Track live on the Zomato app. Enjoy your meal! 🎉<br><br><div class="quick-pills"><button class="qpill" onclick="sendMsg('Show the menu')">📋 Start New Order</button></div>`;
    cart = [];
    finishReply(replyHtml);
    return;
  }

  if (menuMatch || greetingMatch) {
    await delay(400);
    replyHtml = (greetingMatch ? `Hello! I'm your Zomato AI Chef. ` : '') + buildMenuOverview();
    finishReply(replyHtml);
    return;
  }

  if (moreMatch) {
    await delay(650);
    replyHtml = `Here are more ${activeMood === 'default' ? 'popular' : activeMood} picks you can add to your cart:` + buildDishCards(getDishesForMood(activeMood));
    finishReply(replyHtml);
    return;
  }

  if (orderMatch) {
    await delay(700);
    const item = {
      name: orderMatch[1].trim(),
      price: orderMatch[2] || findDishPrice(orderMatch[1].trim()) || "₹0"
    };
    cart.push(item);
    replyHtml = `<div class="order-badge">🛒 Added to cart!</div><br><strong>${escapeHtml(item.name)}</strong> <strong>${escapeHtml(item.price)}</strong> is in your cart.<br>${buildCartSummary()}
      <div class="quick-pills">
        <button class="qpill" onclick="sendMsg('Checkout now')">🛍️ Checkout Now</button>
        <button class="qpill" onclick="sendMsg('Show the menu')">📋 Add More Items</button>
        <button class="qpill" onclick="sendMsg('What drink goes with this?')">🥤 Add a Drink</button>
        <button class="qpill" onclick="sendMsg('Show my cart')">🛒 View Cart</button>
      </div>`;
    finishReply(replyHtml);
    return;
  }

  if (drinkMatch) {
    await delay(800);
    replyHtml = `Great pairings! Add one of these drinks to balance your meal:` + buildDishCards(DRINKS, { actions: false }) + `
      <div class="quick-pills">
        <button class="qpill" onclick="sendMsg('Show the menu')">📋 Back to Menu</button>
        <button class="qpill" onclick="sendMsg('Show my cart')">🛒 View Cart</button>
      </div>`;
    finishReply(replyHtml);
    return;
  }

  if (vegMatch) {
    await delay(800);
    replyHtml = `Here are top-rated vegetarian picks near you:` + buildDishCards(VEG_DISHES, { mode: 'veg' });
    finishReply(replyHtml);
    return;
  }

  if (cartMatch) {
    await delay(400);
    replyHtml = cart.length
      ? `Here's what you've picked so far:<br><br>` + buildCartSummary() + `<div class="quick-pills"><button class="qpill" onclick="sendMsg('Checkout now')">🛍️ Checkout Now</button><button class="qpill" onclick="sendMsg('Show the menu')">📋 Add More Items</button></div>`
      : `Your cart is empty. Pick a craving and I'll show you some great options!` + buildMenuOverview();
    finishReply(replyHtml);
    return;
  }

  // ── Claude API call ──
  try {
    const aiIntro = await getClaudeIntro(text, activeMood);
    const dishes = getDishesForMood(activeMood);
    replyHtml = aiIntro + buildDishCards(dishes);
  } catch (e) {
    const dishes = getDishesForMood(activeMood);
    replyHtml = (FALLBACKS[activeMood] || FALLBACKS.default) + buildDishCards(dishes);
  }

  finishReply(replyHtml);
}

async function getClaudeIntro(text, mood) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch("/api/claude", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        text,
        mood
      })
    });
    if (!response.ok) throw new Error('Claude API request failed');
    const data = await response.json();
    return data.intro || FALLBACKS[mood] || FALLBACKS.default;
  } finally {
    clearTimeout(timeout);
  }
}

function finishReply(html) {
  const typingRow = document.getElementById('typing-row');
  typingRow.style.display = 'none';
  addBubble('bot', html);
  busy = false;
}

function findDishPrice(name) {
  const normalizedName = name.toLowerCase();
  const allItems = Object.values(DISH_DATA);
  return allItems.find(item => normalizedName.includes(item.name.toLowerCase()))?.price;
}

function buildCartSummary() {
  const total = cart.reduce((sum, item) => sum + parsePrice(item.price), 0);
  const itemList = cart.map(item => `• ${escapeHtml(item.name)} (${escapeHtml(item.price)})`).join('<br>');
  return `<strong>Your Selection:</strong><br>${itemList}<br>Total: <strong>₹${total}</strong>`;
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
