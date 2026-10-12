import { Copyright, Github } from "lucide-react";

import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

import {
  CopyCommandButton,
  ShowcaseAtmosphere,
  ThemeModeLabel,
  ThemeToggle,
} from "./client-components";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.name,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
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
  },
};

/** Versions shown in the studio. Keep in sync with package.json majors. */
const stack = [
  { name: "Next.js", version: "16.4" },
  { name: "React", version: "19" },
  { name: "Tailwind", version: "4" },
  { name: "TypeScript", version: "5" },
] as const;

const studioRoutes = [
  { route: "/", file: "page.tsx", note: "This landing page" },
  { route: "/robots.txt", file: "robots.ts", note: "Crawl rules" },
  { route: "/sitemap.xml", file: "sitemap.ts", note: "URL map" },
] as const;

const studioShell = [
  { file: "layout.tsx", note: "Root shell, fonts, theme provider" },
  { file: "error.tsx", note: "Route error boundary" },
  { file: "loading.tsx", note: "Pending UI" },
  { file: "not-found.tsx", note: "404" },
] as const;

const startSteps = [
  {
    index: "01",
    title: "Install",
    detail: "bun install. Dependencies and Husky hooks install together.",
  },
  {
    index: "02",
    title: "Develop",
    detail: "bun dev. Turbopack at localhost:3000 with Cache Components on.",
  },
  {
    index: "03",
    title: "Validate",
    detail: "bun run validate. Lint, types, Prettier, then a production build.",
  },
] as const;

const fileMap = [
  {
    path: "src/app/",
    detail: "Routes, layout, metadata, error / loading / not-found",
  },
  {
    path: "src/styles/globals.css",
    detail: "Design tokens, light/dark variables, motion utilities",
  },
  {
    path: "src/config/site.ts",
    detail: "Name, URL, SEO, links. Edit once after you fork.",
  },
  {
    path: "src/components/theme-provider.tsx",
    detail: "next-themes wrapper (light, dark, system)",
  },
] as const;

const included = [
  { label: "Routing", value: "App Router, Cache Components, React Compiler" },
  { label: "Style", value: "Tailwind v4, CSS variables, theme switcher" },
  { label: "Quality", value: "ESLint 10, Prettier, Husky, lint-staged" },
  { label: "SEO", value: "Metadata, OG/Twitter, JSON-LD, robots, sitemap" },
] as const;

const rowDelay = [
  "motion-row-delay-1",
  "motion-row-delay-2",
  "motion-row-delay-3",
  "motion-row-delay-4",
  "motion-row-delay-5",
  "motion-row-delay-6",
  "motion-row-delay-7",
] as const;

export default function App() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-paper text-ink">
      <div
        className="bg-studio pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-soft-light"
        aria-hidden
      />

      {/* Hero + studio: one composition, flush on large screens */}
      <section
        id="top"
        className="relative z-10 grid min-h-dvh lg:grid-cols-12"
      >
        <div className="relative z-20 flex flex-col lg:col-span-5">
          <ShowcaseAtmosphere
            variant="hero"
            className="absolute inset-0 z-0 opacity-90 lg:opacity-100"
          />
          <header className="relative z-10 flex items-center justify-between gap-3 px-4 pt-5 sm:gap-4 sm:px-8 sm:pt-6 lg:px-14">
            <a
              href="#top"
              className="group flex min-w-0 items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:gap-3"
            >
              <span
                className="relative flex size-8 shrink-0 items-center justify-center bg-terminal font-display text-sm font-bold text-accent"
                aria-hidden
              >
                <span className="absolute top-0 right-0 size-1.5 bg-accent" />N
              </span>
              <span className="truncate font-display text-sm font-semibold tracking-tight text-ink">
                {siteConfig.shortName}
              </span>
            </a>
            {/* Mobile / tablet: toggle lives with brand */}
            <ThemeToggle className="shrink-0 lg:hidden" />
          </header>

          <div className="relative z-10 flex flex-1 flex-col justify-center px-4 pt-10 pb-12 sm:px-8 sm:pt-12 sm:pb-14 lg:px-14 lg:pt-6 lg:pb-20">
            <p className="motion-rise font-display text-[0.7rem] font-semibold tracking-[0.28em] text-ink uppercase sm:text-xs">
              {siteConfig.shortName}
            </p>
            <div className="motion-rule mt-4 h-1 w-14 bg-accent" aria-hidden />

            <h1 className="motion-rise motion-rise-delay-1 mt-6 font-display text-[2.5rem] leading-[0.95] font-extrabold tracking-tight text-ink sm:text-6xl lg:text-[3.75rem] xl:text-[4.25rem]">
              Lean
              <span className="block">starter for</span>
              <span className="block text-ink">
                Next<span className="text-accent">.</span>16
              </span>
            </h1>

            <p className="motion-rise motion-rise-delay-2 mt-6 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
              Clone it, set the theme, edit{" "}
              <code className="font-mono text-[0.9em] text-ink">site.ts</code>.
              TypeScript, Tailwind v4, and light/dark/system are already set up.
            </p>

            <div className="motion-rise motion-rise-delay-3 mt-8 flex w-full max-w-xl flex-col gap-3 sm:mt-10 sm:flex-row sm:items-stretch">
              <a
                href={siteConfig.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-ink px-5 py-3.5 text-sm font-semibold text-paper transition-[background-color,color,transform] duration-200 hover:bg-accent hover:text-accent-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.98]"
              >
                <Github className="size-4 shrink-0" aria-hidden />
                View on GitHub
              </a>
              <CopyCommandButton />
            </div>
          </div>
        </div>

        {/* Studio plane: stack, routes, theme, status */}
        <aside
          className="motion-plane relative flex min-h-[22rem] flex-col overflow-hidden sm:min-h-[26rem] lg:col-span-7 lg:min-h-full"
          aria-label="Template overview"
        >
          <div className="bg-slate-plane absolute inset-0" />
          <div
            className="bg-studio-grid motion-grid-wash pointer-events-none absolute inset-0 opacity-55"
            aria-hidden
          />
          <ShowcaseAtmosphere variant="studio" className="z-[1]" />
          <div
            className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_80%_70%_at_35%_30%,transparent_0%,color-mix(in_oklab,#0c0e12_45%,transparent)_100%)]"
            aria-hidden
          />
          <div className="bg-grain pointer-events-none absolute inset-0 z-[2] opacity-[0.07] mix-blend-soft-light" />
          {/* Panel chrome: left rail marks the studio edge */}
          <div
            className="motion-rail absolute top-0 left-0 z-10 h-full w-1 bg-accent"
            aria-hidden
          />

          <div className="relative z-10 flex flex-1 flex-col gap-5 p-5 sm:gap-6 sm:p-8 lg:p-10 lg:pl-12">
            {/* Top row: stack + theme (flush at studio top edge) */}
            <div className="flex items-start justify-between gap-4">
              <div className="studio-panel min-w-0 flex-1 px-3.5 py-3 sm:px-4 sm:py-3.5">
                <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-studio-muted uppercase">
                  Stack
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {stack.map((item, i) => (
                    <li
                      key={item.name}
                      className={`motion-row ${rowDelay[i]} font-display text-sm font-bold tracking-tight text-studio-fg sm:text-base`}
                    >
                      {item.name}{" "}
                      <span className="text-accent">{item.version}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Desktop: toggle sits on the studio top edge */}
              <ThemeToggle className="hidden shrink-0 border-white/20 bg-black/45 lg:inline-flex [&_button:not([aria-pressed=true])]:text-studio-muted [&_button:not([aria-pressed=true])]:hover:bg-white/10 [&_button:not([aria-pressed=true])]:hover:text-studio-fg" />
            </div>

            <div className="grid flex-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <div className="studio-panel px-3.5 py-3 sm:px-4 sm:py-3.5">
                <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-studio-muted uppercase">
                  Routes
                </p>
                <ul className="mt-3 space-y-2.5">
                  {studioRoutes.map((item, i) => (
                    <li
                      key={item.route}
                      className={`motion-row ${rowDelay[i + 1]} flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3`}
                    >
                      <code className="shrink-0 font-mono text-sm font-semibold text-studio-fg">
                        {item.route}
                      </code>
                      <span className="font-mono text-[11px] text-studio-muted">
                        {item.file}
                        <span className="text-studio-fg/40"> · </span>
                        {item.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="studio-panel px-3.5 py-3 sm:px-4 sm:py-3.5">
                <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-studio-muted uppercase">
                  App shell
                </p>
                <ul className="mt-3 space-y-2.5">
                  {studioShell.map((item, i) => (
                    <li
                      key={item.file}
                      className={`motion-row ${rowDelay[i + 2]} flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3`}
                    >
                      <code className="shrink-0 font-mono text-sm font-semibold text-studio-fg">
                        {item.file}
                      </code>
                      <span className="font-mono text-[11px] text-studio-muted">
                        {item.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="studio-panel mt-auto flex flex-col gap-3 px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-3.5">
              <ThemeModeLabel />
              <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-studio-muted uppercase">
                <span className="font-semibold text-accent">Ready</span>
                <span className="text-studio-fg/40"> · </span>
                bun dev → localhost:3000
              </p>
            </div>
          </div>
        </aside>
      </section>

      {/* Quick start */}
      <section
        className="relative z-10 border-t border-line bg-paper-elevated px-4 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-20"
        aria-labelledby="start-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] tracking-[0.2em] text-ink-muted uppercase">
                Quick start
              </p>
              <h2
                id="start-heading"
                className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
              >
                From clone to{" "}
                <span className="text-ink">
                  localhost<span className="text-accent">.</span>
                </span>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-muted sm:text-lg">
                Three commands. Then open{" "}
                <code className="font-mono text-[0.9em] text-ink">
                  src/config/site.ts
                </code>{" "}
                and put your name on it.
              </p>
            </div>
            <div className="h-1 w-16 shrink-0 bg-accent md:mb-2" aria-hidden />
          </div>

          <ol className="mt-10 grid gap-0 border-t border-line sm:mt-12 md:grid-cols-3">
            {startSteps.map((step) => (
              <li
                key={step.index}
                className="group relative border-b border-line py-7 last:border-b-0 md:border-r md:border-b-0 md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <span
                  className="absolute top-0 left-0 h-0.5 w-0 bg-accent transition-[width] duration-300 group-hover:w-12 md:left-8 md:first:left-0"
                  aria-hidden
                />
                <span className="font-mono text-xs tracking-[0.16em] text-ink-muted uppercase">
                  {step.index}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted sm:text-base">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* File map */}
      <section
        className="relative z-10 border-t border-line bg-paper px-4 py-14 sm:px-8 sm:py-16 lg:px-14 lg:py-20"
        aria-labelledby="map-heading"
      >
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[11px] tracking-[0.2em] text-ink-muted uppercase">
              Extend
            </p>
            <h2
              id="map-heading"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            >
              Where things live
            </h2>
            <p className="mt-3 max-w-sm text-base leading-relaxed text-ink-muted">
              A few folders, intentional defaults. Theme tokens live in CSS
              variables. Use the studio toggle for light, dark, and system.
            </p>
          </div>

          <ul className="mt-10 divide-y divide-line border-t border-b border-line lg:col-span-8 lg:mt-0">
            {fileMap.map((item) => (
              <li
                key={item.path}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6 sm:py-5"
              >
                <code className="shrink-0 font-mono text-sm font-medium text-ink sm:w-56 lg:w-64">
                  {item.path}
                </code>
                <span className="text-sm leading-relaxed text-ink-muted sm:text-base">
                  {item.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Included */}
      <section
        className="relative z-10 border-t border-line bg-accent-soft/60 px-4 py-12 sm:px-8 lg:px-14"
        aria-labelledby="included-heading"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            id="included-heading"
            className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl"
          >
            What&apos;s included
          </h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {included.map((item) => (
              <li key={item.label} className="min-w-0">
                <p className="font-mono text-[11px] tracking-[0.14em] text-ink-muted uppercase">
                  {item.label}
                </p>
                <p className="mt-2 font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
                  {item.value}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Terminal band */}
      <section
        className="relative z-10 border-t border-line bg-terminal px-4 py-14 text-studio-fg sm:px-8 sm:py-16 lg:px-14 lg:py-20"
        aria-labelledby="stack-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, white 14%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, white 14%, transparent) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 65% 55% at 75% 50%, #000 15%, transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-0 left-0 h-full w-1 bg-accent"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
              Next steps
            </p>
            <h2
              id="stack-heading"
              className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Swap this page for yours
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-studio-muted sm:text-base">
              Update site config, replace this landing with your product, add
              routes under{" "}
              <code className="font-mono text-[0.9em] text-studio-fg">
                src/app/
              </code>
              . Optional:{" "}
              <code className="font-mono text-[0.9em] text-studio-fg">
                bun run ui
              </code>{" "}
              for shadcn components.
            </p>
          </div>

          <pre className="mt-10 overflow-x-auto border border-white/20 bg-black/50 p-4 font-mono text-xs leading-relaxed text-studio-fg/90 sm:p-6 sm:text-sm lg:col-span-7 lg:mt-0">
            <code>
              <span className="text-studio-muted"># start</span>
              {"\n"}
              bun install
              {"\n"}
              bun dev
              {"\n\n"}
              <span className="text-studio-muted"># customize</span>
              {"\n"}
              src/config/site.ts · src/styles/globals.css · src/app/page.tsx
              {"\n\n"}
              <span className="text-studio-muted"># already on</span>
              {"\n"}
              app router · cache components · react compiler
              {"\n"}
              seo · pwa manifest · error / loading / not-found
              {"\n"}
              light · dark · system theme persistence
              {"\n\n"}
              <span className="text-accent">$</span>{" "}
              <span className="text-studio-fg/80">
                bunx create-next-app -e &quot;…/nextjs-template&quot;
              </span>
              <span
                className="motion-caret ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 bg-accent align-middle"
                aria-hidden
              />
            </code>
          </pre>
        </div>
      </section>

      <footer className="relative z-10 border-t border-line bg-paper px-4 py-8 sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-muted">
            Built with Next.js 16, TypeScript, and Tailwind CSS
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
            <Copyright className="size-3.5 shrink-0" aria-hidden />
            <span>2026</span>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-transparent text-ink transition-colors hover:border-accent hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {siteConfig.links.githubDisplay}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
