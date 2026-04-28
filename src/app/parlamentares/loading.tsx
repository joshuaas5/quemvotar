export default function ParlamentaresLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16 border-b-4 border-black bg-[#f5f6f7] animate-pulse" />
      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse">
            <div className="h-10 md:h-14 bg-gray-200 border-2 border-black w-2/3 mb-4" />
            <div className="h-4 md:h-6 bg-gray-200 border-2 border-black w-1/2" />
          </div>

          <div className="bg-white border-4 border-black p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 md:gap-4 animate-pulse">
            <div className="h-12 border-2 border-black bg-gray-200" />
            <div className="h-12 border-2 border-black bg-gray-200" />
            <div className="h-12 border-2 border-black bg-gray-200" />
            <div className="h-12 border-2 border-black bg-gray-200" />
            <div className="h-12 border-2 border-black bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col animate-pulse">
                <div className="aspect-square border-b-4 border-black bg-gray-200" />
                <div className="p-5 md:p-6 space-y-3">
                  <div className="h-3 bg-gray-200 border-2 border-black w-1/4" />
                  <div className="h-8 bg-gray-200 border-2 border-black w-3/4" />
                  <div className="h-4 bg-gray-200 border-2 border-black w-1/2" />
                  <div className="h-4 bg-gray-200 border-2 border-black w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="h-32 border-t-4 border-black bg-[#f5f6f7] animate-pulse" />
    </div>
  );
}
