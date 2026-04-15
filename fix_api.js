const fs = require('fs');
let c = fs.readFileSync('src/lib/api.ts', 'utf8');
const start = c.indexOf('const [ranking');
const end = c.indexOf(']);', c.indexOf('const [presenca')) + 3;
const replacement = const [ranking, governismo, votacoesCamara, presenca, partidoResumo, temasCamara] = await Promise.all([
    withTimeout(fetchRankingForPerfil(perfil), null, 1500),
    withTimeout(fetchGovernismoForPerfil(perfil), null, 1500),
    fonte === 'camara'
      ? withTimeout(fetchCamaraVotesForPerfil(perfil), [] as PerfilDetalhadoPublico['votacoes'], 1500)
      : Promise.resolve([] as PerfilDetalhadoPublico['votacoes']),
    withTimeout(fetchAssiduidadeForPerfil(perfil), null, 1500),
    withTimeout(getPartido(perfil.partido), null, 1500),
    fonte === 'camara'
      ? withTimeout(fetchCamaraVoteThemesForPerfil(perfil), [] as PerfilDetalhadoPublico['temasVotacao'], 1500)
      : Promise.resolve([] as PerfilDetalhadoPublico['temasVotacao']),
  ]);;
if (start > -1 && end > -1) {
    c = c.substring(0, start) + replacement + c.substring(end);
    fs.writeFileSync('src/lib/api.ts', c, 'utf8');
    console.log('patched');
} else {
    console.log('not found');
}
