import type { EixoEspectro, PosicionamentoCandidato } from './types';
import { EIXO_ORDER } from './posicionamento';

/* ── Cores e posições do espectro (mesma linguagem visual do perfil) ── */

export const EIXO_CORES: Record<EixoEspectro, string> = {
  esquerda: 'bg-red-500',
  'centro-esquerda': 'bg-orange-400',
  centro: 'bg-yellow-400',
  'centro-direita': 'bg-blue-400',
  direita: 'bg-indigo-500',
};

export const EIXO_BARRA: Record<EixoEspectro, string> = {
  esquerda: 'left-[10%]',
  'centro-esquerda': 'left-[30%]',
  centro: 'left-[50%]',
  'centro-direita': 'left-[70%]',
  direita: 'left-[90%]',
};

export const EIXO_TEXTO: Record<EixoEspectro, string> = {
  esquerda: 'text-red-600',
  'centro-esquerda': 'text-orange-600',
  centro: 'text-yellow-600',
  'centro-direita': 'text-blue-600',
  direita: 'text-indigo-600',
};

export const BASE_BADGE: Record<PosicionamentoCandidato['base'], string> = {
  'plano-de-governo': 'bg-emerald-100 text-emerald-800 border-emerald-300',
  'analise-curada': 'bg-violet-100 text-violet-800 border-violet-300',
  partido: 'bg-sky-100 text-sky-800 border-sky-300',
  indefinido: 'bg-gray-100 text-gray-600 border-gray-300',
};

export const BASE_EMOJI: Record<PosicionamentoCandidato['base'], string> = {
  'plano-de-governo': '📄',
  'analise-curada': '🔎',
  partido: '🏛️',
  indefinido: '❓',
};

export function eixoParaIndice(eixo: EixoEspectro | null): number {
  if (!eixo) return -1;
  return EIXO_ORDER.indexOf(eixo);
}

export function formatarMoeda(valor: number | null): string {
  if (typeof valor !== 'number' || !Number.isFinite(valor)) return '—';
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

export function formatarData(value?: string | null): string {
  if (!value) return '—';
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date);
    }
  }
  return value;
}

export function iniciais(nome: string): string {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase();
}

/** Barra de espectro reutilizável (esquerda → direita). */
export function BarraEspectro({ eixo, base }: { eixo: EixoEspectro | null; base: PosicionamentoCandidato['base'] }) {
  const idx = eixoParaIndice(eixo);

  if (idx < 0) {
    return (
      <div className="relative h-3 w-full bg-gray-200 border border-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-headline font-black uppercase text-gray-500">Não avaliado</span>
        </div>
      </div>
    );
  }

  const posicao = EIXO_BARRA[eixo as EixoEspectro];

  return (
    <div className="relative h-3 w-full bg-gradient-to-r from-red-400 via-yellow-400 to-indigo-500 border border-black">
      <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-black ${EIXO_CORES[eixo as EixoEspectro]} ${posicao}`} />
    </div>
  );
}
