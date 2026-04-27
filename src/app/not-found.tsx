import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f6f7] flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black p-8 sm:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full text-center">
        <span className="material-symbols-outlined text-6xl sm:text-8xl mb-4 block">search_off</span>
        <h1 className="font-headline font-black text-4xl sm:text-6xl uppercase mb-2">404</h1>
        <h2 className="font-headline font-black text-xl sm:text-2xl uppercase mb-4 opacity-70">
          Pagina nao encontrada
        </h2>
        <p className="font-body font-bold text-base sm:text-lg opacity-80 mb-6">
          A pagina que voce procura nao existe ou foi movida. Verifique o endereco ou use a busca.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/busca"
            className="bg-black text-white font-headline font-black px-6 py-3 uppercase border-4 border-black hover:bg-white hover:text-black transition-colors"
          >
            Buscar parlamentares
          </Link>
          <Link
            href="/"
            className="bg-white text-black font-headline font-black px-6 py-3 uppercase border-4 border-black hover:bg-black hover:text-white transition-colors"
          >
            Voltar ao inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
