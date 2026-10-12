export default function Loading() {
  return (
    <main className="relative flex min-h-dvh flex-col justify-center bg-paper px-6 text-ink sm:px-10">
      <div
        className="bg-studio pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-0 right-[18%] h-full w-1.5 bg-accent/40"
        aria-hidden
      />
      <div className="relative z-10 mx-auto w-full max-w-lg">
        <div
          className="h-1 w-14 bg-accent motion-safe:animate-pulse"
          aria-hidden
        />
        <div
          className="mt-6 h-10 w-3/4 max-w-sm bg-line motion-safe:animate-pulse"
          aria-hidden
        />
        <div
          className="mt-4 h-4 w-full max-w-md bg-line/70 motion-safe:animate-pulse"
          aria-hidden
        />
        <p className="sr-only">Loading</p>
      </div>
    </main>
  );
}
