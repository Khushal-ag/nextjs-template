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
