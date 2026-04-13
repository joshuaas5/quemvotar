'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

export interface MatchRow {
  id: string;
  nome: string;
  cargo: string;
  partidoSigla: string;
  partidoNome: string;
  uf: string;
  nota: number | null;
  rankingGeral?: number | null;
  espectro?: string | null;
  espectroEixo?: 'esquerda' | 'centro-esquerda' | 'centro' | 'centro-direita' | 'direita' | null;
  familiaPolitica?: string | null;
  economicAxis?: -2 | -1 | 0 | 1 | 2 | null;
  socialAxis?: -2 | -1 | 0 | 1 | 2 | null;
  perfilHref?: string | null;
  fonteUrl?: string | null;
}

function formatScore(value: number | null) {
  if (typeof value !== 'number') return '-';
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function scoreAxis(current: number | null | undefined, preferred: number) {
  if (current == null) return 0;
  const distance = Math.abs(current - preferred);
  return Math.max(0, 28 - distance * 8);
}

function scoreSpectrum(current: MatchRow['espectroEixo'], preferred: string) {
  if (!preferred || preferred === 'qualquer' || !current) return 0;
  const order = ['esquerda', 'centro-esquerda', 'centro', 'centro-direita', 'direita'];
  const distance = Math.abs(order.indexOf(current) - order.indexOf(preferred));
  return Math.max(0, 24 - distance * 8);
}

function axisLabel(value: string, type: 'economia' | 'costumes') {
  if (type === 'economia') {
    if (value === '-2') return 'Mais Estado e proteção social';
    if (value === '-1') return 'Tende a mais Estado';
    if (value === '0') return 'Equilíbrio';
    if (value === '1') return 'Tende a mais mercado';
    if (value === '2') return 'Mais mercado e menos Estado';
  }

  if (value === '-2') return 'Mais progressista';
  if (value === '-1') return 'Tende a progressista';
  if (value === '0') return 'Equilíbrio';
  if (value === '1') return 'Tende a conservador';
  return 'Mais conservador';
}

export default function MatchExperience({ rows }: { rows: MatchRow[] }) {
  const [uf, setUf] = useState('');
  const [casa, setCasa] = useState('');
  const [economia, setEconomia] = useState('0');
  const [costumes, setCostumes] = useState('0');
  const [campo, setCampo] = useState('qualquer');
  const [partido, setPartido] = useState('');
  const [prioridade, setPrioridade] = useState('equilibrio');

  const ufs = useMemo(
    () =>
      Array.from(new Set(rows.map((row) => row.uf).filter(Boolean))).sort((a, b) =>
        a.localeCompare(b, 'pt-BR'),
      ),
    [rows],
  );
  const partidos = useMemo(
    () =>
      Array.from(new Set(rows.map((row) => row.partidoSigla).filter(Boolean))).sort((a, b) =>
        a.localeCompare(b, 'pt-BR'),
      ),
    [rows],
  );

  const preferredEconomic = Number(economia);
  const preferredSocial = Number(costumes);

  const candidates = useMemo(() => {
    return rows
      .filter((row) => (!uf || row.uf === uf))
      .filter((row) => (!casa || row.cargo.toLowerCase().includes(casa === 'camara' ? 'deputado' : 'senador')))
      .filter((row) => (!partido || row.partidoSigla === partido))
      .map((row) => {
        let score = 0;
        const reasons: string[] = [];

        if (typeof row.nota === 'number') {
          const noteWeight = prioridade === 'nota' ? 8 : prioridade === 'ideias' ? 4 : 6;
          score += row.nota * noteWeight;

          if (row.rankingGeral && row.rankingGeral <= 30) {
            score += 14;
            reasons.push(`Está entre os 30 melhores do ranking geral (#${row.rankingGeral}).`);
          } else if (row.rankingGeral && row.rankingGeral <= 100) {
            score += 8;
            reasons.push(`Aparece bem colocado no ranking geral (#${row.rankingGeral}).`);
          }
        }

        const economicScore = scoreAxis(row.economicAxis, preferredEconomic);
        const socialScore = scoreAxis(row.socialAxis, preferredSocial);
        const spectrumScore = scoreSpectrum(row.espectroEixo, campo);
        const ideologyWeight = prioridade === 'ideias' ? 1.4 : 1;

        score += (economicScore + socialScore + spectrumScore) * ideologyWeight;

        if (row.economicAxis != null) {
          reasons.push(`Na economia, fica mais perto de "${axisLabel(economia, 'economia')}".`);
        }

        if (row.socialAxis != null) {
          reasons.push(`Em costumes, fica mais perto de "${axisLabel(costumes, 'costumes')}".`);
        }

        if (spectrumScore > 0 && row.espectro) {
          reasons.push(`Campo político aproximado alinhado ao recorte escolhido: ${row.espectro}.`);
        }

        return { ...row, score, reasons: reasons.slice(0, 3) };
      })
      .sort(
        (a, b) =>
          b.score - a.score ||
          (a.rankingGeral ?? Number.MAX_SAFE_INTEGER) - (b.rankingGeral ?? Number.MAX_SAFE_INTEGER),
      )
      .slice(0, 12);
  }, [rows, uf, casa, partido, preferredEconomic, preferredSocial, campo, economia, costumes, prioridade]);

  return (
    <div className="space-y-10">
      <section className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        <div>
          <h2 className="font-headline font-black text-4xl uppercase">Como você pensa?</h2>
          <p className="font-body font-medium mt-3">
            Responda do seu jeito. O match usa suas respostas para encontrar parlamentares mais
            próximos do seu pensamento político e da sua prioridade de voto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
          <select
            value={uf}
            onChange={(event) => setUf(event.target.value)}
            className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
          >
            <option value="">Qualquer estado</option>
            {ufs.map((item) => (
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
            value={economia}
            onChange={(event) => setEconomia(event.target.value)}
            className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
          >
            <option value="-2">Mais Estado</option>
            <option value="-1">Estado moderado</option>
            <option value="0">Equilíbrio</option>
            <option value="1">Mercado moderado</option>
            <option value="2">Mais mercado</option>
          </select>

          <select
            value={costumes}
            onChange={(event) => setCostumes(event.target.value)}
            className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
          >
            <option value="-2">Mais progressista</option>
            <option value="-1">Progressista moderado</option>
            <option value="0">Equilíbrio</option>
            <option value="1">Conservador moderado</option>
            <option value="2">Mais conservador</option>
          </select>

          <select
            value={campo}
            onChange={(event) => setCampo(event.target.value)}
            className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
          >
            <option value="qualquer">Qualquer campo</option>
            <option value="esquerda">Esquerda</option>
            <option value="centro-esquerda">Centro-esquerda</option>
            <option value="centro">Centro</option>
            <option value="centro-direita">Centro-direita</option>
            <option value="direita">Direita</option>
          </select>

          <select
            value={partido}
            onChange={(event) => setPartido(event.target.value)}
            className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
          >
            <option value="">Qualquer partido</option>
            {partidos.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="border-4 border-black p-4 bg-surface-container-low">
            <p className="font-label font-bold uppercase text-xs opacity-70">Economia</p>
            <p className="font-body font-bold mt-2">{axisLabel(economia, 'economia')}</p>
          </div>
          <div className="border-4 border-black p-4 bg-surface-container-low">
            <p className="font-label font-bold uppercase text-xs opacity-70">Costumes</p>
            <p className="font-body font-bold mt-2">{axisLabel(costumes, 'costumes')}</p>
          </div>
          <select
            value={prioridade}
            onChange={(event) => setPrioridade(event.target.value)}
            className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
          >
            <option value="equilibrio">Equilibrar ideias e nota</option>
            <option value="ideias">Priorizar ideias</option>
            <option value="nota">Priorizar desempenho e nota</option>
          </select>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-6">
        <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="font-headline font-black text-4xl uppercase">Matches mais próximos de você</h2>
          <p className="font-body font-medium mt-4">
            A ordem leva em conta suas respostas sobre economia e costumes, o campo político
            desejado e, se você quiser, também o desempenho público medido pela nota disponível.
          </p>
        </div>

        <div className="bg-primary-container border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-label font-bold uppercase text-xs opacity-70">Resultado atual</p>
          <p className="font-headline font-black text-5xl mt-2">{candidates.length}</p>
          <p className="font-body font-bold mt-3">nomes mais próximos do seu perfil político atual.</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {candidates.map((row, index) => (
          <article
            key={row.id}
            className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-label font-bold uppercase text-xs opacity-70">Match #{index + 1}</p>
                <h3 className="font-headline font-black text-3xl uppercase leading-none mt-2">
                  {row.nome}
                </h3>
                <p className="font-body font-bold mt-3">
                  {[row.partidoSigla || row.partidoNome, row.uf, row.cargo].filter(Boolean).join(' / ')}
                </p>
              </div>
              <div className="border-4 border-black px-4 py-3 bg-primary-container text-center">
                <p className="font-label font-bold uppercase text-xs">Nota</p>
                <p className="font-headline font-black text-3xl">{formatScore(row.nota)}</p>
              </div>
            </div>

            {row.espectro ? (
              <p className="font-body font-medium">
                Campo político aproximado: <strong>{row.espectro}</strong>
              </p>
            ) : null}

            {row.familiaPolitica ? (
              <p className="font-body font-medium">
                Família política: <strong>{row.familiaPolitica}</strong>
              </p>
            ) : null}

            <div className="space-y-2">
              {row.reasons.map((reason) => (
                <p key={reason} className="font-body font-medium">
                  {reason}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {row.perfilHref ? (
                <Link href={row.perfilHref} className="font-headline font-black uppercase border-b-4 border-black">
                  Abrir perfil
                </Link>
              ) : null}
              {row.fonteUrl ? (
                <a
                  href={row.fonteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-headline font-black uppercase border-b-4 border-black"
                >
                  Ver referência
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
