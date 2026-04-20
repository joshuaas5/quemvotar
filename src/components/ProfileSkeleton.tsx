export function CardSkeleton({ count = 5 }: { count?: number }) {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <article
          key={i}
          className="bg-white/60 border-4 border-black/20 p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] animate-pulse"
        >
          <div className="h-3 w-16 bg-black/10 rounded mb-3" />
          <div className="h-8 w-20 bg-black/15 rounded mb-3" />
          <div className="h-4 w-full bg-black/10 rounded" />
        </article>
      ))}
    </section>
  );
}

export function SectionSkeleton({ rows = 2 }: { rows?: number }) {
  return (
    <section className="space-y-6 animate-pulse">
      <div>
        <div className="h-8 w-64 bg-black/15 rounded mb-3" />
        <div className="h-4 w-80 bg-black/10 rounded" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: rows }).map((_, i) => (
          <article
            key={i}
            className="bg-white/60 border-4 border-black/20 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
          >
            <div className="h-3 w-24 bg-black/10 rounded mb-3" />
            <div className="h-6 w-48 bg-black/15 rounded mb-4" />
            <div className="h-4 w-full bg-black/10 rounded mb-2" />
            <div className="h-4 w-3/4 bg-black/10 rounded" />
          </article>
        ))}
      </div>
    </section>
  );
}

export function ThemeSkeleton() {
  return (
    <section className="space-y-6 animate-pulse">
      <div>
        <div className="h-8 w-72 bg-black/15 rounded mb-3" />
        <div className="h-4 w-96 bg-black/10 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <article
            key={i}
            className="border-4 border-black/20 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
            style={{ backgroundColor: ['#fef3c7', '#d1fae5', '#dbeafe', '#fee2e2'][i] + '40' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-black/10 rounded-full" />
              <div className="h-6 w-28 bg-black/15 rounded" />
            </div>
            <div className="h-4 w-full bg-black/10 rounded mb-2" />
            <div className="h-4 w-2/3 bg-black/10 rounded mb-4" />
            <div className="h-5 w-32 bg-black/10 rounded" />
          </article>
        ))}
      </div>
    </section>
  );
}

export function FullProfileSkeleton() {
  return (
    <div className="space-y-10">
      <CardSkeleton />
      <ThemeSkeleton />
      <SectionSkeleton />
      <SectionSkeleton />
      <SectionSkeleton rows={3} />
    </div>
  );
}
