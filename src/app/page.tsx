"use client";

import { useState } from "react";
import Image from "next/image";
import { Clipboard, ClipboardCheck, Copyright, Github } from "lucide-react";

export default function App() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    const text = "pnpx degit Khushal-ag/nextjs-template <project-name>";

    try {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <>
      <main className="grid min-h-screen grid-cols-1  place-content-around  bg-zinc-900">
        <header className="container mx-auto h-auto text-center">
          <h1 className="bg-gradient-to-b from-cyan-400 to-purple-400 bg-clip-text text-4xl font-bold tracking-wider text-transparent md:text-6xl">
            Nextjs Starter Template
          </h1>
        </header>
        <div className="flex items-center justify-center">
          <Image src="/nextjs-light.svg" alt="next" height={1500} width={150} />
        </div>
        <p className="px-4 text-center text-3xl tracking-wide text-amber-50">
          A Nextjs template with <Span>React18</Span>, <Span>TypeScript</Span>,{" "}
          <Span>TailwindCSS</Span>, <Span>Lucide Icons</Span> pre-configured
          with <Span>ESLint</Span> and <Span>Prettier</Span>.
        </p>
        <section className="flex items-center gap-4 justify-self-center p-4 text-cyan-50 lg:flex-row">
          <div className="rounded-xl border border-sky-500 bg-gradient-to-br from-violet-600 via-blue-600 to-blue-500 px-4 py-3 text-lg font-semibold hover:from-violet-600 hover:to-blue-700 hover:shadow-md hover:shadow-blue-600 active:ring-2 active:ring-blue-600 active:ring-offset-2 active:ring-offset-black/90">
            <a
              href="https://github.com/Khushal-ag/nextjs-template"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2"
            >
              <Github className="mr-1 h-5 w-5 text-stone-900" />
              Visit on Github
            </a>
          </div>

          <div className="group rounded-2xl border border-zinc-700 p-1 font-mono font-semibold hover:border-zinc-600">
            <p
              onClick={copyToClipboard}
              className="flex cursor-pointer items-center gap-1 rounded-xl bg-zinc-800 px-4 py-3 hover:bg-zinc-700/25"
            >
              <span className="mr-2 text-orange-500">$</span>

              <span>pnpx</span>

              <span className="line-clamp-1">
                degit Khushal-ag/nextjs-template {"<project-name>"}
              </span>

              <span className="ml-2 text-gray-400 transition-colors duration-300 group-hover:text-white">
                {isCopied ? (
                  <ClipboardCheck className="h-5 w-5" />
                ) : (
                  <Clipboard className="h-5 w-5" />
                )}
              </span>
            </p>
          </div>
        </section>
        <footer className="container mt-10 grid place-items-center justify-self-center text-white ">
          <span className="flex items-center gap-1">
            <Copyright className="h-4 w-4" />
            <span>{new Date().getFullYear()}</span>
            <a
              href="https://github.com/Khushal-ag"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-200 hover:text-cyan-400"
            >
              Khushal-ag@github
            </a>
          </span>
        </footer>
      </main>
    </>
  );
}

const Span = ({ children }: { children: React.ReactNode }) => (
  <span className="text-cyan-200">{children}</span>
);
