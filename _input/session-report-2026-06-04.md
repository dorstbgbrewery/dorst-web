# Dorst Web — Session Report (4 June 2026)

Report of work completed across recent sessions on the `dorst-web` repo, plus recommended follow-ups for the next session.

---

## Repo & deployment context

| Item | Value |
|------|--------|
| Repository | `dorstbgbrewery/dorst-web` |
| Stack | Next.js 16 (App Router), static export for GitHub Pages |
| GitHub Pages preview | https://dorstbgbrewery.github.io/dorst-web/ |
| Primary production target | Vercel + `dorst.bg` (middleware, API routes) |
| Local dev | `pnpm dev` from repo root |

**Recent commits on `main`:**

- `301e997` — Site-wide i18n (BG/EN), logo + beer labels + brand book assets, `DorstLogo` / `BeerLabel` components
- `caecece` — Mobile responsiveness, navbar restructure, footer social links, brand book middleware/README updates

---

## What was done this session

### 1. Logo, beer labels & brand assets

Source files remain in `_input/original files/` (design archive). Production copies live under `public/`:

| Asset | Path |
|-------|------|
| Logo | `public/brand/dorst-logo.png` |
| Label PNGs | `public/labels/{lion-heart,alma,hippy-shake,alexis,evrozona}.png` |
| Label PDFs | `public/labels/pulpa-fiction.pdf`, `full-breakfast-stout.pdf` |
| Brand book | `public/brand-book/index.html` (~8 MB, self-contained) |

**Data model** (`lib/data.ts`):

- Added `labelSrc` and `labelType: 'image' | 'pdf'` on `Beer`
- Mapped labels for all beers with artwork; `evrozona` set to `hasLabel: true`
- Beers without art (`karl`, `bit`, `wit`) keep accent-color placeholders

**Helpers & config:**

- `lib/asset-path.ts` — prefixes paths with `NEXT_PUBLIC_BASE_PATH` for GitHub Pages (`/dorst-web`)
- `next.config.mjs` — exposes `NEXT_PUBLIC_BASE_PATH` from `basePath`

**UI components:**

- `components/brand/DorstLogo.tsx` — PNG logo via `next/image` (default / inverted)
- `components/beer/BeerLabel.tsx` — PNG labels in grids; PDF/no-label falls back to accent can block

**Wired site-wide:**

- Navbar + Footer: real Dorst logo (whale kept on hero / age gate only)
- Home, beers listing, shop, beer detail: `BeerLabel`
- Beer detail: PDF embed + download link for Pulpa Fiction & Full Breakfast Stout
- B2B portal: `DorstLogo` in header; brand book link after access code (new tab)

---

### 2. Site-wide i18n (Bulgarian / English)

- `components/LocaleProvider.tsx` — cookie-based locale, `NextIntlClientProvider`, `document.documentElement.lang`
- `messages/en.json` / `messages/bg.json` — expanded keys for all major pages
- `lib/locale-content.ts` — `pickBeerText`, `pickVenueText` for bilingual data in `lib/data.ts`
- Client pages translated via `useTranslations`: home, beers, beer detail, shop, locations, about, age gate, navbar, footer, B2B tracking

Language toggle in navbar (desktop) and mobile drawer.

---

### 3. Mobile responsiveness

**Root cause fixed:** Inline `style={{ display: 'flex' }}` was overriding Tailwind `hidden md:flex`, so desktop nav links and the hero whale appeared on mobile.

**Approach:** Centralized responsive rules in `app/globals.css` with explicit CSS classes (not Tailwind breakpoints alone). Added `.page-pad` for consistent horizontal padding on inner pages.

**Mobile navbar layout:**

- **Left:** Dorst logo (50px)
- **Center:** Shop CTA (`shopShort`: “Купи ↗” / “Shop ↗”)
- **Right:** Hamburger → drawer with Beers, Locations, About + BG/EN toggle

**Hero (mobile):**

- Whale hidden on phones
- Headline/eyebrow scaled and allowed to wrap (fixes cut-off Bulgarian text)
- CTA buttons stack full-width on small screens
- Removed “Scroll to explore” hint (broke on some renders)

**Other mobile fixes:**

- Footer grid stacks correctly (removed inline `gridTemplateColumns` conflict)
- Shop product rows reflow
- Stats bar, story, seasonal card, locations, B2B strip, about page, beer detail — padding and grid fixes at 900px / 767px / 600px

---

### 4. Footer & social links

- Instagram, Facebook, Untappd moved under tagline (“Drink well, drink whale.” / “Brewed with thirst in Bankya, Bulgaria.”)
- Vertical list: icon + text label per platform (`components/social/SocialLinks.tsx`)
- Removed text links from copyright bar
- Logo size: 50px in navbar and footer

**Note:** Social URLs still point to `#` — real profile links not yet provided.

---

### 5. Brand book — designer share URL

Brand book deploys with the site; no separate hosting needed.

**Temporary share link for designers:**

```
https://dorstbgbrewery.github.io/dorst-web/brand-book/
```

- Verified live on GitHub Pages (loads full Brand Book content)
- Not linked from public site nav (partner portal only, after access code)
- `middleware.ts` updated to skip age gate for `/brand-book` (local dev)
- README documents URL and removal steps when no longer needed

**Security caveat:** On static GitHub Pages the URL is public if known — partner gate is UX-only, not real auth.

---

## Current file / feature map (quick reference)

```
public/brand/          → dorst-logo.png
public/labels/         → beer label PNGs + PDFs
public/brand-book/     → index.html (temporary designer share)

lib/data.ts            → beers, venues, labelSrc/labelType
lib/asset-path.ts      → GitHub Pages basePath helper
lib/locale-content.ts  → bilingual beer/venue text

components/brand/DorstLogo.tsx
components/beer/BeerLabel.tsx
components/social/SocialLinks.tsx
components/nav/Navbar.tsx      → desktop + mobile layouts
components/footer/Footer.tsx

app/globals.css        → nav, hero, footer, mobile breakpoints
messages/{en,bg}.json
.github/workflows/deploy-pages.yml
```

---

## Known limitations (as of this session)

1. **PDF labels in grids** — Pulpa Fiction & Full Breakfast Stout use accent placeholders in cards; full PDF only on beer detail page. Optional: export first-page PNG thumbnails.

2. **Social links** — Placeholder `#` hrefs; need real Instagram, Facebook, Untappd URLs from client.

3. **Brand book access** — No real authentication on static hosting. For production, consider Vercel auth, signed URLs, or partner login before exposing guidelines.

4. **B2B portal body copy** — Header/steps translated; some portal body text may still be English-only beyond i18n keys already added.

5. **GitHub Pages vs Vercel** — Pages build is static preview only (no middleware, no API/Stripe). Production features assume Vercel.

6. **Age gate** — Runs on server/middleware in dev and on Vercel; does not run on GitHub Pages static export.

7. **Large assets in git** — Label PNGs/PDFs and brand book (~8 MB HTML) are committed; repo size will grow if more print assets are added.

---

## What to address in the next session

### Priority — client review & polish

- [ ] **Confirm mobile navbar** on real devices after latest commit (`caecece`) — logo left, CTA center, hamburger right
- [ ] **Provide social URLs** and wire into `components/social/SocialLinks.tsx`
- [ ] **Review i18n** — spot-check all pages in BG/EN; fill any missing B2B portal strings
- [ ] **Push to `main`** if not already deployed — confirm GitHub Actions deploy succeeds with large `public/` assets

### Design & content

- [ ] **PDF label thumbnails** — export PNGs for Pulpa Fiction & Full Breakfast Stout for sharper grid cards
- [ ] **Replace placeholder imagery** — brewery photo, founder photo blocks on home/about
- [ ] **Whale on mobile** — decide if a smaller whale should appear below hero copy or stay hidden
- [ ] **Favicon / OG images** — align with new Dorst logo if not already done

### Brand book lifecycle

- [ ] Share designer URL: `https://dorstbgbrewery.github.io/dorst-web/brand-book/`
- [ ] After designer review, **remove** `public/brand-book/` and partner-portal link (or move behind real auth on Vercel)

### Production readiness

- [ ] **Vercel deploy** — connect repo, env vars (Stripe, Sanity if used), custom domain `dorst.bg`
- [ ] **Partner portal** — replace stub access-code check with real partner auth before exposing sensitive assets
- [ ] **Shop checkout** — currently stub alert; implement Stripe or chosen payment flow
- [ ] **Sanity CMS** — schemas exist; wire live content if moving off hardcoded `lib/data.ts`
- [ ] **Legal pages** — Privacy, Terms, Cookies are `#` stubs in footer

### Technical debt

- [ ] Reduce reliance on inline styles + `!important` media queries — consider CSS modules or Tailwind utilities consistently (inline `display` broke responsive classes once already)
- [ ] `typescript.ignoreBuildErrors: true` in `next.config.mjs` — fix TS errors and re-enable strict builds
- [ ] Test `GITHUB_PAGES=true` build after any asset path changes

---

## Commands cheat sheet

```bash
# Local dev
pnpm dev

# Production build (Vercel / local)
pnpm build

# GitHub Pages build + verify brand book in output
GITHUB_PAGES=true GITHUB_REPOSITORY=dorstbgbrewery/dorst-web pnpm build
ls out/brand-book/index.html

# Serve static export locally
npx serve out -p 3001
# Brand book: http://localhost:3001/dorst-web/brand-book/
```

---

## Related docs in `_input/`

| File | Purpose |
|------|---------|
| `dorst_website_nextjs_handoff.md` | Original build handoff & brand palette |
| `dorst_website_domain_knowledge.md` | Domains, B2B portal, architecture notes |
| `dorst-brand-reference.md` | Brand reference |
| `Dorst Brand Book.html` | Source brand book (copy also in `public/brand-book/`) |
| `original files/` | Source logo and label artwork |

---

*Generated after session work on logo/labels, i18n, mobile layout, footer social, and brand book exposure. Update this file or add a dated successor when the next session completes.*
