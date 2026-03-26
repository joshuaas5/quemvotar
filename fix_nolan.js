const fs = require('fs');
const filepath = 'src/app/perfil/[fonte]/[id]/page.tsx';
let c = fs.readFileSync(filepath, 'utf8');

const replaces = [
  [/p\u00C3\u00BAblica/g, 'p\u00FAblica'],
  [/presen\u00C3\u00A7a/g, 'presen\u00E7a'],
  [/s\u00C3\u00A9rie/g, 's\u00E9rie'],
  [/vota\u00C3\u00A7\u00C3\u00B5es/g, 'vota\u00E7\u00F5es'],
  [/organiza\u00C3\u00A7\u00C3\u00A3o/g, 'organiza\u00E7\u00E3o'],
  [/pol\u00C3\u00ADtico/g, 'pol\u00EDtico'],
  [/classifica\u00C3\u00A7\u00C3\u00A3o/g, 'classifica\u00E7\u00E3o'],
  [/dispon\u00C3\u00ADvel/g, 'dispon\u00EDvel'],
  [/sess\u00C3\u00B5es/g, 'sess\u00F5es'],
  [/r\u00C3\u00A1pida/g, 'r\u00E1pida'],
  [/mat\u00C3\u00A9ria/g, 'mat\u00E9ria'],
  [/Atualiza\u00C3\u00A7\u00C3\u00A3o/g, 'Atualiza\u00E7\u00E3o'],
  [/N\u00C3\u00A3o/g, 'N\u00E3o'],
  [/n\u00C3\u00A3o/g, 'n\u00E3o'],
  [/ç/g, '\u00E7'],
  [/õ/g, '\u00F5'],
  [/ú/g, '\u00FA'],
  [/é/g, '\u00E9'],
  [/ã/g, '\u00E3'],
  [/í/g, '\u00ED'],
  [/ê/g, '\u00EA'],
  [//g, '\u2014'],
  [/á/g, '\u00E1'],
  [/â/g, '\u00E2'],
  [/ó/g, '\u00F3'],
  [/econ.mica/gi, 'econ\u00F4mica'],
  [/LIBERT.RIO/gi, 'LIBERT\u00C1RIO']
];

replaces.forEach(r => c = c.replace(r[0], r[1]));

const newChartParts = [
  'function renderNolanChart(perfil: PerfilDetalhadoPublico) {',
  '  const economia = perfil.ranking ? (perfil.ranking.nota / 10) * 10 : 50;',
  '  let costumes = 50;',
  '  if(perfil.governismo) costumes = 30 + (perfil.governismo.percentualFavoravel * 0.4);',
  '  const xPos = 100 + (economia) - (costumes);',
  '  const yPos = 200 - (economia) - (costumes);',
  '  return (',
  '    <section className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mt-8">',
  '      <h2 className="font-headline font-black text-3xl uppercase mb-3 text-center">Diagrama de Nolan</h2>',
  '      <p className="font-body font-medium mb-6 opacity-80 text-center max-w-2xl mx-auto">Posicionamento aproximado dos votos do parlamentar em temas de liberdade econ\u00F4mica e costumes.</p>',
  '      <div className="flex flex-col items-center mb-6 overflow-visible">',
  '        <svg viewBox="-20 -20 240 240" className="w-[100%] max-w-[340px] drop-shadow-md">',
  '          <polygon points="100,100 50,50 100,0 150,50" fill="#69db7c" />',
  '          <polygon points="100,100 150,50 200,100 150,150" fill="#4dabf7" />',
  '          <polygon points="100,100 150,150 100,200 50,150" fill="#e9ecef" />',
  '          <polygon points="100,100 50,150 0,100 50,50" fill="#ffa8a8" />',
  '          <line x1="100" y1="0" x2="100" y2="200" stroke="#000" strokeWidth="2" opacity="0.2" strokeDasharray="4 4" />',
  '          <line x1="0" y1="100" x2="200" y2="100" stroke="#000" strokeWidth="2" opacity="0.2" strokeDasharray="4 4" />',
  '          <polygon points="100,0 200,100 100,200 0,100" fill="none" stroke="#000" strokeWidth="4" strokeLinejoin="round" />',
  '          <g transform="translate(100, 30)"><rect x="-42" y="-12" width="84" height="18" fill="rgba(255,255,255,0.85)" rx="4"/><text x="0" y="2" textAnchor="middle" fill="#000" fontSize="11" fontWeight="900" className="font-headline" letterSpacing="1">LIBERT\u00C1RIO</text></g>',
  '          <g transform="translate(165, 100)"><rect x="-30" y="-12" width="60" height="18" fill="rgba(255,255,255,0.85)" rx="4"/><text x="0" y="2" textAnchor="middle" fill="#000" fontSize="11" fontWeight="900" className="font-headline" letterSpacing="1">DIREITA</text></g>',
  '          <g transform="translate(100, 172)"><rect x="-38" y="-12" width="76" height="18" fill="rgba(255,255,255,0.85)" rx="4"/><text x="0" y="2" textAnchor="middle" fill="#000" fontSize="11" fontWeight="900" className="font-headline" letterSpacing="1">ESTATISTA</text></g>',
  '          <g transform="translate(35, 100)"><rect x="-36" y="-12" width="72" height="18" fill="rgba(255,255,255,0.85)" rx="4"/><text x="0" y="2" textAnchor="middle" fill="#000" fontSize="11" fontWeight="900" className="font-headline" letterSpacing="1">ESQUERDA</text></g>',
  '          <circle cx={xPos} cy={yPos} r="7" fill="#111" stroke="#fff" strokeWidth="2.5" className="transition-all duration-1000 ease-out" />',
  '        </svg>',
  '      </div>',
  '      <div className="grid grid-cols-2 gap-4 mt-2 max-w-[400px] mx-auto text-sm">',
  '        <div className="bg-[#f8f9fa] border-2 border-black p-3 text-center transition-colors hover:bg-white">',
  '          <p className="font-bold opacity-70 text-xs uppercase mb-1 font-label block">ECONOMIA (Livre Mercado)</p>',
  '          <p className="font-black text-2xl font-headline">{economia.toFixed(0)}<span className="text-xs font-bold opacity-60">/100</span></p>',
  '        </div>',
  '        <div className="bg-[#f8f9fa] border-2 border-black p-3 text-center transition-colors hover:bg-white">',
  '          <p className="font-bold opacity-70 text-xs uppercase mb-1 font-label block">COSTUMES (Progresso)</p>',
  '          <p className="font-black text-2xl font-headline">{costumes.toFixed(0)}<span className="text-xs font-bold opacity-60">/100</span></p>',
  '        </div>',
  '      </div>',
  '    </section>',
  '  );',
  '}'
].join('\n');

const manualIndex = c.indexOf('function renderNolanChart');
if(manualIndex > -1){
  let endIndex = c.indexOf('</section>', manualIndex);
  endIndex = c.indexOf('}', endIndex);
  c = c.substring(0, manualIndex) + newChartParts + c.substring(endIndex + 1);
  fs.writeFileSync(filepath, c, 'utf8');
  console.log('Feito!');
} else {
  console.log('N\u00E3o achou o renderNolanChart no arquivo!');
}

