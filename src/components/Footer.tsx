export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-8 bg-[#e0e3e4] border-t-4 border-black">
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="text-lg font-black text-black font-headline uppercase">QUEM VOTAR.</div>
        <p className="font-body font-bold uppercase text-sm text-black max-w-md text-center md:text-left">
          © {new Date().getFullYear()} QUEM VOTAR. PRODUTO INDEPENDENTE. DADOS EXIBIDOS:
          CAMARA DOS DEPUTADOS E SENADO FEDERAL.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 font-body font-bold uppercase text-sm">
        <a href="#busca" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Busca
        </a>
        <a href="#dados" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Dados
        </a>
        <a href="#metodologia" className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer">
          Metodologia
        </a>
        <a
          href="https://dadosabertos.camara.leg.br/api/v2/deputados"
          target="_blank"
          rel="noreferrer"
          className="text-black no-underline hover:text-[#ffd709] transition-colors duration-75 cursor-pointer"
        >
          API Camara
        </a>
      </div>

      <div className="flex gap-4 max-w-xs text-center md:text-right">
        <p className="font-body font-bold uppercase text-xs text-black">
          Dados judiciais e match continuam fora do ar ate haver fonte oficial auditada.
        </p>
      </div>
    </footer>
  );
}
