// Monta a lista de perfis de alto interesse (Fase 3.6):
// liderancas (Camara/Senado/Congresso) + presidentes das casas + perfis com
// busca real do Search Console. Saida: JSON com {fonte,idOrigem,nome,partido,uf}.
const BASE = 'https://dadosabertos.camara.leg.br/api/v2';

async function j(url) {
  const r = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(url + ' -> ' + r.status);
  return r.json();
}

async function main() {
  const lider = await j('https://legis.senado.leg.br/dadosabertos/composicao/lideranca.json');
  const lista = Array.isArray(lider) ? lider : (lider.ListaLiderancas?.Lideranca ?? []);
  console.log('liderancas:', lista.length);

  // nomes-alvo de liderancas (camara CD, senado SF, congresso CN)
  const alvos = new Map(); // nome -> {casa, tipo}
  for (const l of lista) {
    const nome = l.nomeParlamentar || '';
    if (!nome) continue;
    if (!alvos.has(nome)) alvos.set(nome, { casa: l.casa, tipo: l.descricaoTipoLideranca || '' });
  }

  // presidentes das casas (busca por nome direto)
  const presidentes = ['Hugo Motta', 'Davi Alcolumbre'];

  // perfis com busca real (Search Console do usuario)
  const scPerfis = [
    { fonte: 'camara', idOrigem: '235800' },
    { fonte: 'senado', idOrigem: '3806' },
    { fonte: 'camara', idOrigem: '204536' },
    { fonte: 'senado', idOrigem: '5936' },
    { fonte: 'camara', idOrigem: '220708' },
    { fonte: 'camara', idOrigem: '204379' },
  ];

  const resultado = [];
  const vistos = new Set();

  function add(fonte, idOrigem, nome, partido, uf) {
    const key = fonte + '/' + idOrigem;
    if (vistos.has(key)) return;
    vistos.add(key);
    resultado.push({ fonte, idOrigem, nome, partido, uf });
  }

  // 1) perfis do Search Console
  for (const p of scPerfis) add(p.fonte, p.idOrigem, '', '', '');

  // 2) liderancas: casa CD -> busca deputado; SF -> busca senador
  const depList = (await j(`${BASE}/deputados?ordem=ASC&ordenarPor=nome&itens=100`)).dados ?? [];
  const depById = new Map(depList.map((d) => [d.id, d]));
  const senList = (await j('https://legis.senado.leg.br/dadosabertos/senador/lista/atual')).ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar ?? [];
  const senByNome = new Map();
  for (const s of senList) {
    const info = s.IdentificacaoParlamentar ?? {};
    senByNome.set((info.NomeParlamentar || '').toLowerCase(), s);
  }

  for (const [nome, meta] of alvos) {
    if (!nome.includes(' ')) continue; // precisa nome composto
    if (resultado.length >= 46) break;
    if (meta.casa === 'SF' || meta.casa === 'CN') {
      const s = senByNome.get(nome.toLowerCase());
      if (s) {
        const info = s.IdentificacaoParlamentar ?? {};
        add('senado', String(info.CodigoParlamentar), nome, info.SiglaPartidoParlamentar, info.UfParlamentar);
      }
    } else if (meta.casa === 'CD') {
      // busca deputado pelo nome
      try {
        const r = await j(`${BASE}/deputados?nome=${encodeURIComponent(nome)}&itens=1`);
        const d = (r.dados ?? [])[0];
        if (d) add('camara', String(d.id), d.nome, d.siglaPartido, d.siglaUf);
      } catch { /* ignora */ }
    }
  }

  // 3) presidentes das casas
  for (const nome of presidentes) {
    try {
      const r = await j(`${BASE}/deputados?nome=${encodeURIComponent(nome)}&itens=1`);
      const d = (r.dados ?? [])[0];
      if (d) add('camara', String(d.id), d.nome, d.siglaPartido, d.siglaUf);
    } catch { /* ignora */ }
    const s = senByNome.get(nome.toLowerCase());
    if (s) {
      const info = s.IdentificacaoParlamentar ?? {};
      add('senado', String(info.CodigoParlamentar), nome, info.SiglaPartidoParlamentar, info.UfParlamentar);
    }
  }

  // 4) completa com deputados alfabeticos ate 48
  for (const d of depList) {
    if (resultado.length >= 48) break;
    add('camara', String(d.id), d.nome, d.siglaPartido, d.siglaUf);
  }

  // preenche nomes vazios (perfis do SC) consultando a API
  for (const p of resultado) {
    if (p.nome) continue;
    try {
      if (p.fonte === 'camara') {
        const d = await j(`${BASE}/deputados/${p.idOrigem}`);
        const x = d.dados ?? {};
        p.nome = x.nomeEleitoral || x.nome || '';
        p.partido = x.siglaPartido || '';
        p.uf = x.siglaUf || '';
      } else {
        const s = senByNome.get('');
      }
    } catch { /* ignora */ }
  }

  console.log(JSON.stringify(resultado, null, 1));
  console.log('TOTAL:', resultado.length);
}

main().catch((e) => { console.error(e); process.exit(1); });
