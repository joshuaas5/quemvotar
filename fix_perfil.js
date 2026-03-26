const fs = require('fs');
const path = 'src/app/perfil/[fonte]/[id]/page.tsx';
let c = fs.readFileSync(path, 'utf8');

c = c.replace(/Ã§/g, 'ç')
     .replace(/Ãµ/g, 'õ')
     .replace(/Ãº/g, 'ú')
     .replace(/Ã©/g, 'é')
     .replace(/Ã£/g, 'ã')
     .replace(/Ã­/g, 'í')
     .replace(/Ãª/g, 'ê')
     .replace(/Â—/g, '—')
     .replace(/Ã¡/g, 'á');

const nolanCode = "\n" +
"function renderNolanChart(perfil: PerfilDetalhadoPublico) {\n" +
"  const economia = perfil.ranking ? (perfil.ranking.nota / 10) * 10 : 50; \n" +
"  let costumes = 50;\n" +
"  if(perfil.governismo) {\n" +
"    costumes = 30 + (perfil.governismo.percentualFavoravel * 0.4);\n" +
"  }\n" +
"  \n" +
"  return (\n" +
"    <section className=\"bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mt-8\">\n" +
"      <h2 className=\"font-headline font-black text-3xl uppercase mb-3\">Diagrama de Nolan</h2>\n" +
"      <p className=\"font-body font-medium mb-6 opacity-80\">Posicionamento aproximado dos votos do parlamentar em temas de liberdade econômica e costumes.</p>\n" +
"      \n" +
"      <div className=\"flex flex-col items-center mb-4 overflow-hidden\">\n" +
"        <div className=\"relative w-[200px] h-[200px] border-4 border-black font-label text-[10px] font-bold uppercase origin-center rotate-45 mt-8 mb-8\">\n" +
"            <div className=\"absolute top-0 left-0 w-1/2 h-1/2 border-r-4 border-b-4 border-black bg-blue-300 flex items-center justify-center -rotate-45\"><span className=\"translate-x-[-15px] translate-y-[-15px]\">Esquerda</span></div>\n" +
"            <div className=\"absolute top-0 right-0 w-1/2 h-1/2 border-b-4 border-black bg-green-300 flex items-center justify-center -rotate-45\"><span className=\"translate-x-[15px] translate-y-[-15px]\">Libertário</span></div>\n" +
"            <div className=\"absolute bottom-0 left-0 w-1/2 h-1/2 border-r-4 border-black bg-red-300 flex items-center justify-center -rotate-45\"><span className=\"translate-x-[-15px] translate-y-[15px]\">Estatista</span></div>\n" +
"            <div className=\"absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-300 flex items-center justify-center -rotate-45\"><span className=\"translate-x-[15px] translate-y-[15px]\">Direita</span></div>\n" +
"            \n" +
"            <div \n" +
"              className=\"absolute w-4 h-4 bg-black rounded-full shadow-lg z-10 -rotate-45\"\n" +
"              style={{\n" +
"                left: calc(\% - 8px),\n" +
"                top: calc(\% - 8px),\n" +
"                transition: 'all 1s ease-in-out'\n" +
"              }}\n" +
"            ></div>\n" +
"        </div>\n" +
"      </div>\n" +
"    </section>\n" +
"  );\n" +
"}\n";

c = c.replace('export default async function PerfilPage', nolanCode + '\nexport default async function PerfilPage');

c = c.replace('{partido?.definicaoCurta ? (', '{renderNolanChart(perfil)}\n\n          {partido?.definicaoCurta ? (');

const regex = /<div className="bg-yellow-100 border-4 border-black p-6 shadow-\[4px_4px_0px_0px_rgba\(0,0,0,1\)\] text-black mt-6">[\s\S]*?<\/div>/g;
c = c.replace(regex, '');

fs.writeFileSync(path, c, 'utf8');
