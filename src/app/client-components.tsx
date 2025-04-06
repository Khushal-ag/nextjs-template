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

  const copyToClipboard = () => {
    const text =
      'bunx create-next-app -e "https://github.com/Khushal-ag/nextjs-template" <project-name>';
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  return (
    <div
      onClick={copyToClipboard}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/50 px-6 py-3 font-mono text-base backdrop-blur-sm transition-all duration-300 hover:border-zinc-500 hover:bg-zinc-800 hover:shadow-lg hover:shadow-cyan-500/5 w-auto max-w-full"
    >
      <div className="flex items-center gap-3">
        <span className="text-orange-500 text-lg">$</span>
        <code className="whitespace-pre-wrap break-words text-zinc-100">
          bunx create-next-app -e
          "https://github.com/Khushal-ag/nextjs-template" {"<project-name>"}
        </code>
        <span
          className={`flex-shrink-0 flex items-center transition-all duration-300`}
        >
          {isCopied ? (
            <Check className="text-green-400 animate-pulse" />
          ) : (
            <Copy className="text-zinc-50 transform transition-transform active:scale-90" />
          )}
        </span>
      </div>
    </div>
  );
}
