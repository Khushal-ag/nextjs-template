import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-paper px-6 text-center text-ink">
      <p className="font-mono text-sm text-ink-muted">404</p>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="max-w-sm text-sm text-ink-muted">
        The page you requested does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-2 border-b border-accent text-sm font-semibold text-ink underline-offset-4 hover:bg-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        Back to home
      </Link>
    </main>
  );
}
