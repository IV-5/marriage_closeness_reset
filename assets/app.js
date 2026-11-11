// ---- CONFIG: edit these ----
const CONFIG = {
  checkoutUrl: "https://nestuge.com/YOUR-PRODUCT-LINK", // paste your Nestuge product link here
  base: { cur: "NGN", amount: 9800 },                   // the price you actually set on Nestuge
  other: "USD",                                         // currency shown via live conversion
  fallback: { NGN: "₦9,800", USD: "$9.97" }             // shown if the rate service cannot be reached
};
// ----------------------------
const B = CONFIG.base.cur, O = CONFIG.other, $$ = s => document.querySelectorAll(s);
let cur = (Intl.DateTimeFormat().resolvedOptions().timeZone || "").startsWith("Africa/Lagos") ? B : O;
let rate = null, rateDate = ""; // 1 base currency = rate other currency

const money = (c, v) => new Intl.NumberFormat(c === "NGN" ? "en-NG" : "en-US", { style: "currency", currency: c, maximumFractionDigits: c === "NGN" ? 0 : 2 }).format(v);

function render() {
  const label = cur === B ? money(B, CONFIG.base.amount) : rate ? "≈ " + money(O, CONFIG.base.amount * rate) : CONFIG.fallback[O];
  $$("[data-price]").forEach(e => (e.textContent = label));
  $$(".cur button").forEach(b => { const on = b.dataset.c === cur; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
  const note = document.querySelector("[data-rate]");
  if (note) note.textContent = rate ? `Live rate: ${money(O, 1)} ≈ ${money(B, 1 / rate)} (${rateDate}). Your final price is shown at checkout.` : "";
}

// Open-source exchange-rate sources (no API key). First one that answers wins.
const SOURCES = [
  { url: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${B.toLowerCase()}.json`, pick: j => [j[B.toLowerCase()][O.toLowerCase()], j.date] },
  { url: `https://latest.currency-api.pages.dev/v1/currencies/${B.toLowerCase()}.json`, pick: j => [j[B.toLowerCase()][O.toLowerCase()], j.date] },
  { url: `https://open.er-api.com/v6/latest/${B}`, pick: j => [j.rates[O], (j.time_last_update_utc || "").slice(5, 16)] }
];

async function loadRate() {
  try { const c = JSON.parse(localStorage.getItem("fx") || "null"); if (c && Date.now() - c.t < 6 * 36e5) return c; } catch (e) {}
  for (const s of SOURCES) {
    try {
      const ctl = new AbortController(); setTimeout(() => ctl.abort(), 4000);
      const [r, date] = s.pick(await (await fetch(s.url, { signal: ctl.signal })).json());
      if (r > 0) { const c = { r, date, t: Date.now() }; try { localStorage.setItem("fx", JSON.stringify(c)); } catch (e) {} return c; }
    } catch (e) {}
  }
  return null;
}

$$(".cur button").forEach(b => b.addEventListener("click", () => { cur = b.dataset.c; render(); }));
render();
loadRate().then(c => { if (c) { rate = c.r; rateDate = c.date; render(); } });

// Every "buy" button goes to the Nestuge checkout
$$("[data-checkout]").forEach(a => { a.href = CONFIG.checkoutUrl; a.rel = "noopener"; });

// Sticky bar appears once the hero scrolls out of view
new IntersectionObserver(([e]) => document.querySelector(".bar").classList.toggle("on", !e.isIntersecting)).observe(document.querySelector(".hero"));
