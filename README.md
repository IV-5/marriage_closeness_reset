# The 14-Day Marriage Closeness Reset: sales page

Static HTML/CSS/JS page. Every buy button sends visitors to your Nestuge product link.

## Setup
1. Open `assets/app.js` and paste your Nestuge link into `CONFIG.checkoutUrl`.
2. Set the real price and the PDF delivery on your Nestuge product. In `CONFIG`, set `base` to that exact price (currency and amount). The other currency is converted live.
3. Replace `hello@yourdomain.com` in `index.html`.
4. Push the folder to GitHub.
5. Cloudflare Pages: Create, Pages, Connect to Git, pick the repo. Framework: None. Build command: empty. Output directory: `/`.

## Before you launch
- The page promises a 7-day refund. Keep that line only if you will honour it.
- Add real testimonials (with permission) when you have them.
- Add Privacy Policy and Terms links in the footer.
- In ads, lead with marriage and closeness, never the medical condition.

## Live exchange rates
The page converts the base price using free open-source rate data (fawazahmed0/currency-api via jsDelivr, with two fallbacks), caches it for 6 hours, and shows the fallback prices if no source answers. The converted price is an estimate. What Nestuge charges is what counts, so keep `base` equal to your Nestuge price. To base your price in dollars instead, set `base: { cur: "USD", amount: 9.97 }` and `other: "NGN"` in `assets/app.js`.

## SEO setup
Before launch, replace `https://yourdomain.com` with your real domain in: `index.html` (canonical, og:url, og:image, twitter:image and the JSON-LD block), `robots.txt` and `sitemap.xml`.
Keep the JSON-LD price (`9800`, `NGN`) equal to your Nestuge price. After deploying:
1. Add the site to Google Search Console and submit `/sitemap.xml`.
2. Test the share preview at the Facebook Sharing Debugger and the structured data at Google's Rich Results Test.
3. Do not add fake ratings or reviews to the schema. Add them only when you have real ones.
