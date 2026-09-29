import { describe, expect, it, vi, afterEach } from 'vitest';
import { consultarResultados, interpretarResultado, localizarEleicao, urlResultado } from './tse';
const config = { f: 'o', pl: [{ c: 'ele2026', dt: '04/10/2026', e: [{ cd: '6259', t: '1', tp: '1', abr: [{ cd: 'br', cp: [{ cd: '3' }, { cd: '8' }] }] }] }] };
const fixture = (overrides = {}) => ({ f: 'o', ele: '6259', t: '1', cdabr: 'sp', tpabr: 'uf', sup: 'n', dv: 's', dg: '04/10/2026', hg: '20:12:00', tf: 'n', and: 'p', s: { pst: '62,5' }, carg: [{ cd: '3', agr: [{ par: [{ sg: 'ABC', cand: [{ n: '10', sqcand: '1', nmu: 'Exemplo A', e: 's', st: '', vap: '10000', pvap: '55,4', dvt: 'Válido' }, { n: '20', sqcand: '2', nmu: 'Exemplo B', e: 'n', st: '', vap: '9000', pvap: '44,6', dvt: 'Válido' }] }] }] }], ...overrides });
afterEach(() => vi.unstubAllGlobals());
describe('divulgação oficial 2026', () => {
  it('não consulta o TSE antes do encerramento previsto', async () => {
    const fetcher = vi.fn(); vi.stubGlobal('fetch', fetcher);
    expect((await consultarResultados('BR', 1, 1, Date.parse('2026-09-29'))).fase).toBe('agendada');
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('localiza eleições estaduais cuja configuração tem abrangência BR no primeiro turno', () => {
    expect(localizarEleicao(config, 'SP', 3, 1)).toBe('6259');
    expect(localizarEleicao(config, 'DF', 8, 1)).toBe('6259');
    expect(localizarEleicao(config, 'SP', 3, 2)).toBeNull();
    expect(urlResultado('SP', 3, '6259')).toBe('https://resultados.tse.jus.br/oficial/ele2026/6259/dados/sp/sp-c0003-e006259-u.json');
  });
  it('não transforma liderança ou e=s em eleito durante a parcial', () => {
    const result = interpretarResultado(fixture(), 'SP', 3, 1, '6259');
    expect(result.secoes).toBe(62.5);
    expect(result.candidatos?.[0]).toMatchObject({ situacao: 'Apuração parcial', votos: 10000, percentual: 55.4 });
  });
  it('preserva 2º turno quando e=s no resultado final', () => {
    const data = fixture({ tf: 's', and: 'f' }); data.carg[0].agr[0].par[0].cand[0].st = '2º turno';
    expect(interpretarResultado(data, 'SP', 3, 1, '6259').candidatos?.[0].situacao).toBe('2º turno');
  });
  it('rejeita simulação, outra eleição e outra abrangência', () => {
    for (const data of [fixture({ f: 's' }), fixture({ ele: '544' }), fixture({ cdabr: 'br' })]) {
      expect(() => interpretarResultado(data, 'SP', 3, 1, '6259')).toThrow();
    }
  });
  it('não revela votos antes de dv=s', () => {
    expect(interpretarResultado(fixture({ dv: 'n' }), 'SP', 3, 1, '6259').candidatos).toEqual([]);
  });
});
