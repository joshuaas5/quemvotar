import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { PARTIDOS_ESPECTRO } from '@/lib/candidatos/posicionamento';

export const revalidate = 86400;

const CAMADAS = [
  {
    emoji: '🔎',
    titulo: '1ª camada — Análise QuemVotar',
    base: 'analise-curada',
    texto:
      'Leitura direta do plano de governo registrado no TSE e do histórico público do candidato, feita pela redação do QuemVotar. Cada análise registra a data em que foi produzida e os temas identificados. É a camada mais informada e tem prioridade sobre as demais.',
    exemplo: 'Exemplo: Lula (PT) — plano lido na íntegra em 18/08/2026 → Esquerda (confiança alta).',
  },
  {
    emoji: '📄',
    titulo: '2ª camada — Análise automática do plano de governo',
    base: 'plano-de-governo',
    texto:
      'Para cargos do Executivo sem análise manual, o texto do plano é avaliado por um motor determinístico de palavras-chave em 6 dimensões: economia e papel do Estado, trabalho, costumes e direitos civis, segurança pública, meio ambiente e participação social. Cada dimensão soma marcações de esquerda e de direita e o saldo define o eixo. O método é auditável e o resultado mostra as marcações encontradas.',
    exemplo: 'Exemplo: plano com "privatização", "corte de gastos" e "menos impostos" puxa para a direita.',
  },
  {
    emoji: '🏛️',
    titulo: '3ª camada — Posição do partido (fallback)',
    base: 'partido',
    texto:
      'Candidatos do Legislativo não têm plano de governo obrigatório (Lei 9.504/97). Quando não há plano nem análise manual, o eixo é estimado pelo posicionamento público do partido (estatuto, programa e comportamento parlamentar consolidado). Nesses casos a interface exibe o selo "Base: posição do partido" e o aviso de que candidatos do mesmo partido podem ter posições próprias.',
    exemplo: 'Exemplo: candidato do PL sem plano → Direita (selo "posição do partido").',
  },
];

export default function MetodologiaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-3xl md:text-5xl uppercase mb-4">Como classificamos os candidatos</h1>
            <p className="font-body font-bold text-sm md:text-lg uppercase opacity-80">
              Transparência total: toda estimativa de posicionamento mostra a base usada, a justificativa e a data.
            </p>
          </section>

          <section className="space-y-6">
            {CAMADAS.map((camada) => (
              <article key={camada.base} className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-3xl">{camada.emoji}</span>
                  <h2 className="font-headline font-black text-xl md:text-2xl uppercase">{camada.titulo}</h2>
                </div>
                <p className="font-body font-medium text-sm md:text-base leading-relaxed">{camada.texto}</p>
                <p className="font-label font-bold uppercase text-xs bg-surface-container-high border-2 border-black px-3 py-1.5 inline-block">
                  {camada.exemplo}
                </p>
              </article>
            ))}
          </section>

          <section className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h2 className="font-headline font-black text-xl md:text-2xl uppercase">⚠️ Limites honestos</h2>
            <ul className="space-y-3 font-body font-medium text-sm md:text-base">
              <li>• O eixo esquerda–direita é uma <strong>simplificação</strong>: duas pessoas no mesmo eixo podem discordar em quase tudo.</li>
              <li>• Plano de governo é documento de campanha: promessas, não garantias.</li>
              <li>• Candidato do mesmo partido pode ter posição diferente da média do partido.</li>
              <li>• Situação judicial do registro (ficha limpa etc.) é <strong>dado do TSE</strong>, não opinião nossa — e "aguardando julgamento" não é condenação.</li>
              <li>• Estimativas nunca são apresentadas como fato; a base e a confiança ficam visíveis no card e no perfil.</li>
            </ul>
          </section>

          <section className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h2 className="font-headline font-black text-xl md:text-2xl uppercase">🗂️ Fontes de dados</h2>
            <ul className="space-y-2 font-body font-medium text-sm md:text-base">
              <li>
                • Registros, fotos, bens, planos de governo:{' '}
                <a className="font-bold underline" href="https://divulgacandcontas.tse.jus.br/" target="_blank" rel="noreferrer">
                  TSE — DivulgaCandContas (API oficial)
                </a>
              </li>
              <li>
                • Posicionamento dos partidos: estatutos e programas partidários registrados no TSE, comportamento parlamentar consolidado (Ranking dos Políticos, Radar do Congresso) e manifestações públicas oficiais.
              </li>
              <li>• Análises curadas: leitura integral dos planos de governo pela redação do QuemVotar, com data estampada.</li>
            </ul>
          </section>

          <section className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h2 className="font-headline font-black text-xl md:text-2xl uppercase">🏛️ Partidos mapeados ({Object.keys(PARTIDOS_ESPECTRO).length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {Object.entries(PARTIDOS_ESPECTRO).map(([sigla, meta]) => (
                <div key={sigla} className="border-2 border-black bg-surface-container px-2 py-1.5" title={meta.resumo}>
                  <p className="font-headline font-black uppercase text-sm">{sigla}</p>
                  <p className="font-label font-bold uppercase text-[10px] opacity-60">{meta.familia}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <Link href="/candidatos" className="inline-block bg-primary-container border-4 border-black px-6 py-3 font-headline font-black uppercase">
              ← Voltar para Candidatos 2026
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
