export default function PartidosLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16 border-b-4 border-black bg-[#f5f6f7] animate-pulse" />
      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse">
            <div className="h-10 md:h-14 bg-gray-200 border-2 border-black w-1/2 mb-4" />
            <div className="h-4 md:h-6 bg-gray-200 border-2 border-black w-2/3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 border-2 border-black bg-gray-200" />
                  <div className="space-y-1 flex-1">
                    <div className="h-5 bg-gray-200 border-2 border-black w-20" />
                    <div className="h-3 bg-gray-200 border-2 border-black w-32" />
                  </div>
                </div>
                <div className="h-4 bg-gray-200 border-2 border-black w-24 mb-2" />
                <div className="h-3 bg-gray-200 border-2 border-black w-full" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="h-32 border-t-4 border-black bg-[#f5f6f7] animate-pulse" />
    </div>
  );
}
