import { describe, expect, it } from 'vitest';
import { calcularEixoUsuario, ordenarMatches, pontuarCandidato, type CandidatoMatchLite } from './candidatos';
import type { UserAnswersMap } from './calculator';

function candidato(parcial: Partial<CandidatoMatchLite>): CandidatoMatchLite {
  return {
    id: 1,
    nomeUrna: 'TESTE',
    partido: 'PT',
    cargoCodigo: 1,
    cargo: 'Presidente',
    uf: 'BR',
    numero: 13,
    situacao: 'Aguardando julgamento',
    coligacao: null,
    foto: false,
    mandato: false,
    reeleicao: false,
    eixo: 'centro',
    base: 'partido',
    baseLabel: 'Posição do partido',
    confianca: 0.6,
    ...parcial,
  };
}

const respostasEsquerda: UserAnswersMap = {
  pvt: { score: 1, weight: 1 },
  impostos: { score: 5, weight: 1 },
  drogas: { score: 5, weight: 1 },
  armas: { score: 1, weight: 1 },
  cotas: { score: 5, weight: 1 },
  abor: { score: 5, weight: 1 },
  religiao: { score: 1, weight: 1 },
  clt: { score: 1, weight: 1 },
  meio_amb: { score: 5, weight: 1 },
  agr: { score: 1, weight: 1 },
};

const respostasDireita: UserAnswersMap = {
  pvt: { score: 5, weight: 1 },
  impostos: { score: 1, weight: 1 },
  drogas: { score: 1, weight: 1 },
  armas: { score: 5, weight: 1 },
  cotas: { score: 1, weight: 1 },
  abor: { score: 1, weight: 1 },
  religiao: { score: 5, weight: 1 },
  clt: { score: 5, weight: 1 },
  meio_amb: { score: 1, weight: 1 },
  agr: { score: 5, weight: 1 },
};

describe('calcularEixoUsuario', () => {
  it('respostas progressistas → esquerda', () => {
    const resultado = calcularEixoUsuario(respostasEsquerda);
    expect(resultado.indice).toBeLessThanOrEqual(1);
  });

  it('respostas conservadoras → direita', () => {
    const resultado = calcularEixoUsuario(respostasDireita);
    expect(resultado.indice).toBeGreaterThanOrEqual(3);
  });

  it('sem respostas → centro (neutro)', () => {
    const resultado = calcularEixoUsuario({});
    expect(resultado.indice).toBe(2);
  });
});

describe('pontuarCandidato', () => {
  it('candidato no mesmo eixo pontua alto', () => {
    const resultado = pontuarCandidato(0, candidato({ eixo: 'esquerda', confianca: 1 }));
    expect(resultado.match).toBe(100);
  });

  it('candidato em eixo oposto pontua baixo', () => {
    const resultado = pontuarCandidato(0, candidato({ eixo: 'direita', confianca: 1 }));
    expect(resultado.match).toBe(0);
  });

  it('candidato sem eixo não quebra (match 0)', () => {
    const resultado = pontuarCandidato(2, candidato({ eixo: null, base: 'indefinido', baseLabel: 'Não avaliado' }));
    expect(resultado.match).toBe(0);
  });

  it('confiança maior valoriza o eixo (base sólida conta mais)', () => {
    const alta = pontuarCandidato(2, candidato({ eixo: 'centro', confianca: 0.95 }));
    const baixa = pontuarCandidato(2, candidato({ eixo: 'centro', confianca: 0.1 }));
    expect(alta.match).toBeGreaterThan(baixa.match);
  });
});

describe('ordenarMatches', () => {
  it('ordena do maior para o menor match', () => {
    const lista = [
      candidato({ id: 1, eixo: 'esquerda', confianca: 1 }),
      candidato({ id: 2, eixo: 'direita', confianca: 1 }),
      candidato({ id: 3, eixo: 'centro', confianca: 1 }),
    ];
    const ordenado = ordenarMatches(0, lista);
    expect(ordenado[0].candidato.id).toBe(1);
    expect(ordenado[2].candidato.id).toBe(2);
  });
});
