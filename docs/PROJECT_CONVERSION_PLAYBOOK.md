# Project Conversion Playbook (for agents)

Audience: coding agents with **no access to the template repo**. Convert any project into a Next.js App Router app that matches this standard using **only this document**.

**Self-sufficiency rule:** Do not assume template filesystem access. Do not fetch or clone a template unless the user explicitly provides one. Paste the COPY-PASTE blocks below into the target repo as written. ADAPT blocks keep the same shape; fill product values.

**CONFIG vs SHOWCASE (read first):**

| Bucket | What it is | On conversion |
| ------ | ---------- | ------------- |
| **CONFIG (required)** | Tooling, app-shell plumbing, theme infrastructure, SEO shell | Apply from this playbook |
| **SHOWCASE (template-only)** | Demo landing UI, particle/liquid-glass FX, studio panel, marketing copy, showcase-only motion | **Skip entirely.** Do not copy. Do not leave cleanup work for the user |

The template repo’s `src/app/page.tsx` and showcase CSS (`.fx-*`, studio grid/scrims, liquid-glass panel chrome, editorial hero) exist **only to demo this template**. Converted projects must **not** inherit that UI.

---

## Table of contents

1. [Goal / non-goals](#0-goal--non-goals)
2. [Prerequisites](#1-prerequisites)
3. [COPY-PASTE vs ADAPT](#2-copy-paste-vs-adapt-vs-create)
4. [Target baseline](#3-target-baseline)
5. [Exact dependency ranges](#4-exact-dependency-ranges)
6. [Exact scripts](#5-exact-scripts)
7. [Ordered steps (tracks)](#6-ordered-steps)
8. [Root config files (COPY-PASTE)](#7-root-config-files-copy-paste)
9. [`next.config.ts` (COPY-PASTE + must-match)](#8-nextconfigts-copy-paste--must-match)
10. [Theme + globals — CONFIG baseline](#9-theme--globals--config-baseline)
11. [App shell + SEO (COPY-PASTE / ADAPT)](#10-app-shell--seo-copy-paste--adapt)
12. [Supporting files](#11-supporting-files-copy-paste)
13. [File tree target state](#12-file-tree-target-state)
14. [Validation](#13-validation)
15. [Common failure modes](#14-common-failure-modes)
16. [Reusable agent prompt](#15-reusable-agent-prompt)
17. [Done checklist](#16-done-checklist)
18. [SHOWCASE (template-only — skip)](#17-showcase-template-only--skip)

---

## 0. Goal / non-goals

### Goal

Ship a Next.js 16 + React 19 + TypeScript strict + Tailwind v4 app with:

- Same dependency ranges and scripts as Section 4–5
- Same configs: `next.config.ts`, ESLint, Prettier, PostCSS, TS, Husky, lint-staged
- Theme **infrastructure**: `next-themes` + a **clean** tokenized `src/styles/globals.css` (Section 9) — not showcase FX
- SEO shell: `src/config/site.ts` driving `layout.tsx` metadata, `robots.ts`, `sitemap.ts`
- App Router defaults kept as RSC (Server Components) unless a file must be client
- Product UI preserved (existing apps) or a **minimal** home placeholder (greenfield)
- `bun run validate` green
- **Zero showcase cleanup** left for the user after conversion

### Non-goals (do not add unless the user asks)

- **Do not copy template showcase UI** — paper/studio/chartreuse demo landing, particles, liquid glass, editorial hero, `ShowcaseAtmosphere`, showcase marketing copy, or showcase-only motion utilities
- Auth, database, ORM, API layer, payments
- CI / GitHub Actions / deploy workflows
- Replacing product UI with a marketing / demo landing when converting an existing app
- Pasting the template’s `page.tsx` into any converted project
- Pages Router
- Inventing `middleware.ts` when `proxy.ts` is enough (or when no interception is needed)
- Changing package manager away from Bun unless the target repo already uses another

---

## 1. Prerequisites

1. Read this playbook fully once (especially CONFIG vs SHOWCASE above and [Section 17](#17-showcase-template-only--skip)).
2. Identify the **target repo** (greenfield empty folder, existing Next app, or Vite/other).
3. Note the target package manager. This standard prefers **Bun**. Scripts below are Bun-first; only rewrite `cleani`, `ui`, and `.husky/pre-commit` if the target is not Bun.
4. Node.js `>=20.20.2` (from `engines.node` below).
5. You do **not** need the template repository. Everything required for **CONFIG** is inlined here. Showcase UI is intentionally **not** inlined for conversion.

---

## 2. COPY-PASTE vs ADAPT vs CREATE

### CONFIG (required)

| Action | Paths | Rule |
| ------ | ----- | ---- |
| **COPY-PASTE** (byte-for-byte from blocks below) | `next.config.ts`, `eslint.config.mjs`, `prettier.config.js`, `postcss.config.js`, `tsconfig.json`, `.editorconfig`, `.prettierignore`, `.env.example`, `components.json`, `src/lib/utils.ts`, `src/types/reset.d.ts`, `src/components/theme-provider.tsx`, `src/components/tailwind-indicator.tsx`, `src/lib/fonts.ts`, `src/styles/globals.css` (**clean baseline in Section 9 only**), `.husky/pre-commit` | Paste from this playbook. Do not invent stubs. Do **not** paste the template repo’s full showcase `globals.css`. |
| **ADAPT** | `package.json` (merge scripts/deps/engines/lint-staged/overrides; keep target `name`/`version`), `src/config/site.ts` (product identity — not “Next.js Template” OG branding), `src/app/layout.tsx` (keep wiring; preserve product providers if any), `src/app/robots.ts`, `src/app/sitemap.ts`, `public/site.webmanifest`, icons / `og.png`, optional `ThemeToggle` | Match structure and contracts; fill product values. |
| **PRESERVE** (existing apps) | Product routes, UI, business components, existing `page.tsx` content, domain styles/assets | Do **not** overwrite with template showcase or marketing page. Keep product CSS; only add the theme contract if missing. |
| **CREATE if missing** | `src/app/page.tsx` (**minimal placeholder** only — Section 10), `loading.tsx`, `error.tsx`, `not-found.tsx`, `robots.ts`, `sitemap.ts`, `.env.example`, Husky hook | Use the blocks below. |

### SHOWCASE (template-only — SKIP on conversion)

| Skip | Why |
| ---- | --- |
| Template `src/app/page.tsx` (studio panel, editorial hero, showcase copy) | Demo UI for this template only |
| `ShowcaseAtmosphere` / particle atmosphere components | Demo FX |
| Showcase-only CSS: `.fx-*`, studio grid/scrims, `.studio-panel`, liquid-glass chrome, motion-rail/row showcase animations | Not part of the conversion theme contract |
| Template marketing / “Next.js Template” OG copy beyond `site.ts` placeholders | Product identity is ADAPT |
| Anything that forces the user to delete demo UI after conversion | Conversion must ship clean |

Optional: paste `ThemeToggle` (Section 10) only if the product wants a theme control. It is useful ADAPT UX, **not** required, and must not ship wrapped in showcase chrome.

Delete target Vite/Webpack-only configs after migration (`vite.config.*`, `index.html` as app entry, etc.).

---

## 3. Target baseline

- Runtime: Node.js `>=20.20.2`
- Package manager: Bun (recommended)
- Framework: Next.js App Router (`src/app`)
- Language: TypeScript strict + `noUncheckedIndexedAccess`
- Styling: Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config.ts` required)
- Theming: `next-themes` class strategy + **clean** CSS tokens in `globals.css` (no showcase FX)
- Lint/format: ESLint flat + Prettier (+ import sort + Tailwind class sort)
- Hooks: Husky + lint-staged
- UI: product pages preserved, or minimal placeholder home — **never** the template showcase landing
- CI: **none** unless requested

---

## 4. Exact dependency ranges

These ranges match live `package.json`. Use them as written.

### `dependencies`

```json
{
  "clsx": "^2.1.1",
  "lucide-react": "^0.577.0",
  "next": "^16.4.6",
  "next-themes": "^0.4.6",
  "react": "^19.3.1",
  "react-dom": "^19.3.1",
  "tailwind-merge": "^3.7.0"
}
```

### `devDependencies`

```json
{
  "@eslint/js": "^9.39.5",
  "@ianvs/prettier-plugin-sort-imports": "^4.7.1",
  "@next/eslint-plugin-next": "^16.4.6",
  "@tailwindcss/postcss": "^4.3.5",
  "@total-typescript/ts-reset": "^0.6.1",
  "@types/node": "^22.20.5",
  "@types/react": "^19.3.0",
  "@types/react-dom": "^19.3.0",
  "babel-plugin-react-compiler": "1.0.0",
  "eslint": "^10.15.0",
  "eslint-config-prettier": "^10.1.8",
  "eslint-plugin-react-hooks": "^7.1.1",
  "husky": "^9.1.7",
  "lint-staged": "^16.4.0",
  "postcss": "^8.5.33",
  "prettier": "^3.10.1",
  "prettier-plugin-tailwindcss": "^0.8.1",
  "tailwind-animate": "^0.2.10",
  "tailwindcss": "^4.3.5",
  "typescript": "^5.9.3",
  "typescript-eslint": "^8.73.0"
}
```

### Also set on `package.json`

```json
{
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=20.20.2"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix"],
    "*.{ts,tsx,mdx,json}": ["prettier --write"]
  },
  "overrides": {
    "zod-validation-error": "^5.0.0"
  }
}
```

Pin `babel-plugin-react-compiler` to exact `1.0.0` (no caret).

Remove conflicting old tooling when present: `eslint-config-next` as sole config (replaced by flat config below), Vite React plugins, `tailwind.config.js` v3-only setups that fight CSS-first v4, Pages Router-only eslint assumptions.

---

## 5. Exact scripts

```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "preview": "next build && next start",
  "lint": "eslint . && tsc --noEmit",
  "lint:fix": "eslint . --fix",
  "type-check": "tsc --noEmit",
  "ui": "bunx shadcn@latest",
  "fmt:check": "prettier --check \"**/*.{ts,tsx,mdx,json}\" --cache",
  "fmt": "prettier --write \"**/*.{ts,tsx,mdx,json}\" --cache --experimental-ternaries",
  "clean": "rm -rf .next",
  "cleani": "rm -rf .next && rm -rf node_modules && bun i",
  "prepare": "husky",
  "validate": "eslint . && tsc --noEmit && prettier --check \"**/*.{ts,tsx,mdx,json}\" --cache && next build"
}
```

`validate` is the acceptance gate. Keep it package-manager agnostic except `cleani` / `ui` / Husky invocation.

---

## 6. Ordered steps

Run in order. Skip steps that already match. Apply **CONFIG only** — never paste SHOWCASE UI (Section 17).

### Track G: Greenfield (new app from this standard)

1. Create the file tree from [Section 12](#12-file-tree-target-state) by pasting CONFIG COPY-PASTE blocks and adapting ADAPT blocks.
2. Set `package.json` `name` / author metadata for the product.
3. Adapt `src/config/site.ts` + `public/site.webmanifest` + icons (product identity — not template showcase branding).
4. Write product `src/app/page.tsx`, **or** paste the **minimal placeholder** home from Section 10. **Do not** paste the template showcase landing.
5. Paste Section 9 **clean** `globals.css` (tokens + dark + `@theme` + base resets only).
6. `bun i` then `bun run validate`.

### Track A: Existing Next.js app → this standard

1. Merge Section 4 deps + Section 5 scripts into `package.json` (keep product deps that are still needed).
2. Paste all [Section 7](#7-root-config-files-copy-paste) and [Section 8](#8-nextconfigts-copy-paste--must-match) config files.
3. Ensure `src/` layout: move `app/` → `src/app/` if needed; set `@/*` → `./src/*`.
4. **Theme CSS:** keep existing product styles. If the app lacks a `next-themes` / token contract, **add** the Section 9 clean baseline (merge tokens + `@custom-variant dark` + `@theme inline` as needed). **Do not** overwrite product CSS with showcase FX, and **do not** replace with a stub that only has `@import "tailwindcss"`.
5. ADD/ADAPT `src/config/site.ts`. Wire `layout.tsx` metadata/viewport/JSON-LD, `robots.ts`, `sitemap.ts` to it (Section 10).
6. ADD `ThemeProvider` in root layout (`attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`). Keep product UI; do not force showcase / marketing chrome.
7. ADD fonts via `src/lib/fonts.ts` CSS variables on `<body>` (or map product fonts into the same CSS variable names in `globals.css` `@theme`). Fonts are a replaceable pattern.
8. **PRESERVE** existing `src/app/page.tsx` and product routes. Never replace with the template showcase.
9. ADD `loading.tsx` / `error.tsx` / `not-found.tsx` if missing (Section 10 clean shells — not showcase chrome).
10. ADD `.env.example`, Husky + lint-staged.
11. If target has `middleware.ts`, rename to `src/proxy.ts` (or root `proxy.ts`), export `proxy`, remove any `runtime` segment config. Only keep `middleware.ts` if Edge runtime is required.
12. Keep components as Server Components by default; add `"use client"` only where hooks/browser APIs require it.
13. Optional: ADAPT `ThemeToggle` if the product wants a theme control.
14. `bun i` → `bun run validate` → fix until green.

### Track B: Vite (or other SPA) → Next.js matching this standard

1. Install Section 4 deps; remove Vite-only runtime packages.
2. Create `src/app/layout.tsx` + `src/app/page.tsx`. Move the former app shell into App Router routes/components. **Preserve product UI** — do not invent a showcase landing.
3. Move static assets to `public/`.
4. Replace `import.meta.env.*` / `VITE_*` with `process.env.NEXT_PUBLIC_*`. Map site URL / image hosts to `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_IMAGE_HOSTS`.
5. Paste CONFIG configs + clean theme baseline + SEO shell (Track A steps 2–13). Skip all SHOWCASE items.
6. `bun i` → `bun run validate`.

### Track C: Tooling-only (not migrating to Next)

Only apply shared pieces: TypeScript strict profile, ESLint flat (drop Next plugin), Prettier, Husky. Do not claim full template parity. Do not add showcase UI.

---

## 7. Root config files (COPY-PASTE)

### `tsconfig.json` — COPY-PASTE

```json
{
  "compilerOptions": {
    /* Base Options: */
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2022",
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    /* Strictness */
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "checkJs": true,
    /* Bundled projects */
    "lib": ["dom", "dom.iterable", "ES2022"],
    "noEmit": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "plugins": [
      {
        "name": "next"
      }
    ],
    "incremental": true,
    /* Path Aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "postcss.config.js",
    "prettier.config.js"
  ],
  "exclude": ["node_modules", ".next"]
}
```

### `eslint.config.mjs` — COPY-PASTE

```js
import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier/flat";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "node_modules/**",
    "next-env.d.ts",
    "eslint.config.mjs",
    ".env",
    ".env.*",
  ]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  reactHooks.configs.flat["recommended-latest"],
  {
    files: ["src/**/*.{js,jsx,ts,tsx}", "app/**/*.{js,jsx,ts,tsx}"],
    ...nextPlugin.configs["core-web-vitals"],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/require-await": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]);

export default eslintConfig;
```

### `prettier.config.js` — COPY-PASTE

```js
/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "<TYPES>",
    "",
    "<TYPES>^[@~]/(?!$).*$",
    "",
    "^[@~]/.*$",
    "",
    "^[./]",
  ],
  experimentalTernaries: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  tailwindStylesheet: "./src/styles/globals.css",
};

export default config;
```

### `postcss.config.js` — COPY-PASTE

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### `.editorconfig` — COPY-PASTE

```ini
# editorconfig.org
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
```

### `.prettierignore` — COPY-PASTE

```gitignore
# Dependencies & build
node_modules
.next
out
build
dist
.cache

# Lockfiles (no need to format)
bun.lock
bun.lockb
package-lock.json
yarn.lock
pnpm-lock.yaml

# Generated / vendored
*.min.js
public
.contentlayer

# Docs (optional: remove if you want to format these)
CHANGELOG.md
```

### `.husky/pre-commit` — COPY-PASTE

Use LF line endings (not CRLF).

```sh
bunx lint-staged
```

### `components.json` — COPY-PASTE (for `bun run ui` / shadcn)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

---

## 8. `next.config.ts` (COPY-PASTE + must-match)

### Full file — COPY-PASTE

```ts
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const imageHostnames = (process.env.NEXT_PUBLIC_IMAGE_HOSTS ?? "")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

/** Sensible CSP for a static marketing/template site without breaking Next.js. */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  // Avoid forcing HTTPS upgrade during local http:// development.
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Next.js 16.4 recommends Cache Components for new apps (create-next-app default).
  cacheComponents: true,
  partialPrefetching: true,
  // Always-on React Compiler; Rust path via Turbopack when available.
  reactCompiler: true,
  experimental: {
    agentUpgrade: "security",
    turbopackRustReactCompiler: true,
  },
  // Keep remote images opt-in. Add comma-separated hosts via NEXT_PUBLIC_IMAGE_HOSTS.
  ...(imageHostnames.length > 0 && {
    images: {
      remotePatterns: imageHostnames.map((hostname) => ({
        protocol: "https",
        hostname,
      })),
    },
  }),
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
```

### Must-match checklist

| Setting | Required value |
| ------- | -------------- |
| `reactStrictMode` | `true` |
| `poweredByHeader` | `false` |
| `cacheComponents` | `true` |
| `partialPrefetching` | `true` |
| `reactCompiler` | `true` |
| `experimental.agentUpgrade` | `"security"` |
| `experimental.turbopackRustReactCompiler` | `true` |
| Remote images | Opt-in only via `NEXT_PUBLIC_IMAGE_HOSTS` → `images.remotePatterns` (`https` + hostname) |
| `headers()` | Applied to `/:path*` |

### Security headers that must be set

| Header | Value |
| ------ | ----- |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=()` |
| `Content-Security-Policy` | Full CSP string above (includes `'unsafe-inline'` / `'unsafe-eval'` for Next; `upgrade-insecure-requests` **only in production**) |

Do not strip CSP or HSTS “to simplify.” Do not enable remote images for `*` hosts.

---

## 9. Theme + globals — CONFIG baseline

This section is the **conversion theme contract**. It is intentionally **not** a dump of the template repo’s showcase CSS.

### Runtime wiring (required)

- Fonts: `src/lib/fonts.ts` (Outfit → `--font-outfit`, DM Sans → `--font-dm-sans`, JetBrains Mono → `--font-jetbrains-mono`) — replaceable; swap fonts and keep the CSS variable names, or remap in `@theme`
- Provider: `src/components/theme-provider.tsx` wrapping the app in `layout.tsx`
- CSS: **clean baseline** `src/styles/globals.css` below (tokens + dark variant + `@theme inline` + base resets + indicator helper)
- Optional toggle: paste ThemeToggle from Section 10 if product needs it (no showcase chrome required)
- To remove theming entirely (only if user asks): drop `next-themes`, provider, dark tokens, and `@custom-variant dark`

### Existing apps (Track A/B)

- **Keep product styles.** Do not wipe domain CSS to “match the template look.”
- If missing: add `@import "tailwindcss"`, `@custom-variant dark`, light/dark tokens, and `@theme inline` mappings so `bg-paper` / `text-ink` / `dark:` work with `ThemeProvider`.
- If the product already has its own token system: wire `ThemeProvider` + dark variant to **that** system; do not force paper/chartreuse values.

### Explicitly excluded from conversion CSS

Do **not** paste into converted projects: `.fx-*`, particle keyframes, studio grid/scrims, `.studio-panel` / liquid-glass chrome, `--studio-*` tokens, showcase motion-rail/row utilities, grain/slate-plane demo backgrounds. Those stay in the template repo for its demo landing only (Section 17).

### `src/lib/fonts.ts` — COPY-PASTE

```ts
import { DM_Sans, JetBrains_Mono, Outfit } from "next/font/google";

export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});
```

### `src/components/theme-provider.tsx` — COPY-PASTE

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### `src/styles/globals.css` — COPY-PASTE (clean theme baseline)

Do not ship a stub that only has `@import "tailwindcss"`. Do not paste the template’s showcase FX block.

```css
@import "tailwindcss";
@import "tailwind-animate";

/* next-themes sets .dark on <html>; enable Tailwind dark: variants */
@custom-variant dark (&:where(.dark, .dark *));

/*
  Clean light/dark token baseline for conversions.
  Retheme freely; do not add showcase FX here.
*/
:root {
  --ink: #16181d;
  --ink-muted: #5a606a;
  --paper: #f3f1eb;
  --paper-elevated: #faf9f6;
  --line: #d4d0c8;
  --accent: #b8d40f;
  --accent-fg: #16181d;
  --accent-soft: #e8efc0;
  --terminal: #12141a;
  --shadow-soft: 22 24 28;
}

.dark {
  --ink: #f0eee8;
  --ink-muted: #b4b9c2;
  --paper: #12141a;
  --paper-elevated: #1c1f27;
  --line: #3d434e;
  --accent: #d4f01a;
  --accent-fg: #16181d;
  --accent-soft: #252b14;
  --terminal: #08090c;
  --shadow-soft: 0 0 0;
}

@theme inline {
  --font-display: var(--font-outfit), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;

  --color-ink: var(--ink);
  --color-ink-muted: var(--ink-muted);
  --color-paper: var(--paper);
  --color-paper-elevated: var(--paper-elevated);
  --color-line: var(--line);
  --color-accent: var(--accent);
  --color-accent-fg: var(--accent-fg);
  --color-accent-soft: var(--accent-soft);
  --color-terminal: var(--terminal);
}

@layer base {
  .container {
    margin-inline: auto;
    padding-inline: 1rem;
    max-width: 1280px;
  }

  html {
    background-color: var(--paper);
    color: var(--ink);
  }

  body {
    background-color: var(--paper);
    color: var(--ink);
  }

  ::selection {
    background-color: color-mix(in oklab, var(--accent) 55%, transparent);
    color: var(--ink);
  }

  a {
    text-underline-offset: 0.18em;
  }
}

@layer utilities {
  /* Dev-only breakpoint badge (TailwindIndicator) */
  .indicator-only-xl {
    display: none;
  }
  @media (min-width: 80rem) and (max-width: 95.9975rem) {
    .indicator-only-xl {
      display: inline-block;
    }
  }
}
```

---

## 10. App shell + SEO (COPY-PASTE / ADAPT)

### `src/app/page.tsx` — PRESERVE or CREATE minimal (never paste showcase)

| Track | Action |
| ----- | ------ |
| **A / B (existing product)** | **PRESERVE** existing home and product routes. Do not replace with the template landing. |
| **G (greenfield)** | Write the real product page, **or** paste the minimal placeholder below until product UI exists. |

**Do not** copy the template’s showcase `page.tsx` (studio panel, particles, editorial hero, marketing copy). That is SHOWCASE-only (Section 17).

#### Minimal placeholder home — CREATE if greenfield and no product UI yet

```tsx
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-4 px-6 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
        {siteConfig.name}
      </h1>
      <p className="text-base text-ink-muted">{siteConfig.description}</p>
    </main>
  );
}
```

### `src/config/site.ts` — ADAPT (shape + placeholders)

Replace every `YOUR_*` / placeholder URL with product values. Keep the field set and `baseUrl` logic. Do not leave “Next.js Template” / template-repo OG branding in converted products.

```ts
/**
 * Site configuration. Customize this file for your project.
 *
 * Single source for metadata, OG/Twitter, canonical URL, robots, sitemap.
 * Override URL with NEXT_PUBLIC_SITE_URL (no trailing slash).
 */

const baseUrl =
  (
    typeof process.env.NEXT_PUBLIC_SITE_URL === "string" &&
    process.env.NEXT_PUBLIC_SITE_URL.length > 0
  ) ?
    process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  : "https://YOUR_DOMAIN.example";

export const siteConfig = {
  name: "YOUR_SITE_NAME",
  shortName: "YOUR_SHORT_NAME",
  description: "YOUR_SITE_DESCRIPTION",
  url: baseUrl,
  email: { team: "YOUR_TEAM@example.com" },

  authors: [{ name: "YOUR_AUTHOR_NAME", url: "https://YOUR_AUTHOR_URL.example" }],

  creator: "YOUR_CREATOR_NAME",
  publisher: "YOUR_PUBLISHER_NAME",

  keywords: ["YOUR_KEYWORD_1", "YOUR_KEYWORD_2"],

  links: {
    github: "https://github.com/YOUR_ORG_OR_USER",
    repo: "https://github.com/YOUR_ORG_OR_USER/YOUR_REPO",
    templateRepo: "https://github.com/YOUR_ORG_OR_USER/YOUR_REPO",
    githubDisplay: "YOUR_ORG_OR_USER@github",
  },

  twitter: {
    handle: "@YOUR_HANDLE",
    site: "@YOUR_HANDLE",
  },

  ogImage: `${baseUrl}/og.png`,

  robots: {
    index: true,
    follow: true,
  },
};

export type SiteConfig = typeof siteConfig;
```

### `src/app/layout.tsx` — ADAPT (keep this wiring)

Preserve product providers if any. Keep `ThemeProvider` props, font variables, `suppressHydrationWarning`, metadata/viewport/JSON-LD pattern.

```tsx
import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";

import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import * as fonts from "@/lib/fonts";
import { cn } from "@/lib/utils";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: siteConfig.name,
      alternateName: siteConfig.shortName,
      description: siteConfig.description,
      url: siteConfig.url,
      inLanguage: "en-US",
      publisher: {
        "@type": "Person",
        name: siteConfig.creator,
        url: siteConfig.authors[0]?.url,
      },
    },
    {
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      url: siteConfig.url,
      description: siteConfig.description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@type": "Person",
        name: siteConfig.creator,
        url: siteConfig.authors[0]?.url,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          fonts.outfit.variable,
          fonts.dmSans.variable,
          fonts.mono.variable,
          "min-h-dvh scroll-smooth font-sans antialiased",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1eb" },
    { media: "(prefers-color-scheme: dark)", color: "#12141a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  applicationName: siteConfig.shortName,
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: siteConfig.robots.index,
    follow: siteConfig.robots.follow,
    googleBot: {
      index: siteConfig.robots.index,
      follow: siteConfig.robots.follow,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    site: siteConfig.twitter.site,
    creator: siteConfig.twitter.handle,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      {
        rel: "icon",
        url: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  category: "technology",
};
```

Wire checklist:

| Consumer | Must use `siteConfig` for |
| -------- | ------------------------- |
| `src/app/layout.tsx` | `metadataBase`, title template, description, authors, OG/Twitter, icons, robots, JSON-LD |
| `src/app/robots.ts` | `sitemap`, `host` |
| `src/app/sitemap.ts` | entry `url` |
| `public/site.webmanifest` | name / short_name / colors aligned with brand |

### `src/app/robots.ts` — COPY-PASTE (uses siteConfig)

```ts
import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
```

### `src/app/sitemap.ts` — ADAPT (`lastModified` / routes as needed)

```ts
import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

### `src/app/loading.tsx` — COPY-PASTE (clean shell, no showcase chrome)

```tsx
export default function Loading() {
  return (
    <main className="flex min-h-dvh flex-col justify-center bg-paper px-6 text-ink sm:px-10">
      <div className="mx-auto w-full max-w-lg">
        <div
          className="h-1 w-14 bg-accent motion-safe:animate-pulse"
          aria-hidden
        />
        <div
          className="mt-6 h-10 w-3/4 max-w-sm bg-line motion-safe:animate-pulse"
          aria-hidden
        />
        <div
          className="mt-4 h-4 w-full max-w-md bg-line/70 motion-safe:animate-pulse"
          aria-hidden
        />
        <p className="sr-only">Loading</p>
      </div>
    </main>
  );
}
```

### `src/app/error.tsx` — COPY-PASTE

```tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-paper px-6 text-center text-ink">
      <p className="font-mono text-sm text-ink-muted">Error</p>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        Something went wrong
      </h1>
      <p className="max-w-sm text-sm text-ink-muted">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-2 min-h-10 bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-accent hover:text-accent-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        Try again
      </button>
    </main>
  );
}
```

### `src/app/not-found.tsx` — COPY-PASTE

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-paper px-6 text-center text-ink">
      <p className="font-mono text-sm text-ink-muted">404</p>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="max-w-sm text-sm text-ink-muted">
        The page you requested does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-2 border-b border-accent text-sm font-semibold text-ink underline-offset-4 hover:bg-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        Back to home
      </Link>
    </main>
  );
}
```

### Optional: `ThemeToggle` — ADAPT / COPY-PASTE if product needs a theme control

Useful optional UX — **not required**. Do not wrap it in showcase chrome. Create e.g. `src/components/theme-toggle.tsx` (or keep colocated). Requires `lucide-react` and `cn`.

```tsx
"use client";

import { useSyncExternalStore } from "react";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

type ThemeValue = (typeof themes)[number]["value"];

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();
  const active = (isClient ? theme : "system") as ThemeValue;

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={cn(
        "inline-flex h-10 items-stretch border border-line bg-paper-elevated p-0.5 sm:h-9",
        className,
      )}
    >
      {themes.map(({ value, label, icon: Icon }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={`${label} theme`}
            aria-pressed={isActive}
            disabled={!isClient}
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex min-h-9 min-w-9 cursor-pointer items-center justify-center gap-1.5 px-2.5 text-xs font-medium transition-[background-color,color,opacity] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-paper disabled:cursor-default sm:min-h-0 sm:min-w-8",
              isActive ?
                "bg-accent text-accent-fg"
              : "text-ink-muted hover:bg-accent-soft hover:text-ink",
            )}
          >
            <Icon className="size-3.5 shrink-0" aria-hidden />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
```

Theme works without this toggle (`system` default via provider). Toggle is optional UX.

### `public/site.webmanifest` — ADAPT

```json
{
  "name": "YOUR_SITE_NAME",
  "short_name": "YOUR_SHORT_NAME",
  "description": "YOUR_SITE_DESCRIPTION",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#f3f1eb",
  "theme_color": "#b8d40f",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

Icons / `og.png` / `favicon.ico` are binary assets: generate product icons or keep placeholders. Paths must match `layout.tsx` metadata and the manifest.

---

## 11. Supporting files (COPY-PASTE)

### `.env.example` — COPY-PASTE

```bash
# Site URL (optional). Used for canonical URL, OG image, sitemap, and robots.
# If set, overrides the default in src/config/site.ts. No trailing slash.
# NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Remote image host allowlist for next/image (optional).
# Comma-separated hostnames, https only.
# Example: NEXT_PUBLIC_IMAGE_HOSTS=images.example.com,cdn.example.org
# NEXT_PUBLIC_IMAGE_HOSTS=

# Add other env vars as needed (e.g. API keys, feature flags).
```

### `src/lib/utils.ts` — COPY-PASTE

```ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `src/types/reset.d.ts` — COPY-PASTE

```ts
// Do not add any other lines of code to this file!
import "@total-typescript/ts-reset";
```

### `src/components/tailwind-indicator.tsx` — COPY-PASTE

```tsx
export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div
      className="fixed right-2 bottom-2 z-50 font-mono text-[10px] font-medium text-zinc-500"
      aria-hidden
    >
      <span className="rounded-md border border-zinc-700/60 bg-zinc-900/90 px-2 py-1 backdrop-blur-sm sm:hidden">
        xs
      </span>
      <span className="hidden rounded-md border border-zinc-700/60 bg-zinc-900/90 px-2 py-1 backdrop-blur-sm sm:inline-block md:hidden">
        sm
      </span>
      <span className="hidden rounded-md border border-zinc-700/60 bg-zinc-900/90 px-2 py-1 backdrop-blur-sm md:inline-block lg:hidden">
        md
      </span>
      <span className="hidden rounded-md border border-zinc-700/60 bg-zinc-900/90 px-2 py-1 backdrop-blur-sm lg:inline-block xl:hidden">
        lg
      </span>
      <span className="indicator-only-xl rounded-md border border-zinc-700/60 bg-zinc-900/90 px-2 py-1 backdrop-blur-sm">
        xl
      </span>
      <span className="hidden rounded-md border border-zinc-700/60 bg-zinc-900/90 px-2 py-1 backdrop-blur-sm 2xl:inline-block">
        2xl
      </span>
    </div>
  );
}
```

### `.gitignore` — COPY-PASTE (recommended baseline)

```gitignore
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# lockfiles (keep one; ignore others per package manager)
bun.lockb
package-lock.json
yarn.lock
pnpm-lock.yaml

# husky
.husky/_
```

---

## 12. File tree target state

```text
.
├── .env.example
├── .editorconfig
├── .gitignore
├── .prettierignore
├── .husky/pre-commit
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.js
├── prettier.config.js
├── tsconfig.json
├── public/
│   ├── favicon.ico
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── apple-touch-icon.png
│   ├── og.png
│   └── site.webmanifest
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── loading.tsx
    │   ├── error.tsx
    │   ├── not-found.tsx
    │   ├── robots.ts
    │   └── sitemap.ts
    ├── components/
    │   ├── theme-provider.tsx
    │   ├── tailwind-indicator.tsx
    │   └── (optional) theme-toggle.tsx
    ├── config/
    │   └── site.ts
    ├── lib/
    │   ├── fonts.ts
    │   └── utils.ts
    ├── styles/
    │   └── globals.css
    ├── types/
    │   └── reset.d.ts
    └── proxy.ts          # only if request interception is required
```

Notes:

- Prefer `src/proxy.ts` over deprecated `middleware.ts`.
- Do not add `.github/workflows/*` unless requested.
- `components.json` enables `bun run ui` (shadcn).
- Binary icons under `public/` are not inlinable as text; generate or supply product assets at the paths above.
- `page.tsx` is product UI or the minimal placeholder — **not** the template showcase.
- `globals.css` is the Section 9 clean baseline — **not** the template’s showcase FX stylesheet.
- Do **not** add `ShowcaseAtmosphere`, showcase-only components, or `.fx-*` CSS.

---

## 13. Validation

```bash
bun i
bun run validate
```

Equivalent gate if scripts match Section 5:

```bash
bun run lint
bun run fmt:check
bun run build
```

Stop only when `validate` exits 0.

---

## 14. Common failure modes

| Symptom | Fix |
| ------- | --- |
| Dark mode classes do nothing | Missing `@custom-variant dark` or `ThemeProvider` not using `attribute="class"` |
| Theme looks broken after “Tailwind setup” | `globals.css` was replaced with a stub; re-paste Section 9 **clean baseline** |
| Showcase CSS / particles landed in product | Remove `.fx-*`, studio/liquid-glass, showcase components; re-apply Section 9 only |
| Template landing pasted over product home | Restore product `page.tsx`; greenfield uses Section 10 minimal placeholder only |
| User must delete demo UI after conversion | Failure — conversion should never ship SHOWCASE; see Section 17 |
| `next/image` host errors | Add host to `NEXT_PUBLIC_IMAGE_HOSTS` (comma-separated); do not open `remotePatterns` to `**` |
| ESLint ignores App Router files | Ensure Next plugin `files` globs include `src/**/*.{js,jsx,ts,tsx}` |
| Path alias failures | `tsconfig` `paths` + imports must use `@/…` under `src/` |
| React Compiler / build missing plugin | Install exact `babel-plugin-react-compiler@1.0.0` |
| Husky hook fails oddly on macOS/Linux | Convert `.husky/pre-commit` to LF |
| Hydration warnings from theme | Keep `suppressHydrationWarning` on `<html>`; provider already in layout block |
| Converted Vite env undefined | Map to `NEXT_PUBLIC_*`; restart dev server after `.env` changes |
| Accidental UI wipe | Restore product `page.tsx` / components; do not use template showcase |
| Added CI “for completeness” | Delete unless user requested |
| `middleware` deprecation | Rename to `proxy.ts` / export `proxy`; remove `runtime` from proxy config |
| Client bundle bloat | Default to RSC; `"use client"` only at leaves that need it |

---

## 15. Reusable agent prompt

```text
Convert this repository to match the Next.js CONFIG standard in the attached playbook.

Playbook: docs/PROJECT_CONVERSION_PLAYBOOK.md (or the playbook text provided in this chat).

Rules:
1) Use ONLY this playbook. Do not assume template filesystem access. Do not clone a template unless the user explicitly provides a path/URL and asks you to use it.
2) CONFIG only. Do NOT copy template showcase UI: no demo landing page.tsx, no ShowcaseAtmosphere/particles, no .fx-* / studio / liquid-glass / showcase motion CSS, no template marketing copy. Users must not need post-conversion showcase cleanup.
3) Goal/non-goals as written: no CI, no auth/DB unless asked, preserve product UI on existing apps, keep RSC defaults.
4) Use exact dependency ranges and scripts from the playbook Sections 4–5.
5) Paste CONFIG COPY-PASTE files from the playbook (especially next.config.ts and Section 9 clean globals.css). Do not invent stubs. Do not paste the template repo’s showcase stylesheet.
6) ADAPT site.ts + layout SEO wiring with product identity; ensure robots.ts and sitemap.ts read siteConfig.
7) Wire ThemeProvider + fonts. For existing apps: keep product styles; add theme contract only if missing.
8) page.tsx: PRESERVE product pages, or CREATE the Section 10 minimal placeholder (greenfield). Never paste the template showcase landing.
9) ThemeToggle is optional ADAPT UX — not required, no showcase chrome.
10) Choose Track G / A / B / C from the playbook.
11) Run `bun run validate` and fix until green.
12) Return: changed files, track used, confirmation that SHOWCASE was skipped, deviations, validate result.
```

---

## 16. Done checklist

Finish only when all are true:

- [ ] `bun run validate` passes
- [ ] `package.json` engines, deps, scripts, lint-staged, overrides match Sections 4–5
- [ ] `next.config.ts` satisfies Section 8 must-match + security headers
- [ ] `eslint.config.mjs`, `prettier.config.js`, `postcss.config.js`, `tsconfig.json` match Section 7
- [ ] `src/styles/globals.css` is the Section 9 **clean baseline** (tokens + dark + `@theme` + base) — **no** `.fx-*`, studio/liquid-glass, or showcase motion
- [ ] `ThemeProvider` wired unless theming explicitly removed
- [ ] `src/config/site.ts` drives `layout.tsx`, `robots.ts`, `sitemap.ts` with **product** identity (not leftover template OG branding)
- [ ] App shell includes `loading.tsx`, `error.tsx`, `not-found.tsx` (clean shells)
- [ ] Husky pre-commit runs lint-staged (LF)
- [ ] No CI added unless requested
- [ ] Existing product UI preserved (Tracks A/B) **or** greenfield uses minimal placeholder / real product page — **not** template showcase
- [ ] No showcase components/CSS left for the user to delete
- [ ] New client boundaries are intentional (`"use client"` only where required)

---

## 17. SHOWCASE (template-only — skip)

The template repository’s landing exists to demonstrate the starter. **Converted projects must not inherit it.**

| Item | Status on conversion |
| ---- | -------------------- |
| Template `src/app/page.tsx` (editorial hero, studio panel, showcase copy) | **SKIP** |
| `ShowcaseAtmosphere` / particle / cursor-glow clients | **SKIP** |
| CSS: `.fx-*`, `@keyframes fx-*`, `.studio-panel`, `.bg-studio*`, `.bg-slate-plane`, `.bg-grain`, motion-rail/row showcase utilities, `--studio-*` tokens | **SKIP** |
| Template marketing / “Next.js Template” OG beyond placeholders | **SKIP** (ADAPT `site.ts` instead) |
| Section 9 clean tokens + ThemeProvider + fonts | **KEEP** (CONFIG) |
| ThemeToggle | **Optional ADAPT** |

If you have template filesystem access and are tempted to “match the look,” stop: match **CONFIG** only. Shipping showcase into a product app is a playbook violation — the user should not need cleanup afterward.
