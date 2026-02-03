export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div
      className="fixed right-2 bottom-2 z-50 font-mono text-[10px] font-medium text-zinc-500"
      aria-hidden
    >
      <span className="rounded-md border border-zinc-700/60 bg-zinc-900/90 px-2 py-1 backdrop-blur-sm sm:hidden">
        xs
      </span>
      <span className="hidden rounded-md border border-zinc-700/60 bg-zinc-900/90 px-2 py-1 backdrop-blur-sm sm:inline-block md:hidden">
        sm
      </span>
      <span className="hidden rounded-md border border-zinc-700/60 bg-zinc-900/90 px-2 py-1 backdrop-blur-sm md:inline-block lg:hidden">
        md
      </span>
      <span className="hidden rounded-md border border-zinc-700/60 bg-zinc-900/90 px-2 py-1 backdrop-blur-sm lg:inline-block xl:hidden">
        lg
      </span>
      <span className="indicator-only-xl rounded-md border border-zinc-700/60 bg-zinc-900/90 px-2 py-1 backdrop-blur-sm">
        xl
      </span>
      <span className="hidden rounded-md border border-zinc-700/60 bg-zinc-900/90 px-2 py-1 backdrop-blur-sm 2xl:inline-block">
        2xl
      </span>
    </div>
  );
}
