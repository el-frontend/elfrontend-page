# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (see `packageManager` in `package.json`). Most contributors also use `npm`; both work.

- `pnpm dev` — runs `velite --watch` (MDX content pipeline) **and** `next dev --turbo` in parallel via `npm-run-all`. You generally need both; Next imports `#site/content` from the velite output.
- `pnpm build` — runs content build then `next build --turbo` sequentially.
- `pnpm build:content` / `pnpm dev:content` — run velite alone (useful when blog content is stale but Next is already running).
- `pnpm start` — production server (`next start --turbo`).
- `pnpm email:dev` — React Email preview server for templates in `src/server/email/`.
- Lint: `pnpm exec next lint` (flat config in `eslint.config.mjs`, extends `eslint-config-next/core-web-vitals` + `/typescript`).
- Typecheck: `pnpm exec tsc --noEmit`.

There is no test runner configured.

## Architecture

**Next.js 16 App Router + React 19 + Tailwind v4 + shadcn/ui (New York style, neutral base).** TypeScript is strict.

### Path aliases (`tsconfig.json`)
- `@/*` → `src/*`
- `#site/content` → `.velite` (generated; do not edit)

### Content pipeline (Velite)
Blog posts live in `src/content/blog/*.mdx`. `velite.config.ts` defines the `blogs` collection schema (title, description, date, image, author, published, body). Output is written to `.velite/` and asset references to `public/static/`. App code imports posts via `import { blogs } from "#site/content"`. MDX is rendered with `rehype-pretty-code` (nord theme), `rehype-slug`, and `rehype-autolink-headings`. **Never edit `.velite/` directly** — re-run velite after changing MDX or `velite.config.ts`.

### Source layout (`src/`)
- `app/` — App Router. Routes: `/` (page.tsx), `/blog/[...slug]`, API at `app/api/chat` (AI chat) and `app/api/blog`. `layout.tsx` wires `MainProvider` (Zustand-style store from `modules/home/store`), `ThemeProvider` (next-themes, system default, class attribute), `Toaster` (sonner), Vercel Analytics/Speed Insights, and a conditional Google Tag Manager. Static assets (`resume.md`, `cv.pdf`, `sitemap.ts`, `robots.txt`, icons) sit under `app/`.
- `modules/` — feature modules (`home`, `blog`). Each has `components/`, `container[s]/`, and the home module owns the shared store. New feature work belongs here, not at the top level.
- `components/` — cross-feature UI. `components/ui/` is the shadcn registry (do not hand-edit; add via `pnpm dlx shadcn add ...`). Other subfolders: `chat`, `animations`, `icons`, `social`, `terminal`.
- `server/` — server-only code: `ai/` (prompts in `prompts.ts`, tool implementations in `tools/`, e.g. YouTube search), `db/client.ts` (Turso/libSQL client), `email/` (Resend + react-email templates), `services/`, `utils/`, `types/`. Import from these only inside route handlers, server components, or server actions.
- `layout/` — `MainLayout` wrapper used by the root layout.
- `lib/` — client-safe helpers (`metadata.ts`, `utils.ts` with `cn`).
- `hooks/`, `styles/` — straightforward.

### AI chat (`src/app/api/chat/route.ts`)
Uses Vercel AI SDK with `@ai-sdk/google` (`gemini-2.5-flash` by default). The route loads `public/resume.md` as base64 context, then streams via `createDataStreamResponse` + `streamText` with `smoothStream`. System prompt lives in `src/server/ai/prompts.ts`; tools (YouTube) in `src/server/ai/tools/`. `maxDuration = 30`. OpenRouter / OpenAI providers are installed but the live path is Google. Turnstile (`NEXT_PUBLIC_TURNSTILE_KEY`) guards the client side.

### Database
**Turso** (libSQL) via `@libsql/client`, client in `src/server/db/client.ts` reading `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN`. Migrations are managed by **geni** (see README) under `migrations/` as paired `*.up.sql` / `*.down.sql` files plus a generated `schema.sql`. The `blog` table is currently the only domain table; MDX in `src/content/blog/` is the primary content source — Turso is for runtime-created blog records served from `app/api/blog`.

### Environment
See `env.example`: `GOOGLE_GENERATIVE_AI_API_KEY`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_TURNSTILE_KEY`, `NEXT_PUBLIC_ENABLE_EMAIL`, `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID`, `RESEND_API_KEY`. Also referenced in code: `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` (only injected when `NODE_ENV === "production"`).

### Images / external hosts
`next.config.ts` whitelists `i.ytimg.com` only. Add hosts there before using `next/image` with new remotes.

### Styling
Tailwind v4 via `@tailwindcss/postcss`. Global styles + CSS variables in `src/app/globals.css`. shadcn config in `components.json` (style: new-york, baseColor: neutral, RSC: true, icon: lucide). Use the `cn` helper from `@/lib/utils`.

## Conventions worth knowing

- Three Google fonts are loaded as CSS variables in the root layout: `--font-geist-sans`, `--font-geist-mono`, `--font-titillium-web`.
- Keep server-only imports (`@/server/*`, `@libsql/client`, `resend`, AI SDK provider packages) out of client components.
- When adding a blog post: create `src/content/blog/<slug>.mdx` with the frontmatter required by `velite.config.ts`, then re-run `pnpm dev:content` (or rely on `pnpm dev` to watch).
- When adding a shadcn component: `pnpm dlx shadcn@latest add <name>` — it will land in `src/components/ui/` per `components.json`.
