export default function StatsDashboard() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="font-headline font-black text-5xl uppercase mb-16 text-center">PANORAMA NACIONAL</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
        
        {/* Main Panel */}
        <div className="md:col-span-2 md:row-span-2 bg-white border-4 border-black p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <div>
            <span className="material-symbols-outlined text-6xl text-tertiary mb-6">account_balance</span>
            <h3 className="font-headline font-black text-5xl uppercase leading-none mb-4">2.431</h3>
            <p className="font-body font-bold text-lg uppercase">Candidatos com pendências judiciais graves ativos nesta eleição.</p>
          </div>
          <div className="bg-surface-container-high p-4 border-2 border-black">
            <p className="text-xs font-black uppercase mb-2">Distribuição por Gravidade</p>
            <div className="w-full bg-on-background h-8 flex">
              <div className="bg-tertiary h-full w-[60%] border-r-2 border-black"></div>
              <div className="bg-primary-container h-full w-[25%] border-r-2 border-black"></div>
              <div className="bg-white h-full w-[15%]"></div>
            </div>
          </div>
        </div>

        {/* Top Right Panel */}
        <div className="md:col-span-2 bg-on-background text-white p-8 shadow-[6px_6px_0px_0px_rgba(0,102,102,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,102,102,1)] transition-all duration-200">
          <div className="flex justify-between items-start">
            <h3 className="font-headline font-black text-3xl uppercase leading-none">TRANSPARÊNCIA <br/> DE GASTOS</h3>
            <span className="material-symbols-outlined text-4xl text-secondary-fixed">payments</span>
          </div>
          <div className="mt-8">
            <p className="font-body text-3xl font-black uppercase">R$ 4.9 BI</p>
            <p className="text-sm font-bold opacity-70 uppercase">Total de fundo partidário distribuído este ano.</p>
          </div>
        </div>

        {/* Bottom Small 1 */}
        <div className="bg-primary-container border-4 border-black p-6 flex flex-col justify-center text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <h3 className="font-headline font-black text-4xl uppercase">84%</h3>
          <p className="font-label font-bold text-xs uppercase">Aumento nas buscas por fichas limpas</p>
        </div>

        {/* Bottom Small 2 */}
        <div className="bg-secondary border-4 border-black p-6 flex flex-col justify-center text-center text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          <h3 className="font-headline font-black text-4xl uppercase">12.5M</h3>
          <p className="font-label font-bold text-xs uppercase">Consultas realizadas este mês</p>
        </div>

      </div>
    </section>
  );
}
