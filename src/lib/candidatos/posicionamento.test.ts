import { describe, expect, it } from 'vitest';
import { getPosicionamento, PARTIDOS_ESPECTRO } from './posicionamento';
import { analisarPlanoGoverno } from './plano-governo';
import { ANALISE_CURADA_2026 } from './analise-curada';

describe('getPosicionamento — camadas', () => {
  it('usa a análise curada quando existe (camada 1)', () => {
    const pos = getPosicionamento({
      idTse: 280002542548, // Lula
      nome: 'Lula',
      partido: 'PT',
      cargo: 'presidente',
      cargoCodigo: 1,
    });
    expect(pos.base).toBe('analise-curada');
    expect(pos.eixo).toBe('esquerda');
    expect(pos.analisadoEm).toBeTruthy();
  });

  it('usa o plano de governo quando há texto (camada 2)', () => {
    const pos = getPosicionamento({
      idTse: 999999001,
      nome: 'Candidato Teste',
      partido: 'PSD',
      cargo: 'governador',
      cargoCodigo: 3,
      planoTexto:
        'Vamos privatizar estatais, cortar gastos públicos, reduzir impostos e flexibilizar a legislação trabalhista. Menos Estado, mais liberdade econômica e empreendedorismo. Defendemos valores cristãos e a família tradicional, com endurecimento penal e tolerância zero contra o crime.',
    });
    expect(pos.base).toBe('plano-de-governo');
    expect(['direita', 'centro-direita']).toContain(pos.eixo);
    expect(pos.resumo.length).toBeGreaterThan(20);
  });

  it('cai para o partido quando não há plano nem análise curada (camada 3)', () => {
    const pos = getPosicionamento({
      idTse: 999999002,
      nome: 'Deputado Teste',
      partido: 'PSOL',
      cargo: 'deputado-federal',
      cargoCodigo: 6,
    });
    expect(pos.base).toBe('partido');
    expect(pos.eixo).toBe('esquerda');
    expect(pos.avisos.length).toBeGreaterThan(0);
  });

  it('legislativo sem plano é rotulado como estimativa pelo partido', () => {
    const pos = getPosicionamento({
      idTse: 999999003,
      nome: 'Senador Teste',
      partido: 'PL',
      cargo: 'senador',
      cargoCodigo: 5,
    });
    expect(pos.base).toBe('partido');
    expect(pos.resumo.toLowerCase()).toContain('sem plano de governo obrigatório');
  });

  it('partido desconhecido → indefinido (honestidade)', () => {
    const pos = getPosicionamento({
      idTse: 999999004,
      nome: 'Candidato X',
      partido: 'PARTIDO-INEXISTENTE',
      cargo: 'senador',
      cargoCodigo: 5,
    });
    expect(pos.base).toBe('indefinido');
    expect(pos.eixo).toBeNull();
  });
});

describe('analisarPlanoGoverno — motor determinístico', () => {
  it('plano à esquerda → eixo de esquerda', () => {
    const resultado = analisarPlanoGoverno(
      'Defendemos a taxação de grandes fortunas, a reforma agrária, a valorização do salário mínimo, ' +
        'os direitos trabalhistas, o fortalecimento da CLT, a transição ecológica, o combate às desigualdades ' +
        'e a participação social. Estado forte, programas sociais e transferência de renda para reduzir a pobreza.',
    );
    expect(['esquerda', 'centro-esquerda']).toContain(resultado.eixo);
    expect(resultado.confianca).toBeGreaterThan(0.3);
    expect(resultado.temas.length).toBeGreaterThan(0);
  });

  it('plano à direita → eixo de direita', () => {
    const resultado = analisarPlanoGoverno(
      'Defendemos a privatização de estatais, corte de gastos, teto de gastos, redução de impostos, ' +
        'liberalização comercial, desregulamentação, flexibilização trabalhista, meritocracia, ' +
        'valores cristãos, família tradicional e endurecimento penal com redução da maioridade penal.',
    );
    expect(['direita', 'centro-direita']).toContain(resultado.eixo);
    expect(resultado.totalMarcacoes).toBeGreaterThan(3);
  });

  it('texto curto → confiança baixa, nunca quebra', () => {
    const resultado = analisarPlanoGoverno('Plano de governo resumido.');
    expect(resultado.confianca).toBeLessThan(0.2);
  });
});

describe('cobertura da análise curada', () => {
  it('toda análise curada tem data, temas e resumo', () => {
    const entradas = Object.values(ANALISE_CURADA_2026);
    expect(entradas.length).toBeGreaterThan(10);
    for (const entrada of entradas) {
      expect(entrada.analisadoEm).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entrada.resumo.length).toBeGreaterThan(50);
      expect(entrada.temas.length).toBeGreaterThan(0);
      expect(entrada.confianca).toBeGreaterThan(0);
    }
  });

  it('todo partido mapeado tem eixo válido e busca é case-insensitive', () => {
    for (const [sigla, meta] of Object.entries(PARTIDOS_ESPECTRO)) {
      expect(['esquerda', 'centro-esquerda', 'centro', 'centro-direita', 'direita']).toContain(meta.eixo);
      expect(sigla.length).toBeGreaterThan(0);
    }
    // sigla oficial do PCdoB usa caixa mista — a busca normaliza.
    expect(getPosicionamento({ idTse: 1, nome: 'X', partido: 'pcdob', cargo: 'deputado-federal', cargoCodigo: 6 }).eixo).toBe('esquerda');
  });
});
