import Image from "next/image";

import { Check, Code, Copyright, Github, Package } from "lucide-react";

import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

import { CopyCommandButton } from "./client-components";

export const metadata: Metadata = {
  title: "Home",
  description:
    "A modern Next.js 16 starter template with TypeScript, Tailwind CSS v4, ESLint 9, Prettier, and Husky. Clone and start building.",
  openGraph: {
    title: "Next.js Starter Template",
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

export default function App() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="relative flex h-dvh max-h-dvh flex-col items-center justify-between overflow-hidden bg-linear-to-b from-zinc-900 to-black px-4 pt-8 pb-4 sm:pt-12 sm:pb-6 md:pt-16">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(55,65,81,0.15),transparent_65%)]"
        aria-hidden
      />
      <div
        className="absolute top-1/3 left-1/4 size-96 rounded-full bg-purple-600/10 blur-3xl motion-safe:animate-pulse"
        aria-hidden
      />
      <div
        className="absolute top-2/3 right-1/4 size-96 rounded-full bg-cyan-600/10 blur-3xl motion-safe:animate-pulse"
        aria-hidden
      />

      <header className="relative z-10 container mx-auto mb-4 max-w-4xl shrink-0 text-center sm:mb-6">
        <div className="mb-2 flex items-center justify-center gap-2 sm:mb-3">
          <div className="relative size-12 transition-all duration-700 hover:scale-110 sm:size-14 md:size-16">
            <Image
              src="/nextjs-light.svg"
              alt="Next.js"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <h1 className="mb-1 bg-linear-to-br from-cyan-400 via-blue-300 to-purple-500 bg-clip-text pb-2 text-4xl font-extrabold text-transparent sm:mb-2 sm:pb-3 sm:text-5xl md:text-6xl">
          {siteConfig.name}
        </h1>
        <div className="relative mx-auto mb-3 h-0.5 w-20 overflow-hidden rounded-full bg-linear-to-r from-cyan-400 to-purple-500 sm:mb-4 sm:h-1 sm:w-24">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base md:text-lg">
          {siteConfig.description}
        </p>
      </header>

      <div className="relative z-10 mb-4 flex min-h-0 flex-1 flex-col items-center justify-center gap-4 py-2 sm:mb-6 sm:gap-6 sm:py-4 md:gap-8">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<Code className="size-5" />}
            title="Modern Stack"
            description={
              <>
                Powered by <Span>Next.js 16</Span>, <Span>TypeScript</Span>, and{" "}
                <Span>Tailwind CSS v4</Span>
              </>
            }
          />
          <FeatureCard
            icon={<Package className="size-5" />}
            title="Pre-configured"
            description={
              <>
                Ready with <Span>ESLint 9</Span>, <Span>Prettier</Span>, and{" "}
                <Span>Husky</Span>
              </>
            }
          />
          <FeatureCard
            icon={<Check className="size-5" />}
            title="Production Ready"
            description="Start building right away with best practices built-in"
          />
        </div>

        <div className="w-full space-y-3 sm:space-y-4">
          <h2 className="bg-linear-to-br from-cyan-400 via-blue-300 to-purple-500 bg-clip-text text-center text-xl font-bold text-transparent sm:text-2xl">
            Get Started Now
          </h2>

          <div className="flex flex-col items-center gap-2 sm:gap-3 lg:flex-row lg:justify-center">
            <a
              href={siteConfig.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-auto items-center justify-center gap-2 overflow-hidden rounded-xl border border-sky-500 bg-linear-to-br from-violet-600 via-blue-600 to-blue-500 p-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 active:scale-95"
            >
              <span
                className="absolute inset-0 -z-10 translate-y-full bg-linear-to-t from-violet-800 to-blue-700 opacity-0 transition-opacity duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                aria-hidden
              />
              <Github className="size-5 shrink-0" aria-hidden />
              <span className="whitespace-nowrap">View on GitHub</span>
            </a>

            <CopyCommandButton />
          </div>
        </div>
      </div>

      <footer className="relative z-10 mt-auto w-full shrink-0 border-t border-zinc-800/50 pt-5 pb-4 sm:pt-6 sm:pb-5">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-2 py-2 sm:gap-4 sm:px-4 md:flex-row">
          <p className="text-sm text-zinc-500">
            Made with Next.js 16, TypeScript, and Tailwind CSS
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Copyright className="size-3.5" />
            <span>{currentYear}</span>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-transparent text-cyan-400 transition-colors hover:border-cyan-400 focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            >
              {siteConfig.links.githubDisplay}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

const Span = ({ children }: { children: React.ReactNode }) => (
  <span className="font-medium text-cyan-400">{children}</span>
);

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}) => (
  <article className="group flex flex-col items-center justify-start gap-2 rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800/50 hover:shadow-lg hover:shadow-cyan-500/5 sm:gap-3 sm:p-5">
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-500/20 to-purple-500/20 text-cyan-400 transition-transform duration-300 group-hover:scale-110 sm:size-12">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white sm:text-xl">{title}</h3>
    <p className="text-xs leading-relaxed text-zinc-400 sm:text-sm">
      {description}
    </p>
  </article>
);
