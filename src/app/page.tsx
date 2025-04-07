import Image from "next/image";

import { Check, Code, Copyright, Github, Package } from "lucide-react";

import { CopyCommandButton } from "./client-components";

export default function App() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-zinc-900 to-black px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(55,65,81,0.15),transparent_65%)]"></div>
      <div className="absolute left-1/4 top-1/3 size-96 animate-pulse rounded-full bg-purple-600/10 blur-3xl"></div>
      <div className="absolute right-1/4 top-2/3 size-96 animate-pulse rounded-full bg-cyan-600/10 blur-3xl"></div>

      <header className="container relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="relative size-16 transition-all duration-700 hover:scale-110 md:size-20">
            <Image
              src="/nextjs-light.svg"
              alt="Next.js"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <h1 className="mb-2 bg-gradient-to-br from-cyan-400 via-blue-300 to-purple-500 bg-clip-text pb-3 text-5xl font-extrabold text-transparent md:text-7xl">
          Next.js Starter
        </h1>
        <div className="relative mx-auto mb-6 h-1 w-24 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-purple-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-zinc-300">
          A modern, feature-packed Next.js template to jumpstart your project.
        </p>
      </header>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center gap-16 py-16">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<Code className="size-5" />}
            title="Modern Stack"
            description={
              <>
                Powered by <Span>Next15</Span>, <Span>TypeScript</Span>, and{" "}
                <Span>TailwindCSS</Span>
              </>
            }
          />
          <FeatureCard
            icon={<Package className="size-5" />}
            title="Pre-configured"
            description={
              <>
                Ready with <Span>ESLint</Span>, <Span>Prettier</Span>, and{" "}
                <Span>Lucide Icons</Span>
              </>
            }
          />
          <FeatureCard
            icon={<Check className="size-5" />}
            title="Production Ready"
            description="Start building right away with best practices built-in"
          />
        </div>

        <div className="w-full space-y-6">
          <h2 className="bg-gradient-to-br from-cyan-400 via-blue-300 to-purple-500 bg-clip-text text-center text-2xl font-bold text-transparent">
            Get Started Now
          </h2>

          <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-center">
            <a
              href="https://github.com/Khushal-ag/nextjs-template"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex w-auto items-center justify-center gap-2 overflow-hidden rounded-xl border border-sky-500 bg-gradient-to-br from-violet-600 via-blue-600 to-blue-500 p-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95"
            >
              <span className="absolute inset-0 -z-10 translate-y-full bg-gradient-to-t from-violet-800 to-blue-700 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"></span>
              <Github className="size-5" />
              <span className="whitespace-nowrap">View On GitHub</span>
            </a>

            <CopyCommandButton />
          </div>
        </div>
      </div>

      <footer className="relative z-10 mt-auto w-full border-t border-zinc-800/50 pt-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 p-4 md:flex-row">
          <p className="text-sm text-zinc-500">
            Made with Next.js, TypeScript and TailwindCSS
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Copyright className="size-3.5" />
            <span>{currentYear}</span>
            <a
              href="https://github.com/Khushal-ag"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-transparent text-cyan-400 transition-colors hover:border-cyan-400"
            >
              Khushal-ag@github
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
  <div className="group flex flex-col items-center gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800/50 hover:shadow-lg hover:shadow-cyan-500/5">
    <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-400 transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white">{title}</h3>
    <p className="text-zinc-300">{description}</p>
  </div>
);
