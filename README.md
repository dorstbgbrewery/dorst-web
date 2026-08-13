# Dorst Brewery — website

Next.js site for [Dorst Brewery](https://dorst.bg).

## Local development

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 (or the port Next.js prints if 3000 is busy).

## Deploy

### Vercel (recommended)

This app uses middleware, API routes (Stripe), and server features. **Vercel** is the primary host — connect the repo and deploy from `main`.

Copy `.env.example` to `.env.local` and fill in the values for local development.

### Brand assets

- Logo and beer labels live in `public/brand/` and `public/labels/`.
- The **brand book** lives at `public/brand-book/index.html` (self-contained HTML, ~8 MB).

**Temporary designer share link (GitHub Pages):**

```
https://dorstbgbrewery.github.io/dorst-web/brand-book/
```

No separate hosting needed — it deploys with the site. Send that URL to reviewers; remove `public/brand-book/` (and the partner-portal link in `B2BPortalClient.tsx`) when you no longer need it.

Partner portal (`/partners`) authenticates against the ERP via `NEXT_PUBLIC_ERP_API_URL` (EIK + emailed password). That value is the **ERP website origin** (local `http://localhost:<erp-port>`, staging/prod e.g. `https://dorst-erp-crm.vercel.app`). Put it in `dorst-web/.env.local` for local, and as GitHub repo secret `NEXT_PUBLIC_ERP_API_URL` for Pages — **not** in ERP `_inputs/secrets.staging.env`. Rebuild Pages after changing the secret. Tracking at `/partners/tracking` uses the partner session.

### GitHub Pages (static preview only)

A workflow builds a **static export** for preview/demo. API routes and middleware do not run on Pages.

1. **Settings → Pages → Source:** GitHub Actions
2. Push to `main`, or run **Actions → Deploy to GitHub Pages**

Preview URL: `https://dorstbgbrewery.github.io/dorst-web/`

To test the Pages build locally:

```bash
GITHUB_PAGES=true GITHUB_REPOSITORY=dorstbgbrewery/dorst-web pnpm build
npx serve out -p 3001
# → http://localhost:3001/dorst-web/
```
