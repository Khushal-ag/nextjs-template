"use client";

import { useEffect, useState } from "react";

import { Check, Copy } from "lucide-react";

import { siteConfig } from "@/config/site";

export function CopyCommandButton() {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const copyToClipboard = async () => {
    const text = `bunx create-next-app -e "${siteConfig.links.templateRepo}" <project-name>`;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      aria-label={isCopied ? "Copied" : "Copy create-next-app command"}
      className="group relative w-full max-w-full min-w-0 cursor-pointer overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/50 px-4 py-3 text-left font-mono text-base backdrop-blur-sm transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-800 hover:shadow-lg hover:shadow-cyan-500/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 active:scale-[0.99]"
    >
      <span className="flex items-center gap-3">
        <span className="shrink-0 text-lg text-amber-500" aria-hidden>
          $
        </span>
        <code className="min-w-0 flex-1 text-xs wrap-break-word text-zinc-100 sm:text-sm">
          bunx create-next-app -e &quot;{siteConfig.links.templateRepo}&quot;{" "}
          <span className="text-zinc-500">{"<project-name>"}</span>
        </code>
        <span className="flex shrink-0 items-center transition-transform duration-300 group-active:scale-90">
          {isCopied ?
            <Check className="size-5 text-emerald-400" aria-hidden />
          : <Copy className="size-5 text-zinc-400" aria-hidden />}
        </span>
      </span>
    </button>
  );
}
