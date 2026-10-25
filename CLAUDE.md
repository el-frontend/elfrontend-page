# CLAUDE.md

Personal site + blog for **ElFrontend** (Carlos Chao). Next.js 16 App Router · React 19 · TypeScript strict · Tailwind v4 · shadcn/ui · Velite (MDX) · Vercel AI SDK v4 (Gemini). Deployed on Vercel.

## Commands

Package manager: **pnpm** (`packageManager` in `package.json`). A `package-lock.json` also exists — don't add deps with npm, it desyncs the lockfiles.

| Task | Command |
|---|---|
| Dev (Velite watch + `next dev --turbo`) | `pnpm dev` |
| Build (Velite, then Next) | `pnpm build` |
| Rebuild blog content only | `pnpm build:content` |
| Typecheck | `pnpm exec tsc --noEmit` |
| Lint | `pnpm exec eslint .` (flat config, `eslint.config.mjs`) |
| Email template preview | `pnpm email:dev` |

No test runner. **Verify changes with `tsc --noEmit` + lint + `pnpm build`** (the build catches missing modules that broke Vercel before — see commit `f7bc3f8`). For UI changes, run `pnpm dev` and check the page, including at phone width (the arcade layout has had mobile overflow bugs).

`#site/content` resolves to `.velite/`, which only exists after Velite runs. If types for `blogs` are missing, run `pnpm build:content` first.

## Architecture

### Routes (`src/app/`)
- `(arcade)/` — **the live site.** `/` (home), `/blog`, `/blog/[...slug]`. Layout imports `@/modules/v2/styles/arcade.css` and wraps in `.arcade-root`.
- `(with-nav)/v1` — previous site version, kept under `/v1` with `MainLayout` + navbar. Legacy; don't add features here.
- `api/chat/route.ts` — AI chat (POST). Used by `modules/v2/components/sections/hero-chat.tsx`.
- `layout.tsx` — root: fonts, `MainProvider` (home store), `next-themes` `ThemeProvider` (class attribute, system default), sonner `Toaster`, Vercel Analytics/Speed Insights, GTM only when `NODE_ENV === "production"` and `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` is set.
- `sitemap.ts`, `robots.txt`, `not-found.tsx`, icons.

### Feature modules (`src/modules/`)
- `v2/` — **arcade edition (current).** `components/` (`arcade-shell`, `sections/*`, `sprites/`, CRT overlay, Konami banner), `blog/` (blog + article shells, `server/data.ts`), `content/` (`copy.ts`, `data.ts` — static site copy/projects/skills), `context/arcade-context.tsx`, `hooks/`, `audio.ts`, `server/data.ts` (YouTube + blog data loaders for server components), `styles/arcade.css`.
- `home/`, `blog/` — v1 modules. `home/store` still provides `MainProvider` used by the root layout.
- `static/` — not-found page.

New feature work goes in a module, not top-level `components/`. Pattern: server components fetch via `<module>/server/*.ts` and pass plain props to `"use client"` shells.

### Shared code
- `components/ui/` — shadcn registry. Don't hand-edit; add with `pnpm dlx shadcn@latest add <name>`.
- `components/` — `mdx-component.tsx`, `mermaid.tsx`, `animations/`, `icons/`, `social/`, `terminal/`.
- `layout/` — v1 `MainLayout`, navbar, theme switcher.
- `lib/` — client-safe helpers (`cn`, `generateUUID` in `utils.ts`; `metadata.ts`).
- `hooks/` — generic hooks.
- `server/` — **server-only.** `ai/` (prompts, YouTube tools, model factories), `services/` (`youtube`, `resend`, `cloudflare` R2, `blog` Turso), `db/client.ts` (libSQL), `email/` (react-email templates), `utils/`, `types/`.

### Content (Velite)
- Posts: `src/content/blog/<slug>.mdx`. Schema in `velite.config.ts`: `title` (≤99), `description` (≤999), `date` (ISO), `image` (≤99), `author`, `published` (default true). `slugAsParams` is computed.
- Output → `.velite/` (generated, never edit); assets → `public/static/`.
- MDX plugins: `rehype-slug`, `rehype-pretty-code` (nord), `rehype-autolink-headings`.
- Consume with `import { blogs } from "#site/content"` — only in server code (`modules/v2/*/server/data.ts`).

### AI chat
`api/chat/route.ts`: `@ai-sdk/google` `gemini-2.5-flash`, `createDataStreamResponse` + `streamText` + `smoothStream`, `maxSteps: 5`, `maxDuration = 30`. Fetches `${NEXT_PUBLIC_APP_URL}/resume.md` (i.e. `public/resume.md`) as base64 context — so it needs `NEXT_PUBLIC_APP_URL` pointing at a running server. System prompt: `server/ai/prompts.ts`; tools: `server/ai/tools/youtube.ts`. OpenAI/OpenRouter providers are installed but unused.

AI SDK is **v4** (`ai@^4`): use v4 APIs (`createDataStreamResponse`, `maxSteps`, `UIMessage` from `ai`). Don't copy v5 examples (`toUIMessageStreamResponse`, `stopWhen`) without upgrading.

### Database
Turso/libSQL via `server/db/client.ts`. Migrations in `migrations/` (`*.up.sql` / `*.down.sql` + `schema.sql`), managed with [geni](https://turso.tech/blog/database-migrations-with-geni). Only table: `blog`. Currently **not wired to any route** (`server/services/blog.ts` is unused) — MDX is the source of truth for posts.

### Design references
`docs/designs/v2/` and `docs/designs/v3/` are Claude Design handoff bundles (HTML/JSX prototypes). Read `index.html` + its imports when implementing a design. Prototypes, not production code: match the visuals, don't copy the structure.

## Environment

Template: `env.example` (out of date — vars below are all read in code). `.env*` is gitignored.

- AI: `GOOGLE_GENERATIVE_AI_API_KEY` (`OPENAI_API_KEY` optional, unused path)
- App: `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_TURNSTILE_KEY`, `NEXT_PUBLIC_ENABLE_EMAIL`, `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
- YouTube: `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID`
- Email: `RESEND_API_KEY`
- DB: `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`
- R2: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_ACCESS_KEY`, `CLOUDFLARE_SECRET_KEY`, `CLOUDFLARE_BUCKET_NAME`, `CLOUDFLARE_PUBLIC_URL`

When you add an env var, add it to `env.example` too.

## Conventions

- Imports: `@/*` → `src/*`; `#site/content` → `.velite`.
- Never import `@/server/*`, `@libsql/client`, `resend`, `@aws-sdk/*`, or `@ai-sdk/*` providers from a `"use client"` file.
- Styling: Tailwind v4 (`@tailwindcss/postcss`), tokens in `src/app/globals.css`, merge classes with `cn` from `@/lib/utils`. Arcade-specific styles live in `modules/v2/styles/arcade.css`.
- Fonts (CSS vars from root layout): `--font-geist-sans`, `--font-geist-mono`, `--font-titillium-web`, and arcade fonts `--font-press-start`, `--font-vt323`, `--font-silkscreen`.
- Animation: `motion` (`motion/react`), not `framer-motion`.
- Remote images: `next.config.ts` allows only `i.ytimg.com`. Add the host there before using `next/image` with a new remote.
- Icons: `lucide-react`.
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`), lowercase, imperative.

## Project skills

`.claude/skills/` (pinned in `skills-lock.json`) covers Next.js, React, shadcn, Tailwind v4, AI SDK, Zod, a11y, SEO. Use the relevant skill before working in its area.
