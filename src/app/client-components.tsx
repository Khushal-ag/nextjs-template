"use client";

import { useEffect, useState } from "react";

import { Check, Copy } from "lucide-react";

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
    const text =
      'bunx create-next-app -e "https://github.com/Khushal-ag/nextjs-template" <project-name>';
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      onClick={copyToClipboard}
      className="group relative w-auto max-w-full cursor-pointer overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/50 px-6 py-3 font-mono text-base backdrop-blur-sm transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-800 hover:shadow-lg hover:shadow-cyan-500/5"
    >
      <div className="flex items-center gap-3">
        <span className="text-lg text-orange-500">$</span>
        <code className="whitespace-pre-wrap break-words text-zinc-100">
          bunx create-next-app -e
          &quot;https://github.com/Khushal-ag/nextjs-template&quot;{" "}
          {"<project-name>"}
        </code>
        <span
          className={`flex shrink-0 items-center transition-all duration-300`}
        >
          {isCopied ?
            <Check className="animate-pulse text-green-400" />
          : <Copy className="text-zinc-50 transition-transform active:scale-90" />
          }
        </span>
      </div>
    </div>
  );
}
