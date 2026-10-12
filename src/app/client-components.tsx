"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { Check, Copy, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

const HERO_PARTICLES = ["a", "b", "c", "d", "e", "f"] as const;
const STUDIO_PARTICLES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

/**
 * Continuous premium atmosphere: soft mesh drift, few floating particles,
 * optional studio cursor glow. CSS drives motion; this only mounts layers
 * and tracks pointer on the parent plane (never blocks UI).
 */
export function ShowcaseAtmosphere({
  variant = "hero",
  className,
}: {
  variant?: "hero" | "studio";
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [glowActive, setGlowActive] = useState(false);

  useEffect(() => {
    if (reducedMotion || variant !== "studio") return;

    const root = rootRef.current;
    const plane = root?.parentElement;
    if (!plane) return;

    const onPointerMove = (event: PointerEvent) => {
      const glow = glowRef.current;
      if (!glow) return;

      const rect = plane.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
      });
      setGlowActive(true);
    };

    const onPointerLeave = () => setGlowActive(false);

    plane.addEventListener("pointermove", onPointerMove, { passive: true });
    plane.addEventListener("pointerleave", onPointerLeave);

    return () => {
      plane.removeEventListener("pointermove", onPointerMove);
      plane.removeEventListener("pointerleave", onPointerLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, variant]);

  const particles = variant === "studio" ? STUDIO_PARTICLES : HERO_PARTICLES;

  return (
    <div ref={rootRef} className={cn("fx-atmosphere", className)} aria-hidden>
      <div className="fx-mesh-drift" />
      {variant === "studio" ?
        <>
          <div className="fx-studio-shimmer" />
          {!reducedMotion ?
            <div
              ref={glowRef}
              className={cn("fx-cursor-glow", glowActive && "is-active")}
            />
          : null}
        </>
      : null}
      {!reducedMotion ?
        particles.map((id) => (
          <span
            key={`${variant}-${id}`}
            className={cn(
              "fx-particle",
              `fx-particle--${id}`,
              variant === "studio" && "fx-particle--studio",
            )}
          />
        ))
      : null}
    </div>
  );
}

export function CopyCommandButton() {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const copyToClipboard = async () => {
    const text = `bunx create-next-app -e "${siteConfig.links.templateRepo}" <project-name>`;
    try {
      await navigator.clipboard.writeText(text);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      setIsCopied(true);
      resetTimerRef.current = setTimeout(() => {
        setIsCopied(false);
        resetTimerRef.current = null;
      }, 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      aria-label={isCopied ? "Copied" : "Copy create-next-app command"}
      className={cn(
        "group relative min-h-12 w-full max-w-full min-w-0 cursor-pointer overflow-hidden border bg-paper-elevated px-3 py-3 text-left font-mono text-base transition-[border-color,background-color,transform,box-shadow] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.99] sm:min-w-0 sm:flex-1 sm:px-4 sm:py-3.5",
        isCopied ?
          "border-accent bg-accent-soft/40 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--accent)_35%,transparent)]"
        : "border-line hover:border-ink/40",
      )}
    >
      <span className="flex items-center gap-2.5 sm:gap-3">
        <span className="shrink-0 text-lg font-medium text-accent" aria-hidden>
          $
        </span>
        <code className="min-w-0 flex-1 text-[0.7rem] leading-snug wrap-break-word text-ink sm:text-sm sm:leading-relaxed">
          bunx create-next-app -e &quot;{siteConfig.links.templateRepo}&quot;{" "}
          <span className="text-ink-muted">{"<project-name>"}</span>
        </code>
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center transition-[transform,color] duration-200 group-active:scale-90",
            isCopied && "scale-110",
          )}
        >
          {isCopied ?
            <Check className="size-5 text-accent" aria-hidden />
          : <Copy className="size-5 text-ink-muted" aria-hidden />}
        </span>
      </span>
    </button>
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

/** Live theme label for the studio panel (persisted via next-themes). */
export function ThemeModeLabel({ className }: { className?: string }) {
  const { theme, resolvedTheme } = useTheme();
  const isClient = useIsClient();
  const preference = (isClient ? theme : "system") as ThemeValue;
  const resolved = isClient ? (resolvedTheme ?? "light") : "...";
  const preferenceLabel =
    themes.find((t) => t.value === preference)?.label ?? "System";

  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] tracking-[0.12em] text-studio-muted uppercase",
        className,
      )}
    >
      <span className="motion-mark size-1.5 shrink-0 bg-accent" aria-hidden />
      <span>
        Theme · {preferenceLabel}
        {preference === "system" ?
          <span className="text-studio-fg/70"> ({resolved})</span>
        : null}
        <span className="text-studio-fg/50"> · persists</span>
      </span>
    </p>
  );
}
