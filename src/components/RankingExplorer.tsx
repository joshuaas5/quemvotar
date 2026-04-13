'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export interface RankingExplorerRow {
  id: string;
  nome: string;
  cargo: string;
  partidoSigla: string;
  partidoNome: string;
  uf: string;
  nota: number;
  rankingGeral?: number | null;
  rankingCasa?: number | null;
  rankingPartido?: number | null;
  rankingEstado?: number | null;
  fotoUrl?: string | null;
  fonteUrl: string;
  perfilHref?: string | null;
}

function formatScore(value: number) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function getInitials(nome: string) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('');
}

function getContextLabel(uf: string, partido: string, casa: string) {
  if (uf && partido && casa) {
    return `Top de ${uf} no ${partido} (${casa === 'camara' ? 'Câmara' : 'Senado'})`;
  }

  if (uf && partido) {
    return `Top de ${uf} no ${partido}`;
  }

  if (uf && casa) {
    return `Top de ${uf} na ${casa === 'camara' ? 'Câmara' : 'Senado'}`;
  }

  if (partido && casa) {
    return `Top do ${partido} na ${casa === 'camara' ? 'Câmara' : 'Senado'}`;
  }

  if (uf) return `Top de ${uf}`;
  if (partido) return `Top do ${partido}`;
  if (casa) return `Top da ${casa === 'camara' ? 'Câmara' : 'Senado'}`;
  return 'Top geral do ranking';
}

export default function RankingExplorer({ rows }: { rows: RankingExplorerRow[] }) {
  const [query, setQuery] = useState('');
  const [uf, setUf] = useState('');
  const [partido, setPartido] = useState('');
  const [casa, setCasa] = useState('');
  const [pageSize, setPageSize] = useState('30');
  const [page, setPage] = useState(1);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const ufs = useMemo(
    () => Array.from(new Set(rows.map((row) => row.uf).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'pt-BR')),
    [rows],
  );
  const partidos = useMemo(
    () => Array.from(new Set(rows.map((row) => row.partidoSigla).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'pt-BR')),
    [rows],
  );

  const filtered = useMemo(() => {
    return rows
      .filter((row) => {
        const byQuery =
          !query ||
          [row.nome, row.partidoSigla, row.partidoNome, row.uf, row.cargo]
            .join(' ')
            .toLowerCase()
            .includes(query.toLowerCase());
        const byUf = !uf || row.uf === uf;
        const byParty = !partido || row.partidoSigla === partido;
        const byHouse = !casa || row.cargo.toLowerCase().includes(casa === 'camara' ? 'deputado' : 'senador');

        return byQuery && byUf && byParty && byHouse;
      })
      .sort((a, b) => {
        if ((a.rankingGeral ?? Number.MAX_SAFE_INTEGER) !== (b.rankingGeral ?? Number.MAX_SAFE_INTEGER)) {
          return (a.rankingGeral ?? Number.MAX_SAFE_INTEGER) - (b.rankingGeral ?? Number.MAX_SAFE_INTEGER);
        }

        return b.nota - a.nota || a.nome.localeCompare(b.nome, 'pt-BR');
      });
  }, [rows, query, uf, partido, casa]);

  const pageSizeNumber = pageSize === 'todos' ? filtered.length || 1 : Number(pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSizeNumber));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * pageSizeNumber, currentPage * pageSizeNumber);
  const comparison = filtered.filter((row) => compareIds.includes(row.id)).slice(0, 4);
  const topRow = filtered[0] ?? null;
  const contextLabel = getContextLabel(uf, partido, casa);

  useEffect(() => {
    setPage(1);
  }, [query, uf, partido, casa, pageSize]);

  function toggleCompare(id: string) {
    setCompareIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      if (current.length >= 4) {
        return [...current.slice(1), id];
      }

      return [...current, id];
    });
  }

  return (
    <div className="space-y-10">
      <section className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Nome, partido ou UF"
          className="border-4 border-black px-4 py-3 font-headline font-bold uppercase"
        />

        <select
          value={uf}
          onChange={(event) => setUf(event.target.value)}
          className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
        >
          <option value="">Todos os estados</option>
          {ufs.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={partido}
          onChange={(event) => setPartido(event.target.value)}
          className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
        >
          <option value="">Todos os partidos</option>
          {partidos.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={casa}
          onChange={(event) => setCasa(event.target.value)}
          className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
        >
          <option value="">Câmara e Senado</option>
          <option value="camara">Câmara</option>
          <option value="senado">Senado</option>
        </select>

        <select
          value={pageSize}
          onChange={(event) => setPageSize(event.target.value)}
          className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
        >
          <option value="30">30 por vez</option>
          <option value="60">60 por vez</option>
          <option value="120">120 por vez</option>
          <option value="todos">Mostrar todos</option>
        </select>

        <button
          type="button"
          onClick={() => {
            setQuery('');
            setUf('');
            setPartido('');
            setCasa('');
            setPageSize('30');
            setCompareIds([]);
          }}
          className="bg-primary-container border-4 border-black px-6 py-3 font-headline font-black uppercase"
        >
          Limpar
        </button>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-6">
        <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-label font-bold uppercase text-xs opacity-70">Recorte ativo</p>
          <h2 className="font-headline font-black text-4xl uppercase mt-2">{contextLabel}</h2>
          <p className="font-body font-medium mt-4">
            {filtered.length} parlamentares encontrados. Use os filtros para ver o topo de um estado,
            de um partido ou de uma casa específica.
          </p>
        </div>

        <div className="bg-primary-container border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-label font-bold uppercase text-xs opacity-70">Primeira posição do recorte</p>
          {topRow ? (
            <>
              <h3 className="font-headline font-black text-3xl uppercase mt-2 leading-none">{topRow.nome}</h3>
              <p className="font-body font-bold mt-3">
                {[topRow.partidoSigla || topRow.partidoNome, topRow.uf, topRow.cargo].filter(Boolean).join(' / ')}
              </p>
              <p className="font-headline font-black text-5xl mt-5">{formatScore(topRow.nota)}</p>
            </>
          ) : (
            <p className="font-body font-bold mt-3">Nenhum parlamentar encontrado nesse recorte.</p>
          )}
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-headline font-black text-2xl uppercase">
          Página {currentPage} de {totalPages}
        </p>
        <p className="font-body font-bold uppercase text-sm opacity-70">
          Selecione até 4 para comparar lado a lado
        </p>
      </section>

      {comparison.length > 0 ? (
        <section className="space-y-6">
          <div>
            <h2 className="font-headline font-black text-4xl uppercase">Comparação direta</h2>
            <p className="font-body font-bold uppercase text-sm opacity-70 mt-2">
              Veja nota, posição geral, posição na casa, no estado e no partido.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {comparison.map((row) => (
              <article key={`compare-${row.id}`} className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-headline font-black text-2xl uppercase leading-tight">{row.nome}</p>
                <p className="font-label font-bold uppercase text-xs opacity-70 mt-2">
                  {[row.partidoSigla, row.uf, row.cargo].filter(Boolean).join(' / ')}
                </p>
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="border-4 border-black p-3 bg-surface-container-low">
                    <p className="font-label font-bold uppercase text-xs opacity-70">Nota</p>
                    <p className="font-headline font-black text-3xl">{formatScore(row.nota)}</p>
                  </div>
                  <div className="border-4 border-black p-3 bg-surface-container-low">
                    <p className="font-label font-bold uppercase text-xs opacity-70">Geral</p>
                    <p className="font-headline font-black text-3xl">#{row.rankingGeral ?? '-'}</p>
                  </div>
                </div>
                <p className="font-body font-medium mt-4">
                  {[
                    row.rankingCasa ? `Na casa #${row.rankingCasa}` : null,
                    row.rankingEstado ? `No estado #${row.rankingEstado}` : null,
                    row.rankingPartido ? `No partido #${row.rankingPartido}` : null,
                  ]
                    .filter(Boolean)
                    .join(' / ')}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {paginated.map((row) => (
          <article
            key={row.id}
            className={`bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden ${
              compareIds.includes(row.id) ? 'ring-4 ring-black' : ''
            }`}
          >
            <div className="grid grid-cols-[120px_minmax(0,1fr)] border-b-4 border-black">
              <div className="bg-surface-container-high min-h-[120px]">
                {row.fotoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={row.fotoUrl} alt={row.nome} className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-headline font-black text-4xl">
                    {getInitials(row.nome)}
                  </div>
                )}
              </div>

              <div className="p-5 space-y-2">
                <p className="font-label font-bold uppercase text-xs opacity-70">
                  {[row.cargo, row.uf].filter(Boolean).join(' / ')}
                </p>
                <h2 className="font-headline font-black text-3xl uppercase leading-none">{row.nome}</h2>
                <p className="font-body font-bold">{row.partidoSigla || row.partidoNome}</p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="border-4 border-black p-4 bg-surface-container-low">
                  <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Nota</p>
                  <p className="font-headline font-black text-4xl">{formatScore(row.nota)}</p>
                </div>
                <div className="border-4 border-black p-4 bg-surface-container-low">
                  <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Ranking geral</p>
                  <p className="font-headline font-black text-4xl">#{row.rankingGeral ?? '-'}</p>
                </div>
              </div>

              <p className="font-body font-medium">
                {[
                  row.rankingCasa ? `Na casa: #${row.rankingCasa}` : null,
                  row.rankingEstado ? `No estado: #${row.rankingEstado}` : null,
                  row.rankingPartido ? `No partido: #${row.rankingPartido}` : null,
                ]
                  .filter(Boolean)
                  .join(' / ')}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => toggleCompare(row.id)}
                  className="font-headline font-black uppercase border-b-4 border-black"
                >
                  {compareIds.includes(row.id) ? 'Remover comparação' : 'Comparar'}
                </button>
                {row.perfilHref ? (
                  <Link href={row.perfilHref} className="font-headline font-black uppercase border-b-4 border-black">
                    Abrir perfil no site
                  </Link>
                ) : null}
                <a
                  href={row.fonteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-headline font-black uppercase border-b-4 border-black"
                >
                  Ver fonte
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      {filtered.length > pageSizeNumber ? (
        <section className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={currentPage === 1}
            className="border-4 border-black px-6 py-3 font-headline font-black uppercase disabled:opacity-40"
          >
            Página anterior
          </button>
          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={currentPage === totalPages}
            className="border-4 border-black px-6 py-3 font-headline font-black uppercase disabled:opacity-40"
          >
            Próxima página
          </button>
        </section>
      ) : null}
    </div>
  );
}
