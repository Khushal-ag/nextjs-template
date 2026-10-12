# Project Conversion Playbook

Use this document to convert an existing project (Next.js, Vite, or other JS/TS app) to the configuration standard defined here.

This playbook is intentionally agent-friendly: deterministic steps, exact package versions/ranges, and target file contents.

## 1. Target Baseline

- Runtime: Node.js `>=20.20.2` (source of truth: `package.json` `engines.node`)
- Recommended package manager: Bun
- Framework baseline: Next.js App Router
- Language: TypeScript strict mode
- Styling: Tailwind CSS v4 via `@tailwindcss/postcss`
- Linting: ESLint flat config + TypeScript + Next + `eslint-plugin-react-hooks` (recommended-latest) + Prettier compat
- Formatting: Prettier + import sorting + Tailwind class sorting
- Git hooks: Husky + lint-staged pre-commit

## 2. Package Versions To Use

Install these dependencies to match this standard config.

### Dependencies

```json
{
  "clsx": "^2.1.1",
  "lucide-react": "^0.577.0",
  "next": "^16.4.0",
  "react": "^19.3.0",
  "react-dom": "^19.3.0",
  "tailwind-merge": "^3.7.0"
}
```

### Dev Dependencies

```json
{
  "@eslint/js": "^9.39.5",
  "@ianvs/prettier-plugin-sort-imports": "^4.7.1",
  "@next/eslint-plugin-next": "^16.4.0",
  "@tailwindcss/postcss": "^4.3.3",
  "@total-typescript/ts-reset": "^0.6.1",
  "@types/node": "^22.20.5",
  "@types/react": "^19.3.0",
  "@types/react-dom": "^19.3.0",
  "babel-plugin-react-compiler": "1.0.0",
  "eslint": "^10.12.0",
  "eslint-config-prettier": "^10.1.8",
  "eslint-plugin-react-hooks": "^7.1.1",
  "husky": "^9.1.7",
  "lint-staged": "^16.4.0",
  "postcss": "^8.5.29",
  "prettier": "^3.9.10",
  "prettier-plugin-tailwindcss": "^0.8.1",
  "tailwind-animate": "^0.2.10",
  "tailwindcss": "^4.3.3",
  "typescript": "^5.9.3",
  "typescript-eslint": "^8.71.1"
}
```

### Optional package override

```json
{
  "overrides": {
    "zod-validation-error": "^5.0.0"
  }
}
```

## 3. Standard `package.json` Scripts

Set scripts to this baseline:

```json
{
  "scripts": {
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
}
```

`validate` is package-manager agnostic. If you are not using Bun, change only `cleani` to your package manager equivalent.

## 4. Required Config Files

Create or replace these files.

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2022",
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "checkJs": true,
    "lib": ["dom", "dom.iterable", "ES2022"],
    "noEmit": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "plugins": [{ "name": "next" }],
    "incremental": true,
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

## `eslint.config.mjs`

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

## `prettier.config.js`

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

## `postcss.config.js`

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

## `next.config.ts`

Match the repository `next.config.ts`: Cache Components + Partial Prefetching, always-on React Compiler (with `experimental.turbopackRustReactCompiler`), opt-in remote images, and security headers (HSTS, nosniff, frame deny, referrer, permissions policy, CSP).

## 5. Base Styling Contract (Tailwind v4)

Create `src/styles/globals.css`:

```css
@import "tailwindcss";
@import "tailwind-animate";

@theme {
  --font-sans: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-mono), ui-monospace, monospace;
}

@layer base {
  .container {
    margin-inline: auto;
    padding-inline: 1rem;
    max-width: 1280px;
  }
}

@layer utilities {
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

## 6. Utility + Type Safety Files

Create `src/lib/utils.ts`:

```ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Create `src/types/reset.d.ts`:

```ts
import "@total-typescript/ts-reset";
```

## 7. Git Hooks and Ignore Files

## `.husky/pre-commit`

```sh
bunx lint-staged
```

## `lint-staged` in `package.json`

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix"],
    "*.{ts,tsx,mdx,json}": ["prettier --write"]
  }
}
```

## `.editorconfig`

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
```

## `.prettierignore`

```gitignore
node_modules
.next
out
build
dist
.cache
bun.lock
bun.lockb
package-lock.json
yarn.lock
pnpm-lock.yaml
*.min.js
public
.contentlayer
CHANGELOG.md
```

## 8. App Router Structure (Next.js Target)

Target structure for this standard:

- `src/app/layout.tsx` - global metadata + JSON-LD + fonts + global css
- `src/app/page.tsx` - home page
- `src/app/error.tsx` - client error boundary
- `src/app/not-found.tsx` - 404 UI
- `src/app/robots.ts` - metadata route
- `src/app/sitemap.ts` - metadata route
- `src/config/site.ts` - single source of SEO/site config
- `src/lib/fonts.ts` - next/font variables (Outfit + DM Sans + JetBrains Mono)
- `public/site.webmanifest` - manifest
- Prefer `src/proxy.ts` (not `middleware.ts`) if you need request interception

Important: `layout.tsx`, `robots.ts`, and `sitemap.ts` should read from `src/config/site.ts` so metadata remains centralized.

## 9. Conversion Tracks

Choose one track based on source project.

## Track A: Existing Next.js Project -> Standard Config

1. Upgrade dependencies to versions in Section 2.
2. Replace scripts with Section 3.
3. Replace config files from Section 4.
4. Move global styles to `src/styles/globals.css` and import in `src/app/layout.tsx`.
5. Add `src/config/site.ts`, `src/lib/utils.ts`, `src/lib/fonts.ts`, `src/types/reset.d.ts`.
6. Ensure TS path alias `@/* -> ./src/*` and update imports.
7. Add Husky + lint-staged setup from Section 7.
8. Run validation commands from Section 10.

## Track B: Vite React Project -> Standard Config (Full Next-Style Migration)

1. Install Next + React + React DOM versions from Section 2 and remove Vite-only runtime packages (`vite`, `@vitejs/plugin-react` if not needed).
2. Create `src/app/layout.tsx` and `src/app/page.tsx` and migrate your root component into App Router pages/components.
3. Move assets from Vite `public` semantics to Next `public` semantics (mostly compatible).
4. Convert any direct `import.meta.env.*` usage to `process.env.NEXT_PUBLIC_*` (client-safe vars only).
5. Replace Vite config/tooling files with Next equivalents in this playbook.
6. Apply Sections 3-8.
7. Run validation commands from Section 10.

## Track C: Non-Next Project (Node, Frontend, Mixed)

- If the goal is exact parity with this standard, migrate to Next.js first, then apply Track A.
- If migration to Next.js is not desired, only apply shared tooling portions:
  - TypeScript strict profile
  - ESLint flat config (remove Next-specific rules/plugins)
  - Prettier + import sort + Tailwind sorting
  - Husky + lint-staged

## 10. Validation Commands

Run after conversion:

```bash
bun i
bun run lint
bun run fmt:check
bun run build
bun run validate
```

If using npm/pnpm/yarn, execute equivalent commands.

## 11. Known Notes

- If any project docs conflict with `package.json` `engines.node`, treat `package.json` as source of truth.
- `next.config.ts` enables Cache Components, Partial Prefetching, always-on React Compiler, Turbopack Rust React Compiler, and security headers.
- `next.config.ts` keeps remote image hosts opt-in through `NEXT_PUBLIC_IMAGE_HOSTS`.
- Pin `babel-plugin-react-compiler` to an exact version (React team recommendation).
- Tailwind v4 is CSS-first; there is no required `tailwind.config.ts` for this setup.
- Request interception belongs in `proxy.ts` (Node runtime). Avoid adding legacy `middleware.ts` unless you specifically need the Edge runtime.

## 12. Agent Prompt You Can Reuse

Give this prompt to any AI agent when converting another project:

```text
Convert this repository to match the config standard described in this playbook.

Requirements:
1) Use the exact dependency and devDependency versions/ranges from Section 2.
2) Replace scripts with Section 3 equivalents for this repo's package manager.
3) Create/replace all config files exactly as specified in Section 4.
4) Apply Tailwind v4 CSS-first setup from Section 5.
5) Add utility/type reset and git hook setup from Sections 6 and 7.
6) Choose the correct migration track from Section 9 based on this repo type.
7) Run validation from Section 10 and fix all errors.
8) Output a final summary listing changed files and any deviations from the playbook.
```

## 13. Minimal Output Checklist (for AI agents)

An agent should finish only when all are true:

- `bun run lint` passes
- `bun run fmt:check` passes
- `bun run build` passes
- `src/config/site.ts` exists and is referenced by metadata files
- `eslint.config.mjs`, `prettier.config.js`, `postcss.config.js`, `tsconfig.json` match playbook intent
- Husky pre-commit + lint-staged configured
