import Image from 'next/image';
import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import BotaoFavoritar from '@/components/BotaoFavoritar';
import { CardSkeleton, SectionSkeleton, ThemeSkeleton } from '@/components/ProfileSkeleton';
import { getPerfilBasico, getPerfilEnriquecido, getThemeVisual, type PerfilEnriquecido } from '@/lib/api';
import { searchCnjByPoliticianName } from '@/lib/official';
import type { PartidoResumo, PerfilDetalhadoPublico, PerfilItemLista } from '@/lib/official';
import { buildBreadcrumbSchema } from '@/lib/jsonld';

export const revalidate = 1800;

/* ── helpers ─────────────────────────────────────────────────────────── */

function formatDate(value?: string | null) {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date);
    }
  }
  return value;
}

/**
 * Detecta se todas as datas de uma lista sao iguais e iguais a hoje.
 * Isso indica dados suspeitos/gerados automaticamente.
 */
function areDatesSuspicious(items: PerfilItemLista[]): boolean {
  if (items.length === 0) return false;
  const dates = items.map((i) => i.data).filter((d): d is string => Boolean(d));
  if (dates.length === 0) return false;
  const uniqueDates = new Set(dates);
  if (uniqueDates.size !== 1) return false;
  const today = new Date().toISOString().split('T')[0];
  return dates[0] === today || dates[0].startsWith(today);
}

/**
 * Verifica se os dados de votacao sao muito antigos (antes de 2026).
 * A legislatura atual comecou em 2023, mas votacoes "recentes" deveriam ser de 2026.
 */
function isVoteDataStale(items: PerfilItemLista[]): boolean {
  if (items.length === 0) return true;
  const dates = items.map((i) => i.data).filter((d): d is string => Boolean(d));
  if (dates.length === 0) return true;
  // Se a data mais recente for anterior a 2026, considera desatualizado
  const maxDate = dates.reduce((max, d) => (d > max ? d : max), dates[0]);
  return !maxDate.startsWith('2026');
}

function formatScore(value?: number | null) {
  if (typeof value !== 'number') return null;
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function formatPercent(value?: number | null) {
  if (typeof value !== 'number') return null;
  return `${value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}%`;
}

/* ── section: about ──────────────────────────────────────────────── */

function renderSobreSection(perfil: PerfilDetalhadoPublico) {
  const detalhes = [
    { label: 'Nome completo', value: perfil.nomeCompleto, emoji: '📛' },
    { label: 'Nascimento', value: formatDate(perfil.dataNascimento), emoji: '🎂' },
    { label: 'Naturalidade', value: perfil.naturalidade, emoji: '📍' },
    { label: 'Sexo', value: perfil.sexo, emoji: '👤' },
    { label: 'E-mail institucional', value: perfil.email, emoji: '✉️' },
    { label: 'Telefones oficiais', value: perfil.telefones.length > 0 ? perfil.telefones.join(' / ') : null, emoji: '📞' },
    { label: 'Gabinete', value: perfil.gabinete, emoji: '🏢' },
    { label: 'Escolaridade', value: perfil.escolaridade, emoji: '🎓' },
    { label: 'Site pessoal', value: perfil.sitePessoal, emoji: '🌐' },
  ].filter((item) => Boolean(item.value));

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase">👤 Informações oficiais</h2>
        <p className="font-body font-bold uppercase text-xs sm:text-sm opacity-70 mt-2">
          Dados biográficos e de contato publicados pelas casas legislativas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {detalhes.map((item) => (
          <article
            key={item.label}
            className="bg-white border-4 border-black p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">
              {item.emoji} {item.label}
            </p>
            <p className="font-body font-bold text-base sm:text-lg break-words">{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── section: themed voting ──────────────────────────────────────── */

function renderTemaSection(temasVotacao: PerfilItemLista[]) {
  if (!temasVotacao.length) return null;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase">🗳️ Como vota nos temas que pesam</h2>
        <p className="font-body font-bold uppercase text-xs sm:text-sm opacity-70 mt-2">
          Resumo das votações recentes agrupadas por assunto para ficar fácil de entender.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {temasVotacao.map((tema, index) => {
          const visual = getThemeVisual(tema.titulo);
          const tendencia = tema.destaque ?? '';
          const tendenciaCor =
            tendencia.includes('favoráveis') ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
            tendencia.includes('contrários') ? 'bg-red-100 text-red-800 border-red-300' :
            'bg-amber-100 text-amber-800 border-amber-300';

          return (
            <article
              key={`${tema.titulo}-${index}`}
              className={`${visual.bg} border-4 ${visual.border} p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)]`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl sm:text-3xl">{visual.emoji}</span>
                <p className={`font-headline font-black text-lg sm:text-xl uppercase leading-tight ${visual.accent}`}>
                  {tema.titulo}
                </p>
              </div>
              {tema.data ? (
                <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">
                  📅 {formatDate(tema.data)}
                </p>
              ) : null}
              {tema.destaque ? (
                <span className={`inline-block ${tendenciaCor} border-2 px-2 py-0.5 font-headline font-black uppercase text-xs mb-3`}>
                  {tema.destaque}
                </span>
              ) : null}
              {tema.detalhe ? (
                <p className="font-label font-bold uppercase text-xs opacity-60 mb-2">{tema.detalhe}</p>
              ) : null}
              {tema.descricao ? (
                <p className="font-body font-medium text-sm line-clamp-3">{tema.descricao}</p>
              ) : null}
              {tema.href ? (
                <a
                  href={tema.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-block mt-3 font-headline font-black uppercase text-sm border-b-4 ${visual.border} ${visual.accent}`}
                >
                  Ver matéria
                </a>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ── section: styled list (projects, votes, mandato, etc.) ────── */

const SECTION_META: Record<string, { emoji: string; accent: string; badgeBg: string; border: string }> = {
  'Projetos e requerimentos': { emoji: '📝', accent: 'text-indigo-700', badgeBg: 'bg-indigo-50', border: 'border-indigo-200' },
  'Votações recentes': { emoji: '🗳️', accent: 'text-violet-700', badgeBg: 'bg-violet-50', border: 'border-violet-200' },
  'Mandato': { emoji: '🏛️', accent: 'text-sky-700', badgeBg: 'bg-sky-50', border: 'border-sky-200' },
  'Comissões': { emoji: '🏢', accent: 'text-teal-700', badgeBg: 'bg-teal-50', border: 'border-teal-200' },
  'Cargos': { emoji: '👔', accent: 'text-slate-700', badgeBg: 'bg-slate-50', border: 'border-slate-200' },
  'Despesas recentes': { emoji: '💸', accent: 'text-rose-700', badgeBg: 'bg-rose-50', border: 'border-rose-200' },
  'Histórico partidário': { emoji: '🔄', accent: 'text-amber-700', badgeBg: 'bg-amber-50', border: 'border-amber-200' },
};

function getVoteBadge(destaque?: string) {
  if (!destaque) return null;
  const lower = destaque.toLowerCase();
  if (lower.includes('sim') || lower.includes('favoráv'))
    return { label: `✅ ${destaque}`, cls: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  if (lower.includes('não') || lower.includes('contrár'))
    return { label: `❌ ${destaque}`, cls: 'bg-red-100 text-red-800 border-red-300' };
  if (lower.includes('abstenção') || lower.includes('abst'))
    return { label: `⚪ ${destaque}`, cls: 'bg-gray-100 text-gray-700 border-gray-300' };
  if (lower.includes('autor principal'))
    return { label: `⭐ ${destaque}`, cls: 'bg-amber-100 text-amber-800 border-amber-300' };
  if (lower.includes('coautoria'))
    return { label: `🤝 ${destaque}`, cls: 'bg-blue-100 text-blue-800 border-blue-300' };
  return { label: destaque, cls: 'bg-gray-100 text-gray-700 border-gray-300' };
}

function isExpenseAmount(destaque?: string) {
  return destaque && /^R\$/.test(destaque);
}

function renderListSection(
  title: string,
  description: string,
  items: PerfilItemLista[],
  emptyText: string,
  options?: { hideDates?: boolean },
) {
  const meta = SECTION_META[title] ?? { emoji: '📄', accent: 'text-gray-700', badgeBg: 'bg-gray-50', border: 'border-gray-200' };
  const hideDates = options?.hideDates ?? false;

  return (
    <section className="space-y-5">
      <div>
        <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase">
          {meta.emoji} {title}
        </h2>
        <p className="font-body font-bold uppercase text-xs sm:text-sm opacity-70 mt-2">{description}</p>
      </div>

      {items.length === 0 ? (
        <div className={`${meta.badgeBg} border-4 ${meta.border} p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)]`}>
          <p className="font-body font-bold text-sm">{emptyText}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {items.map((item, index) => {
            const badge = getVoteBadge(item.destaque);
            const expense = isExpenseAmount(item.destaque);

            return (
              <article
                key={`${title}-${item.titulo}-${item.data ?? index}`}
                className={`${meta.badgeBg} border-4 ${meta.border} p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.12)] transition-shadow`}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      {item.data && !hideDates ? (
                        <p className="font-label font-bold uppercase text-xs opacity-70 mb-1">
                          📅 {formatDate(item.data)}
                        </p>
                      ) : null}
                      <h3 className={`font-headline font-black text-lg sm:text-xl uppercase leading-tight ${meta.accent}`}>
                        {item.titulo}
                      </h3>
                    </div>
                    {badge ? (
                      <span className={`${badge.cls} border-2 px-2 py-0.5 font-headline font-black uppercase text-xs shrink-0 max-w-[180px] truncate`}>
                        {badge.label}
                      </span>
                    ) : expense && item.destaque ? (
                      <span className="bg-rose-100 text-rose-800 border-2 border-rose-300 px-2 py-0.5 font-headline font-black text-xs sm:text-sm shrink-0 max-w-[160px] truncate">
                        {item.destaque}
                      </span>
                    ) : null}
                  </div>

                  {item.descricao ? (
                    <p className="font-body font-medium text-sm line-clamp-3">{item.descricao}</p>
                  ) : null}
                  {item.detalhe ? (
                    <p className="font-label font-bold uppercase text-xs opacity-60">{item.detalhe}</p>
                  ) : null}

                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`font-headline font-black uppercase text-sm border-b-4 ${meta.border} ${meta.accent} w-max`}
                    >
                      Ver pagina oficial
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

/* ── section: top cards ──────────────────────────────────────────── */

function renderTopCards(perfil: PerfilDetalhadoPublico, partido: PartidoResumo | null, enriched?: PerfilEnriquecido | null) {
  const loadingEnrichedData = typeof enriched === "undefined";

  const cards = [
    {
      title: 'Nota',
      emoji: '⭐',
      value: enriched?.ranking ? formatScore(enriched.ranking.nota) : (loadingEnrichedData ? '…' : '-'),
      helper: enriched?.ranking?.rankingGeral
        ? `Ranking geral #${enriched.ranking.rankingGeral}`
        : loadingEnrichedData ? 'Carregando dados externos…' : 'Sem nota pública localizada',
      href: enriched?.ranking?.fonteUrl,
      bg: 'bg-[#ffe066]',
    },
    {
      title: 'Presença',
      emoji: '✅',
      value: enriched?.presenca ? formatPercent(enriched.presenca.percentual) : (loadingEnrichedData ? '…' : '-'),
      helper: enriched?.presenca
        ? `${enriched.presenca.presencas}/${enriched.presenca.sessoesDeliberativas} sessões no ano ${enriched.presenca.ano}`
        : loadingEnrichedData ? 'Carregando dados externos…' : 'Sem série de presença localizada',
      href: enriched?.presenca?.fonteUrl,
      bg: 'bg-[#9bf6ff]',
    },
    {
      title: 'Alinhamento',
      emoji: '🤝',
      value: enriched?.governismo ? formatPercent(enriched.governismo.percentualFavoravel) : (loadingEnrichedData ? '…' : '-'),
      helper: enriched?.governismo
        ? 'Percentual de apoio ao governo nas votações monitoradas'
        : loadingEnrichedData ? 'Carregando dados externos…' : 'Sem série localizada',
      href: enriched?.governismo?.fonteUrl,
      bg: 'bg-[#ffd6a5]',
    },
    {
      title: 'Campo político',
      emoji: '🏛️',
      value: enriched?.espectro?.label ?? partido?.espectro ?? '-',
      helper: partido?.familiaPolitica ?? 'Sem classificação aproximada disponível',
      href: partido ? `/partidos/${partido.sigla}` : undefined,
      bg: 'bg-[#caffbf]',
    },
    {
      title: 'Partido',
      emoji: '🏳️',
      value: partido?.sigla ?? perfil.partido,
      helper: partido?.nome ?? perfil.partido,
      href: partido ? `/partidos/${partido.sigla}` : undefined,
      bg: 'bg-[#ffc6ff]',
    },
  ];

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-5">
      {cards.map((card) => (
        <article
          key={card.title}
          className={`${card.bg} border-4 border-black p-3 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
        >
          <p className="font-label font-bold uppercase text-xs opacity-70 mb-1 sm:mb-2">
            {card.emoji} {card.title}
          </p>
          <p className="font-headline font-black text-2xl sm:text-4xl leading-none truncate">{card.value}</p>
          <p className="font-body font-bold mt-2 sm:mt-3 text-xs sm:text-sm line-clamp-2">{card.helper}</p>
          {card.href ? (
            card.href.startsWith('/') ? (
              <Link
                href={card.href}
                className="inline-block mt-3 sm:mt-4 font-headline font-black uppercase text-xs sm:text-sm border-b-4 border-black"
              >
                Abrir
              </Link>
            ) : (
              <a
                href={card.href}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 sm:mt-4 font-headline font-black uppercase text-xs sm:text-sm border-b-4 border-black"
              >
                Ver fonte
              </a>
            )
          ) : null}
        </article>
      ))}
    </section>
  );
}

/* ── section: campo político ─────────────────────────────────────── */

function renderCampoPoliticoSection(perfil: PerfilDetalhadoPublico, partido: PartidoResumo | null, enriched?: PerfilEnriquecido | null) {
  const espectro = enriched?.espectro?.label ?? partido?.espectro;
  const familia = partido?.familiaPolitica;

  if (!espectro && !familia) return null;

  const eixoColors: Record<string, string> = {
    esquerda: 'bg-red-500',
    'centro-esquerda': 'bg-orange-400',
    centro: 'bg-yellow-400',
    'centro-direita': 'bg-blue-400',
    direita: 'bg-indigo-500',
  };

  const eixo = enriched?.espectro?.eixo ?? partido?.espectroEixo;
  const eixoPositions: Record<string, string> = {
    esquerda: 'left-[10%]',
    'centro-esquerda': 'left-[30%]',
    centro: 'left-[50%]',
    'centro-direita': 'left-[70%]',
    direita: 'left-[90%]',
  };

  return (
    <section className="bg-white border-4 border-black p-5 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="font-headline font-black text-2xl sm:text-3xl uppercase mb-4">🏛️ Campo político</h2>

      {eixo && (
        <div className="mb-6">
          <div className="flex justify-between font-label font-bold uppercase text-xs opacity-60 mb-2">
            <span>Esquerda</span>
            <span>Centro</span>
            <span>Direita</span>
          </div>
          <div className="relative h-4 bg-gradient-to-r from-red-400 via-yellow-300 to-indigo-500 rounded-full border-2 border-black">
            <div
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-black ${eixoColors[eixo] ?? 'bg-gray-400'} ${eixoPositions[eixo] ?? 'left-[50%]'}`}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <article className="border-4 border-black p-4 sm:p-5 bg-green-50">
          <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">Posição aproximada</p>
          <p className="font-body font-bold text-xl sm:text-2xl">{espectro ?? 'Não localizada'}</p>
          {familia ? (
            <span className="inline-block mt-3 bg-green-100 border-2 border-green-300 px-2 py-0.5 font-label font-bold uppercase text-xs text-green-800">
              {familia}
            </span>
          ) : null}
        </article>

        <article className="border-4 border-black p-4 sm:p-5 bg-blue-50">
          <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">O que isso quer dizer</p>
          <p className="font-body font-medium text-sm">
            Esta é uma leitura aproximada do posicionamento político, combinando o partido atual e
            os votos públicos que conseguimos localizar. Não é teste de personalidade nem apoio do
            site ao parlamentar.
          </p>
        </article>
      </div>
    </section>
  );
}

/* ── section: timeline mandatos ─────────────────────────────────── */

function renderMandatoTimeline(mandatos: PerfilItemLista[]) {
  if (!mandatos.length) return null;

  const sorted = [...mandatos].sort((a, b) => {
    const yearA = a.data ? parseInt(a.data.slice(0, 4), 10) : 0;
    const yearB = b.data ? parseInt(b.data.slice(0, 4), 10) : 0;
    return yearB - yearA;
  });

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase">📅 Linha do tempo de mandatos</h2>
        <p className="font-body font-bold uppercase text-xs sm:text-sm opacity-70 mt-2">
          Histórico de mandatos e cargos públicos retornados pelas fontes oficiais.
        </p>
      </div>

      <div className="relative border-l-4 border-black ml-3 sm:ml-4 space-y-6">
        {sorted.map((item, index) => (
          <div key={`${item.titulo}-${index}`} className="pl-6 sm:pl-8 relative">
            <div className="absolute -left-[10px] sm:-left-[12px] top-1 w-4 h-4 sm:w-5 sm:h-5 bg-black border-4 border-white rounded-full" />
            {item.data ? (
              <p className="font-label font-bold uppercase text-xs opacity-70 mb-1">
                {formatDate(item.data)}
              </p>
            ) : null}
            <h3 className="font-headline font-black text-lg sm:text-xl uppercase leading-tight">
              {item.titulo}
            </h3>
            {item.destaque ? (
              <span className="inline-block mt-1 bg-amber-100 text-amber-800 border-2 border-amber-300 px-2 py-0.5 font-label font-bold uppercase text-xs">
                {item.destaque}
              </span>
            ) : null}
            {item.descricao ? (
              <p className="font-body font-medium text-sm mt-2">{item.descricao}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── section: painel de gastos ──────────────────────────────────── */

function parseExpenseValue(destaque?: string): number {
  if (!destaque) return 0;
  const clean = destaque.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.');
  return parseFloat(clean) || 0;
}

function renderGastosPanel(despesas: PerfilItemLista[]) {
  if (!despesas.length) return null;

  const sorted = [...despesas]
    .sort((a, b) => parseExpenseValue(b.destaque) - parseExpenseValue(a.destaque))
    .slice(0, 8);

  const max = parseExpenseValue(sorted[0]?.destaque) || 1;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase">💸 Painel de gastos</h2>
        <p className="font-body font-bold uppercase text-xs sm:text-sm opacity-70 mt-2">
          Maiores despesas da cota parlamentar retornadas pela fonte oficial.
        </p>
      </div>

      <div className="bg-white border-4 border-black p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
        {sorted.map((item, index) => {
          const value = parseExpenseValue(item.destaque);
          const percent = (value / max) * 100;

          return (
            <div key={`${item.titulo}-${index}`}>
              <div className="flex justify-between items-center mb-1">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-label font-bold uppercase text-xs opacity-80 truncate max-w-[70%] hover:underline hover:text-blue-700"
                    title="Ver nota fiscal original"
                  >
                    {item.titulo}
                  </a>
                ) : (
                  <p className="font-label font-bold uppercase text-xs opacity-80 truncate max-w-[70%]">
                    {item.titulo}
                  </p>
                )}
                <p className="font-headline font-black text-sm">{item.destaque}</p>
              </div>
              <div className="h-4 bg-surface-container-high border-2 border-black relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-rose-400 border-r-2 border-black transition-all duration-700"
                  style={{ width: `${percent}%` }}
                />
              </div>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-label font-bold uppercase text-[10px] opacity-60 mt-1 hover:underline"
                >
                  Ver nota fiscal ↗
                </a>
              ) : item.data ? (
                <p className="font-label font-bold uppercase text-[10px] opacity-60 mt-1">
                  {formatDate(item.data)}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── section: processos judiciais (CNJ por nome) ────────────────── */

function ProcessosSkeleton() {
  return (
    <section className="bg-white border-4 border-black p-5 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="font-headline font-black text-2xl sm:text-3xl uppercase mb-4">⚖️ Processos Judiciais</h2>
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 border-2 border-black w-3/4" />
        <div className="h-24 bg-gray-100 border-4 border-black" />
        <div className="h-24 bg-gray-100 border-4 border-black" />
      </div>
    </section>
  );
}

async function ProcessosSection({ nome }: { nome: string }) {
  const processos = await searchCnjByPoliticianName(nome).catch(() => []);

  if (processos.length === 0) {
    return (
      <section className="bg-white border-4 border-black p-5 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="font-headline font-black text-2xl sm:text-3xl uppercase mb-4">⚖️ Processos Judiciais</h2>
        <div className="bg-green-50 border-4 border-green-200 p-4 sm:p-6 text-center">
          <span className="material-symbols-outlined text-4xl mb-2 block text-green-700">gavel</span>
          <p className="font-body font-bold text-green-800">
            Nenhum processo localizado nos tribunais consultados para este nome.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border-4 border-black p-5 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="font-headline font-black text-2xl sm:text-3xl uppercase mb-4">⚖️ Processos Judiciais</h2>
      <p className="font-body font-medium text-sm sm:text-base mb-6">
        Processos localizados nos tribunais brasileiros em que o nome do parlamentar aparece como parte.
      </p>
      <div className="space-y-4">
        {processos.map((proc) => (
          <article key={proc.numeroProcesso} className="border-4 border-black p-4 sm:p-5 bg-red-50">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <p className="font-headline font-black text-base sm:text-lg uppercase">
                {proc.classe}
              </p>
              <span className="bg-red-100 text-red-800 border-2 border-red-300 px-2 py-0.5 font-label font-bold uppercase text-xs">
                {proc.tribunal}
              </span>
            </div>
            <p className="font-label font-bold uppercase text-xs opacity-70 mb-1">
              Nº {proc.numeroProcesso}
            </p>
            {proc.assuntoPrincipal ? (
              <p className="font-body font-medium text-sm mb-2">{proc.assuntoPrincipal}</p>
            ) : null}
            {proc.orgaoJulgador ? (
              <p className="font-label font-bold uppercase text-xs opacity-60 mb-2">
                Órgão: {proc.orgaoJulgador}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-3 mt-3">
              {proc.dataAjuizamento ? (
                <span className="font-label font-bold uppercase text-[11px] opacity-70">
                  Ajuizamento: {formatDate(proc.dataAjuizamento)}
                </span>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── Async: enriched data (loads via Suspense) ───────────────────── */

async function EnrichedProfile({
  perfil,
  partido,
}: {
  perfil: PerfilDetalhadoPublico;
  partido: PartidoResumo | null;
}) {
  const enriched = await getPerfilEnriquecido(perfil, partido);

  return (
    <>
      {renderTopCards(perfil, partido, enriched)}
      {renderCampoPoliticoSection(perfil, partido, enriched)}
      {renderTemaSection(enriched.temasVotacao)}

      {partido?.definicaoCurta ? (
        <section className="bg-white border-4 border-black p-5 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="font-headline font-black text-2xl sm:text-3xl uppercase mb-3">🏳️ Partido e posicionamento</h2>
          <p className="font-body font-medium text-sm sm:text-base">{partido.definicaoCurta}</p>
          <div className="flex flex-wrap gap-3 mt-4">
            {partido.familiaPolitica ? (
              <span className="bg-purple-100 text-purple-800 border-2 border-purple-300 px-3 py-1 font-label font-bold uppercase text-xs">
                {partido.familiaPolitica}
              </span>
            ) : null}
            {partido.espectro ? (
              <span className="bg-blue-100 text-blue-800 border-2 border-blue-300 px-3 py-1 font-label font-bold uppercase text-xs">
                {partido.espectro}
              </span>
            ) : null}
            {partido.presidenteNacional ? (
              <span className="bg-amber-100 text-amber-800 border-2 border-amber-300 px-3 py-1 font-label font-bold uppercase text-xs">
                Presidência: {partido.presidenteNacional}
              </span>
            ) : null}
          </div>
        </section>
      ) : null}

      {renderListSection(
        'Projetos e requerimentos',
        'Matérias e autorias legislativas localizadas para este parlamentar.',
        enriched.autorias,
        'A fonte não retornou autorias recentes nesta consulta.',
        areDatesSuspicious(enriched.autorias) ? { hideDates: true } : undefined,
      )}

      {!isVoteDataStale(enriched.votacoes) && renderListSection(
        'Votações recentes',
        'Votos nominais e deliberações localizadas nas fontes consultadas.',
        enriched.votacoes,
        'A fonte não retornou votações recentes para este perfil nesta consulta.',
      )}

      {renderMandatoTimeline(perfil.mandatos)}

      {renderListSection(
        'Comissões',
        'Participações em comissões e frentes oficiais.',
        perfil.comissoes,
        'A fonte não retornou comissões ativas para este perfil nesta consulta.',
      )}

      {renderListSection(
        'Cargos',
        'Cargos institucionais publicados pela casa legislativa correspondente.',
        perfil.cargos,
        'A fonte não retornou cargos ativos para este perfil nesta consulta.',
      )}

      {perfil.fonte === 'camara' ? renderGastosPanel(enriched.despesas) : renderListSection(
        'Histórico partidário',
        'Filiações partidárias históricas retornadas pelo Senado Federal.',
        perfil.filiacoes,
        'O Senado não retornou histórico partidário para este perfil nesta consulta.',
      )}
    </>
  );
}

/* ── metadata ──────────────────────────────────────────────────────── */

export async function generateMetadata(
  { params }: { params: Promise<{ fonte: string; id: string }> }
) {
  const { fonte, id } = await params;
  const result = await getPerfilBasico(fonte as any, id);

  if (!result) {
    return {
      title: 'Perfil não encontrado | QuemVotar',
      description: 'Não foi possível localizar o perfil na base de dados.',
    };
  }

  const { perfil } = result;
  const sigla = perfil.partido;
  const estado = perfil.uf ? `-${perfil.uf}` : '';
  const cargo = perfil.cargo;

  const canonicalUrl = `https://quemvotar.com.br/perfil/${fonte}/${id}`;

  return {
    title: `${perfil.nome_urna} (${sigla}${estado}) - ${cargo} | QuemVotar`,
    description: `Acompanhe o mandato oficial de ${perfil.nomeCompleto || perfil.nome_urna}. Veja gastos, presença em plenário, alinhamento político e projetos com dados do ${perfil.casa}.`,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${perfil.nome_urna} - Ficha do ${cargo}`,
      description: `Acompanhe a ficha pública, gastos e histórico de votações de ${perfil.nome_urna}.`,
      images: perfil.foto_url ? [perfil.foto_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      images: perfil.foto_url ? [perfil.foto_url] : [],
    },
  };
}

/* ── page ────────────────────────────────────────────────────────── */

export default async function PerfilPage({
  params,
}: {
  params: Promise<{ fonte: string; id: string }>;
}) {
  const { fonte, id } = await params;

  if (fonte !== 'camara' && fonte !== 'senado') {
    notFound();
  }

  const result = await getPerfilBasico(fonte, id);

  if (!result) {
    notFound();
  }

  const { perfil, partido } = result;
  const cores = partido?.cores ?? ['#111827', '#d1d5db'];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: perfil.nomeCompleto || perfil.nome_urna,
    alternateName: perfil.nome_urna,
    jobTitle: perfil.cargo,
    memberOf: {
      '@type': 'Organization',
      name: `Partido ${perfil.partido}`,
      alternateName: perfil.partido,
    },
    url: `https://quemvotar.com.br/perfil/${fonte}/${id}`,
    image: perfil.foto_url,
    address: perfil.uf ? {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressRegion: perfil.uf,
        addressCountry: 'BR',
      },
    } : undefined,
    description: perfil.biografia || `Perfil de ${perfil.nome_urna} (${perfil.partido}-${perfil.uf}), ${perfil.cargo} em exercicio.`,
    knowsAbout: ['Politica', 'Legislacao', 'Direito'],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://quemvotar.com.br/perfil/${fonte}/${id}`,
    },
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Início', url: 'https://quemvotar.com.br/' },
    { name: 'Parlamentares', url: 'https://quemvotar.com.br/parlamentares' },
    { name: perfil.nome_urna },
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbSchema]) }}
      />

      <main className="flex-grow bg-surface-container py-6 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Breadcrumbs
              items={[
                { label: 'Parlamentares', href: '/parlamentares' },
                { label: perfil.nome_urna },
              ]}
            />
            <div className="flex items-center gap-2">
              <BotaoFavoritar
                id={id}
                fonte={fonte as 'camara' | 'senado'}
                nome_urna={perfil.nome_urna}
                partido={perfil.partido}
                uf={perfil.uf ?? ''}
                cargo={perfil.cargo}
                foto_url={perfil.foto_url}
              />
              <ShareButtons
                title={`${perfil.nome_urna} (${perfil.partido}-${perfil.uf}) | QuemVotar`}
                description={`Acompanhe o mandato de ${perfil.nome_urna}: nota, presença, gastos e votações.`}
                path={`/perfil/${fonte}/${id}`}
              />
            </div>
          </div>

          {/* HERO — renders immediately with basic data */}
          <section
            className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${cores[0]} 0%, ${cores[1]} 100%)`,
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
              <div className="bg-white/20 border-b-4 lg:border-b-0 lg:border-r-4 border-black relative flex items-center justify-center min-h-[300px]">
                {perfil.foto_url ? (
                  <Image
                    src={perfil.foto_url}
                    alt={perfil.nome_urna}
                    fill
                    sizes="(max-width: 1024px) 100vw, 280px"
                    className="object-cover object-top max-h-[300px] lg:max-h-none"
                    priority
                    quality={65}
                  />
                ) : (
                  <span className="font-headline font-black text-6xl text-white/50">{perfil.nome_urna.split(' ').map(n => n[0]).join('').slice(0,2)}</span>
                )}
              </div>

              <div className="p-5 sm:p-8 lg:p-10 space-y-4 sm:space-y-6 text-white">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="bg-white text-black border-2 border-black px-2 sm:px-3 py-1 font-headline font-black uppercase text-xs sm:text-sm">
                    {perfil.casa}
                  </span>
                  {perfil.situacao ? (
                    <span className="bg-black text-white border-2 border-black px-2 sm:px-3 py-1 font-headline font-black uppercase text-xs sm:text-sm">
                      {perfil.situacao}
                    </span>
                  ) : null}
                  {partido?.espectro ? (
                    <span className="bg-white/90 text-black border-2 border-black px-2 sm:px-3 py-1 font-headline font-black uppercase text-xs sm:text-sm">
                      {partido.espectro}
                    </span>
                  ) : null}
                </div>

                <div>
                  <p className="font-label font-bold uppercase text-xs sm:text-sm opacity-90 mb-1 sm:mb-2">
                    {[perfil.partido, perfil.uf, perfil.cargo].filter(Boolean).join(' / ')}
                  </p>
                  <h1 className="font-headline font-black text-3xl sm:text-5xl md:text-7xl uppercase leading-none">
                    {perfil.nome_urna}
                  </h1>
                  <p className="font-body font-bold text-sm sm:text-lg mt-3 sm:mt-4 max-w-3xl">
                    {perfil.biografia ? perfil.biografia : "O que mais importa para decidir voto vem primeiro: nota pública, presença, alinhamento, partido e temas em que mais vota."}
                  </p>
                </div>

                {partido ? (
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    <Link
                      href={`/partidos/${partido.sigla}`}
                      className="font-headline font-black uppercase text-sm sm:text-base border-b-4 border-white"
                    >
                      Ver partido
                    </Link>
                    {partido.siteOficial ? (
                      <a
                        href={partido.siteOficial}
                        target="_blank"
                        rel="noreferrer"
                        className="font-headline font-black uppercase text-sm sm:text-base border-b-4 border-white"
                      >
                        Site oficial do partido
                      </a>
                    ) : null}
                  </div>
                ) : null}

                {perfil.atualizadoEm ? (
                  <p className="font-label font-bold uppercase text-xs opacity-80">
                    Atualização informada pela fonte: {formatDate(perfil.atualizadoEm) ?? perfil.atualizadoEm}
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          {/* ENRICHED DATA — streams via Suspense */}
          <Suspense
            fallback={
              <div className="space-y-6 sm:space-y-10">
                <CardSkeleton />
                <ThemeSkeleton />
                <SectionSkeleton />
                <SectionSkeleton />
              </div>
            }
          >
            <EnrichedProfile perfil={perfil} partido={partido} />
          </Suspense>

          {renderSobreSection(perfil)}

          <Suspense fallback={<ProcessosSkeleton />}>
            <ProcessosSection nome={perfil.nomeCompleto || perfil.nome_urna} />
          </Suspense>

          <section className="bg-white border-4 border-black p-5 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-2xl sm:text-3xl uppercase mb-4">📂 Fontes desta página</h2>
            <p className="font-body font-medium text-sm sm:text-base mb-6">
              Este perfil reúne dados publicados pela Câmara dos Deputados, pelo Senado Federal,
              pelo TSE e por índices públicos de acompanhamento legislativo.
            </p>
            <div className="space-y-3">
              {perfil.linksOficiais.map((link) => (
                <a
                  key={`${link.label}-${link.href}-full`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block font-headline font-black uppercase text-sm sm:text-base border-b-4 border-black w-max max-w-full truncate"
                >
                  {link.label}
                </a>
              ))}
              {partido?.tseUrl ? (
                <a
                  href={partido.tseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block font-headline font-black uppercase text-sm sm:text-base border-b-4 border-black w-max max-w-full truncate"
                >
                  Registro partidário no TSE
                </a>
              ) : null}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
