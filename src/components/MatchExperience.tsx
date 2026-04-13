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
  perfilHref?: string | null;
  fonteUrl?: string | null;
}

function formatScore(value: number | null) {
  if (typeof value !== 'number') return '-';
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function scoreSpectrum(current: MatchRow['espectroEixo'], preferred: string) {
  if (!preferred || preferred === 'qualquer' || !current) return 0;
  const order = ['esquerda', 'centro-esquerda', 'centro', 'centro-direita', 'direita'];
  const distance = Math.abs(order.indexOf(current) - order.indexOf(preferred));
  return Math.max(0, 30 - distance * 10);
}

function scoreFamily(current: string | null | undefined, preferred: string) {
  if (!preferred || preferred === 'qualquer' || !current) return 0;
  const normalizedCurrent = current.toLowerCase();
  const normalizedPreferred = preferred.toLowerCase();
  return normalizedCurrent.includes(normalizedPreferred) ? 14 : 0;
}

export default function MatchExperience({ rows }: { rows: MatchRow[] }) {
  const [uf, setUf] = useState('');
  const [casa, setCasa] = useState('');
  const [campo, setCampo] = useState('qualquer');
  const [partido, setPartido] = useState('');
  const [familia, setFamilia] = useState('qualquer');
  const [prioridade, setPrioridade] = useState('nota');

  const ufs = useMemo(
    () => Array.from(new Set(rows.map((row) => row.uf).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'pt-BR')),
    [rows],
  );
  const partidos = useMemo(
    () => Array.from(new Set(rows.map((row) => row.partidoSigla).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'pt-BR')),
    [rows],
  );
  const familias = useMemo(
    () =>
      Array.from(
        new Set(rows.map((row) => row.familiaPolitica).filter((value): value is string => Boolean(value))),
      ).sort((a, b) => a.localeCompare(b, 'pt-BR')),
    [rows],
  );

  const candidates = useMemo(() => {
    return rows
      .filter((row) => (!uf || row.uf === uf))
      .filter((row) => (!casa || row.cargo.toLowerCase().includes(casa === 'camara' ? 'deputado' : 'senador')))
      .filter((row) => (!partido || row.partidoSigla === partido))
      .map((row) => {
        let score = 0;
        const reasons: string[] = [];

        if (typeof row.nota === 'number') {
          const noteScore =
            prioridade === 'nota'
              ? row.nota * 8
              : prioridade === 'equilibrio'
                ? row.nota * 5.5
                : row.nota * 3;

          score += noteScore;

          if (row.rankingGeral && row.rankingGeral <= 30) {
            score += 16;
            reasons.push(`Está entre os 30 melhores do ranking geral (#${row.rankingGeral}).`);
          } else if (row.rankingGeral && row.rankingGeral <= 100) {
            score += 8;
            reasons.push(`Aparece bem colocado no ranking geral (#${row.rankingGeral}).`);
          }
        }

        const spectrumScore = scoreSpectrum(row.espectroEixo, campo);
        score += spectrumScore;

        if (spectrumScore > 0 && row.espectro) {
          reasons.push(`Campo político aproximado próximo ao perfil que você escolheu: ${row.espectro}.`);
        }

        const familyScore = scoreFamily(row.familiaPolitica, familia);
        score += familyScore;

        if (familyScore > 0 && row.familiaPolitica) {
          reasons.push(`Família política próxima da preferência marcada: ${row.familiaPolitica}.`);
        }

        if (row.partidoSigla) {
          reasons.push(`Hoje está filiado ao ${row.partidoSigla}.`);
        }

        return { ...row, score, reasons: reasons.slice(0, 3) };
      })
      .sort((a, b) => b.score - a.score || (a.rankingGeral ?? Number.MAX_SAFE_INTEGER) - (b.rankingGeral ?? Number.MAX_SAFE_INTEGER))
      .slice(0, 12);
  }, [rows, uf, casa, campo, partido, familia, prioridade]);

  return (
    <div className="space-y-10">
      <section className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
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
          value={familia}
          onChange={(event) => setFamilia(event.target.value)}
          className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
        >
          <option value="qualquer">Qualquer família</option>
          {familias.map((item) => (
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
          <option value="">Qualquer partido</option>
          {partidos.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={prioridade}
          onChange={(event) => setPrioridade(event.target.value)}
          className="border-4 border-black px-4 py-3 font-headline font-bold uppercase bg-white"
        >
          <option value="nota">Priorizar nota</option>
          <option value="equilibrio">Equilibrar tudo</option>
          <option value="campo">Priorizar campo político</option>
        </select>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-6">
        <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="font-headline font-black text-4xl uppercase">Seus melhores matches agora</h2>
          <p className="font-body font-medium mt-4">
            O resultado cruza nota pública, posição no ranking, partido, família política e campo
            político aproximado para ajudar a filtrar nomes com mais clareza.
          </p>
        </div>

        <div className="bg-primary-container border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-label font-bold uppercase text-xs opacity-70">Resultado atual</p>
          <p className="font-headline font-black text-5xl mt-2">{candidates.length}</p>
          <p className="font-body font-bold mt-3">
            melhores nomes mostrados com base no seu recorte atual.
          </p>
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
                <a href={row.fonteUrl} target="_blank" rel="noreferrer" className="font-headline font-black uppercase border-b-4 border-black">
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
