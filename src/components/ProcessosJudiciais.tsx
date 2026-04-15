import React from 'react';
import type { CnjProcessoResumo } from '@/lib/official/types';

export function ProcessosJudiciais({ processos }: { processos?: CnjProcessoResumo[] }) {
  const isFichaLimpa = !processos || processos.length === 0;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-headline font-black text-4xl uppercase">Processos Judiciais</h2>
          <p className="font-body font-bold uppercase text-sm opacity-70 mt-2">
            Cruzamento com a base de dados pública do CNJ (DataJud)
          </p>
        </div>
        
        {isFichaLimpa ? (
          <div className="bg-green-300 border-4 border-black px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="font-headline font-black text-2xl uppercase text-green-900">
              FICHA LIMPA ✓
            </span>
          </div>
        ) : (
          <div className="bg-red-300 border-4 border-black px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="font-headline font-black text-2xl uppercase text-red-900">
              {processos.length} PROCESSO{processos.length > 1 ? 'S' : ''} DETECTADO{processos.length > 1 ? 'S' : ''} ⚠
            </span>
          </div>
        )}
      </div>

      {!isFichaLimpa && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {processos.map((proc, index) => (
            <article 
              key={index} 
              className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-secondary-fixed border-2 border-black font-bold text-xs uppercase px-2 py-1">
                  {proc.tribunal} - Grau: {proc.grau}
                </span>
                {proc.dataAjuizamento && (
                  <span className="font-label font-bold text-xs uppercase opacity-70">
                    Ajuizado em: {new Date(proc.dataAjuizamento).toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
              
              <h3 className="font-headline font-black text-xl uppercase leading-tight mb-2">
                Nº {proc.numeroProcesso}
              </h3>
              
              <div className="space-y-2 mb-4 flex-grow">
                <p className="font-body text-sm font-medium">
                  <span className="font-bold">Classe:</span> {proc.classe}
                </p>
                <p className="font-body text-sm font-medium">
                  <span className="font-bold">Assunto:</span> {proc.assuntoPrincipal || 'Não especificado na denúncia'}
                </p>
                <p className="font-body text-sm font-medium">
                  <span className="font-bold">Órgão Julgador:</span> {proc.orgaoJulgador}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t-4 border-black">
               <a 
                  href={proc.fonteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-headline font-black uppercase text-sm border-b-2 border-black hover:bg-black hover:text-white transition-colors"
                >
                  Ver Fonte Oficial (CNJ)
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
