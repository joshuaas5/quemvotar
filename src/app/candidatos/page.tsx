import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { listarCandidatos } from '@/lib/candidatos/tse';
import { CARGO_CODIGOS, CARGO_LABELS, type CargoTse } from '@/lib/candidatos/types';
import { getPartidoEspectro } from '@/lib/candidatos/posicionamento';
import { BASE_BADGE, BASE_EMOJI, BarraEspectro, EIXO_TEXTO, iniciais } from '@/lib/candidatos/ui';
import { getPartyLogoBySigla } from '@/lib/party-logos';
import { UF_LISTA } from '@/lib/candidatos/ufs';
import { FotoCandidato } from '@/components/candidatos/FotoCandidato';
import { BuscaCandidatos } from '@/components/candidatos/BuscaCandidatos';
import { AvisoFonteTse } from '@/components/candidatos/AvisoFonteTse';

export const revalidate = 300;

const CARGOS_EXIBIDOS: Array<{ codigo: number; cargo: CargoTse }> = [
  { codigo: 1, cargo: 'presidente' },
  { codigo: 3, cargo: 'governador' },
  { codigo: 5, cargo: 'senador' },
  { codigo: 6, cargo: 'deputado-federal' },
  { codigo: 7, cargo: 'deputado-estadual' },
  { codigo: 8, cargo: 'deputado-distrital' },
];

export default async function CandidatosPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const ano = Number(params.ano ?? '2026') || 2026;
  const uf = (typeof params.uf === 'string' ? params.uf : 'BR').toUpperCase();
  const cargoParam = Number(params.cargo ?? '1');
  const cargoCodigo = CARGO_CODIGOS[cargoParam] ? cargoParam : 1;
  const partidoFiltro = (typeof params.partido === 'string' ? params.partido : '').toUpperCase();
  const eixoFiltro = typeof params.eixo === 'string' ? params.eixo : '';
  const busca = (typeof params.q === 'string' ? params.q : '').trim().toLowerCase();

  const resultado = await listarCandidatos(ano, uf, cargoCodigo).catch(() => null);

  const candidatos = resultado?.candidatos ?? [];
  const partidos = Array.from(new Set(candidatos.map((c) => c.partido).filter(Boolean) as string[])).sort();
  const eixos = Array.from(new Set(candidatos.map((c) => c.posicionamento.eixo).filter(Boolean) as string[])).sort();

  const filtrados = candidatos.filter((candidato) => {
    const matchesPartido = !partidoFiltro || candidato.partido === partidoFiltro;
    const matchesEixo = !eixoFiltro || candidato.posicionamento.eixo === eixoFiltro;
    const matchesBusca =
      !busca ||
      [candidato.nomeUrna, candidato.nomeCompleto, candidato.coligacao ?? '', candidato.partido ?? '']
        .join(' ')
        .toLowerCase()
        .includes(busca);
    return matchesPartido && matchesEixo && matchesBusca;
  });

  const porEixo = (eixo: string) => filtrados.filter((c) => c.posicionamento.eixo === eixo).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="font-headline font-black text-3xl md:text-5xl uppercase mb-3">Candidatos 2026</h1>
                <p className="font-body font-bold text-sm md:text-lg uppercase opacity-80">
                  Todos os registros de candidatura das Eleições Gerais de 2026 — direto da API oficial do TSE (DivulgaCandContas).
                </p>
              </div>
              <Link
                href="/candidatos/metodologia"
                className="font-headline font-black uppercase text-sm border-4 border-black px-4 py-2 bg-primary-container hover:bg-primary"
              >
                Como classificamos
              </Link>
            </div>
            <p className="font-label font-bold uppercase text-xs opacity-60 mt-4">
              Fonte: TSE — Divulgação de Candidaturas e Contas Eleitorais · Atualização a cada 60 min no TSE · Posicionamento estimado (ver metodologia)
            </p>
          </section>

          {/* Filtros */}
          <section className="bg-white border-4 border-black p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <p className="font-headline font-black uppercase text-sm">📍 Marque seu estado</p>
              <span className="font-label font-bold uppercase text-[10px] opacity-60">Candidatos por estado — clique para filtrar</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/candidatos?uf=BR&cargo=${cargoCodigo}`}
                className={`border-2 border-black px-3 py-1.5 font-headline font-black uppercase text-xs ${
                  uf === 'BR' ? 'bg-black text-white' : 'bg-white hover:bg-surface-container-high'
                }`}
              >
                BR
              </Link>
              {UF_LISTA.map((item) => (
                <Link
                  key={item.sigla}
                  href={`/candidatos?uf=${item.sigla}&cargo=${cargoCodigo}`}
                  className={`border-2 border-black px-3 py-1.5 font-headline font-black uppercase text-xs ${
                    uf === item.sigla ? 'bg-black text-white' : 'bg-white hover:bg-surface-container-high'
                  }`}
                  title={item.nome}
                >
                  {item.sigla}
                </Link>
              ))}
            </div>

          <form className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3 md:gap-4">
            <input
              type="text"
              name="q"
              defaultValue={busca}
              placeholder="Nome ou coligação"
              className="border-4 border-black px-4 py-3 font-headline font-bold uppercase"
            />

            <select name="uf" defaultValue={uf} className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white">
              <option value="BR">Brasil</option>
              {UF_LISTA.map((item) => (
                <option key={item.sigla} value={item.sigla}>{item.sigla} — {item.nome}</option>
              ))}
            </select>

            <select name="cargo" defaultValue={String(cargoCodigo)} className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white">
              {CARGOS_EXIBIDOS.map(({ codigo, cargo }) => (
                <option key={codigo} value={codigo}>{CARGO_LABELS[cargo]}</option>
              ))}
            </select>

            <select name="partido" defaultValue={partidoFiltro} className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white">
              <option value="">Todos os partidos</option>
              {partidos.map((sigla) => (
                <option key={sigla} value={sigla}>{sigla}</option>
              ))}
            </select>

            <select name="eixo" defaultValue={eixoFiltro} className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white">
              <option value="">Todos os eixos</option>
              {['esquerda', 'centro-esquerda', 'centro', 'centro-direita', 'direita'].map((eixo) => (
                <option key={eixo} value={eixo}>{eixo}</option>
              ))}
            </select>

            <button type="submit" className="bg-primary-container border-4 border-black px-6 py-3 font-headline font-black uppercase">
              Aplicar filtros
            </button>
          </form>
          </section>

          {/* Resumo */}
          <section className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-headline font-black text-xl md:text-2xl uppercase">
              {filtrados.length} candidatos encontrados
            </p>
            <div className="flex flex-wrap gap-3 font-label font-bold uppercase text-xs">
              {['esquerda', 'centro-esquerda', 'centro', 'centro-direita', 'direita'].map((eixo) => (
                <span key={eixo} className={`border-2 border-black px-2 py-1 ${EIXO_TEXTO[eixo as keyof typeof EIXO_TEXTO]} bg-white`}>
                  {eixo}: {porEixo(eixo)}
                </span>
              ))}
            </div>
          </section>

          {/* Resultados */}
          {busca ? (
            /* Busca GLOBAL ativa: pesquisa em todos os estados e cargos */
            <BuscaCandidatos inicial={busca} />
          ) : filtrados.length === 0 ? (
            <div className="bg-white border-4 border-black p-10 md:p-16 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-6xl mb-4 block">🗳️</span>
              <h2 className="font-headline font-black text-2xl md:text-3xl uppercase">Nenhum candidato encontrado</h2>
              <p className="font-body font-bold mt-2 uppercase opacity-70">
                O registro de candidaturas abriu em 15/08/2026 — novos candidatos entram diariamente.
              </p>
            </div>
          ) : (
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {filtrados.map((candidato) => {
                const logo = getPartyLogoBySigla(candidato.partido ?? '');
                const partidoMeta = getPartidoEspectro(candidato.partido);
                const pos = candidato.posicionamento;

                return (
                  <Link
                    key={candidato.idTse}
                    href={`/candidatos/${candidato.ano}/${candidato.uf}/${candidato.idTse}`}
                    className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:shadow-[0_10px_20px_rgba(0,0,0,0.14)] transition-shadow duration-200"
                  >
                    <div className="aspect-[4/3] border-b-4 border-black bg-surface-container-high overflow-hidden">
                      <FotoCandidato
                        sqEleicao={candidato.sqEleicao}
                        id={candidato.idTse}
                        uf={candidato.uf}
                        nome={candidato.nomeUrna}
                      />
                    </div>

                    <div className="p-5 md:p-6 space-y-3 flex-1 flex flex-col">
                      <div className="flex items-center gap-2">
                        {logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={logo} alt={`Logo ${candidato.partido}`} className="w-8 h-8 object-contain rounded-full bg-white border-2 border-black p-1" />
                        ) : null}
                        <span className="font-label font-bold uppercase text-xs text-on-surface-variant/90">
                          {candidato.partido ?? 'Sem partido'} • {candidato.cargo} • {candidato.uf}
                        </span>
                      </div>

                      <h2 className="font-headline font-black text-2xl md:text-3xl uppercase leading-none">
                        {candidato.nomeUrna}
                      </h2>

                      <div className="flex items-center justify-between gap-3 border-2 border-black bg-surface-container-high px-3 py-2">
                        <span className="font-label font-bold uppercase text-[10px] opacity-60">Nº na urna</span>
                        <span className="font-headline font-black text-3xl uppercase leading-none">{candidato.numero}</span>
                      </div>

                      <p className="font-body font-bold uppercase text-xs text-on-surface/80">
                        {candidato.situacao}
                        {candidato.coligacao ? ` · ${candidato.coligacao}` : ''}
                      </p>

                      {/* Posicionamento */}
                      <div className="mt-auto pt-3 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`font-headline font-black uppercase text-sm ${pos.eixo ? EIXO_TEXTO[pos.eixo] : 'text-gray-500'}`}>
                            {pos.label}
                          </span>
                          <span className={`font-label font-bold uppercase text-[10px] border-2 px-1.5 py-0.5 ${BASE_BADGE[pos.base]}`}>
                            {BASE_EMOJI[pos.base]} {pos.baseLabel}
                          </span>
                        </div>
                        <BarraEspectro eixo={pos.eixo} base={pos.base} />
                        {partidoMeta && !pos.temas.length ? (
                          <p className="font-label font-bold uppercase text-[10px] opacity-60">
                            {partidoMeta.familia}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </section>
          )}

          <section className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-xl uppercase mb-3">Sobre esta página</h2>
            <p className="font-body font-medium text-sm">
              Os dados (registro, partido, coligação, situação, foto) vêm em tempo real da API oficial do TSE.
              O <strong>posicionamento político</strong> é uma estimativa do QuemVotar com base no plano de governo (cargos executivos),
              análise da redação ou posição do partido — sempre rotulada. Veja a{' '}
              <Link href="/candidatos/metodologia" className="font-bold underline">metodologia completa</Link>.
            </p>
            <div className="mt-4">
              <AvisoFonteTse />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
