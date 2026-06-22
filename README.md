# TRUECOLOURS — Next.js site

Automotive & Industrial Paints, Mankweng, Limpopo. Migrated from the Manus AI / Vite build to a
clean, fully self-owned Next.js project.

## What's in here

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion for all animations
- Lucide React for icons
- Zero Manus / Vite / CloudFront references — everything is local and yours

## 1. Install

```bash
npm install
```

## 2. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 3. Build for production

```bash
npm run build
npm run start
```

## 4. Replace the placeholder images — DO THIS BEFORE GOING LIVE

The original Manus site's real photos weren't available to convert, so `public/images/` currently
contains generated placeholder graphics (clearly labelled "PLACEHOLDER" so nobody mistakes them for
final). Replace these exact filenames with real photos and the site will pick them up automatically:

| File | Used for | Suggested shot |
|---|---|---|
| `public/images/hero-bg.webp` | Full-bleed hero background | Wide shot of the shop front, paint shelves, or a spray job in progress |
| `public/images/tc-logo-icon.png` | Navbar, footer, contact card, trust banner | Your actual logo, transparent PNG, square-ish |
| `public/images/tc-colour-matching.webp` | Gallery | Staff matching a colour with a fan deck / sample |
| `public/images/tc-spray-paint.webp` | Gallery | Spray booth / spray gun in action |
| `public/images/tc-paint-cans.webp` | Products section image, gallery | Shelf or table of paint cans / product range |

Any `.jpg`, `.png`, or `.webp` works — just keep the same filename, or update the `src` in the
relevant component if you rename it.

## 5. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — TRUECOLOURS Next.js site"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

## 6. Deploy to Vercel

1. Go to vercel.com → **Add New Project** → import the GitHub repo you just pushed.
2. Framework preset: Vercel auto-detects **Next.js** — leave build/output settings as default.
3. No environment variables are required for this site.
4. Click **Deploy**.

Every push to `main` after this will auto-deploy.

## Notes on things worth double-checking

- **Google Maps embed**: `ContactSection.tsx` ships with a placeholder embed URL (the original
  source had a non-functional placeholder `pb=` string with no real place ID). Get a real embed
  code from Google Maps → Share → Embed a map → for your exact address, and swap the `src` on the
  `<iframe>`.
- **WhatsApp / phone numbers**: confirmed against your brief — `067 288 5241`, `081 256 6903`,
  WhatsApp `27672885241`. All `tel:` and `wa.me` links use these. If any number is wrong, they're
  centralized in `config/site.ts` for reference, though the components currently use the literal
  numbers directly (see "Future cleanup" below).
- **Gallery photos**: 3 of the 6 gallery tiles in `GallerySection.tsx` use hotlinked Unsplash stock
  photos (generic automotive shots) as the original source did — these aren't TRUECOLOURS photos.
  Swap them out for real shop photos when you have them.

## Future cleanup (optional)

Right now `config/site.ts` exists but most components still use hardcoded phone numbers and the
WhatsApp link directly, matching how the original source was written. If you want a single place
to update contact details going forward, the components can be refactored to import from
`siteConfig` instead — happy to do that pass if useful.
