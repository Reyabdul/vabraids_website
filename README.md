# VA Braids - wensite

Official website for **VA Braids** — a braiding studio led by Vanessa Abdul, offering braiding services for men, women, and children. The site showcases a portfolio of work, connects visitors to booking via **Re-Up**, and provides a direct contact option for after-hours inquiries.

**Live site:** _add URL once deployed_

---

## Tech Stack

| Tool | Purpose | Docs |
|---|---|---|
| [Next.js](https://nextjs.org) (App Router) | React framework, routing, server components | [nextjs.org/docs](https://nextjs.org/docs) |
| [Sanity.io](https://www.sanity.io) | Headless CMS for content (photos, services, pricing, copy) | [sanity.io/docs](https://www.sanity.io/docs) |
| [TanStack Query](https://tanstack.com/query/latest) | Data fetching, caching, and client-side hydration | [tanstack.com/query/latest/docs](https://tanstack.com/query/latest/docs/framework/react/overview) |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| [Motion](https://motion.dev) (formerly Framer Motion) | Animation | [motion.dev/docs](https://motion.dev/docs) |
| [pnpm](https://pnpm.io) | Package manager | [pnpm.io/motivation](https://pnpm.io/motivation) |

This project is written in **plain JavaScript + React (no TypeScript)**. See [`CLAUDE.md`](./CLAUDE.md) for full architecture and coding conventions.

---

## Prerequisites

Make sure you have these installed before starting:

- **Node.js** — v18.18 or later ([nodejs.org](https://nodejs.org))
- **pnpm** — v9 or later
  ```bash
  npm install -g pnpm
  ```
- A **Sanity.io** account with access to the VA Braids project dataset (ask a project admin for an invite)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/<org-or-username>/va-braids.git
cd va-braids
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env.local
```

You'll need the following in `.env.local`:

```bash
# Sanity project connection
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Only needed if writing data / using authenticated Sanity requests
SANITY_API_TOKEN=your-token

# Contact form (if using a third-party email service, e.g. Resend)
EMAIL_SERVICE_API_KEY=your-key
```

> Ask a project maintainer for the actual Sanity project ID and any API tokens — these should never be committed to the repo.

### 4. Run the dev server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site locally.

### 5. Run Sanity Studio (content editing)

If the Studio is embedded in this repo:

```bash
pnpm sanity dev
```

Otherwise, content can be managed directly at [sanity.io/manage](https://www.sanity.io/manage) under the VA Braids project.

---

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the local dev server |
| `pnpm build` | Build the production site |
| `pnpm start` | Serve the production build locally |
| `pnpm lint` | Run linting |
| `pnpm sync "message"` | Stage, commit, and push in one step (see below) |

---

## Project Structure

```
va-braids/
├── app/                 # Next.js App Router pages (Home, Gallery, Contact)
├── components/          # React components, grouped by page/section
├── lib/
│   ├── sanity/          # Sanity client, GROQ queries, image helpers
│   └── query/hooks/     # TanStack Query hooks per content type
├── sanity/              # Sanity schema definitions & studio config
├── public/              # Static assets
├── CLAUDE.md            # Architecture & coding conventions reference
└── README.md
```

See [`CLAUDE.md`](./CLAUDE.md) for the full breakdown and the reasoning behind it.

---

## Git Workflow

- Commits follow [Conventional Commits](https://www.conventionalcommits.org): `feat:`, `fix:`, `chore:`, `style:`, `refactor:`, `docs:`
- Branches:
  - `main` — production
  - `dev` — active development
  - `feature/*` — individual features (e.g. `feature/gallery-filters`)
- A `pnpm sync "commit message"` script is available for a fast stage → commit → push flow. See `scripts/sync.sh`.

---

## Deployment

_Add deployment details once a host is chosen (e.g. Vercel is the natural fit for Next.js — [vercel.com/docs](https://vercel.com/docs))._

---

## Content Notes for Editors

- All photos, services, and pricing are managed in **Sanity Studio**, not hardcoded in the codebase.
- Gallery images should be tagged with a category (style/client type) to power gallery filtering.
- The disclaimer **"VA Braids does not supply or add hair"** must remain visible on the Home services section and the Contact page — do not remove when editing content or copy.

---

## Questions

For architecture decisions or "why is it built this way," check [`CLAUDE.md`](./CLAUDE.md) first — it's kept up to date as the single source of truth for how this project is built.
