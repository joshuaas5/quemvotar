const fs = require('fs');

function fixHero() {
  const file = 'src/components/Hero.tsx';
  let text = fs.readFileSync(file, 'utf-8');
  
  text = text.replace(
    '<section className="relative overflow-hidden pt-20 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">',
    \<section className="relative w-full border-b-4 border-black">
      {/* Background decoration - brutalist color blocks on the sides */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full bg-[#ffb3c6] border-r-4 border-black"></div>
        <div className="w-1/2 h-full bg-[#a9def9]"></div>
      </div>
      <div className="relative max-w-7xl mx-auto bg-[#f7f6f2] border-x-4 border-black px-6 pt-20 pb-24 flex flex-col items-center text-center">\
  );
  
  text = text.replace(
    'style={{ backgroundImage: \\'radial-gradient(circle, #000 1px, transparent 1px)\\', backgroundSize: \\'18px 18px\\' }}',
    'style={{ backgroundImage: \\'radial-gradient(circle, #000 2px, transparent 2px)\\', backgroundSize: \\'24px 24px\\' }}'
  );

  text = text.replace(
    '<span className="bg-primary-container px-4 text-on-primary-fixed">ESCURO</span>',
    '<span className="bg-primary-container px-4 text-on-primary-fixed border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block transform -rotate-2">ESCURO</span>'
  );

  text = text.replace(
    '<p className="font-body font-medium text-xl md:text-2xl max-w-3xl mb-12 uppercase">',
    '<p className="font-body font-medium text-xl md:text-2xl max-w-3xl mb-12 uppercase bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">'
  );

  text = text.replace(
    '<span className="flex items-center gap-2 bg-on-background text-white px-3 py-1">',
    '<span className="flex items-center gap-2 bg-[#d0f4de] text-black border-2 border-black px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">'
  );
  text = text.replace(
    '<span className="flex items-center gap-2 bg-on-background text-white px-3 py-1">',
    '<span className="flex items-center gap-2 bg-[#fcf6bd] text-black border-2 border-black px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">'
  );

  fs.writeFileSync(file, text, 'utf-8');
}

function fixHighlights() {
  const file = 'src/components/Highlights.tsx';
  let text = fs.readFileSync(file, 'utf-8');

  text = text.replace(
    'const visual = getPartyVisualEmoji(candidato.partido);',
    \const visual = getPartyVisualEmoji(candidato.partido);
              const pastelBg = ['bg-[#fde2e4]', 'bg-[#e9edc9]', 'bg-[#e2ece9]', 'bg-[#fcf6bd]', 'bg-[#d0f4de]', 'bg-[#a9def9]', 'bg-[#e4c1f9]'][index % 7];\
  );

  text = text.replace(
    'className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:shadow-[0_10px_20px_rgba(0,0,0,0.14)] transition-shadow duration-200 group"',
    'className={\\ border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 group\}'
  );

  text = text.replace(
    /<div className=\{\\ \ px-4 py-3 font-headline font-black uppercase flex justify-between items-center\}>/g,
    '<div className={\\ \ px-4 py-3 font-headline font-black uppercase flex justify-between items-center border-b-4 border-black\}>'
  );

  text = text.replace(
    'className="aspect-square relative overflow-hidden border-b-4 border-black grayscale group-hover:grayscale-0 transition-all duration-300"',
    'className="aspect-square relative overflow-hidden border-b-4 border-black grayscale group-hover:grayscale-0 transition-all duration-300 bg-white"'
  );

  text = text.replace(
    'className="w-full h-full object-cover object-top"',
    'className="w-full h-full object-cover object-top mix-blend-multiply"'
  );

  text = text.replace(
    'className="w-full bg-on-background text-white font-headline font-black py-4 uppercase border-4 border-transparent hover:bg-white hover:text-black hover:border-black transition-all cursor-pointer text-center"',
    'className="w-full bg-white text-black font-headline font-black py-4 uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer text-center"'
  );

  fs.writeFileSync(file, text, 'utf-8');
}

function fixCards() {
  const file = 'src/app/parlamentares/page.tsx';
  let text = fs.readFileSync(file, 'utf-8');

  text = text.replace(
    'resultados.map((perfil) => {',
    'resultados.map((perfil, index) => {'
  );

  text = text.replace(
    'const visual = getPartyVisualEmoji(perfil.partido);',
    \const visual = getPartyVisualEmoji(perfil.partido);
              const pastelBg = ['bg-[#fde2e4]', 'bg-[#e9edc9]', 'bg-[#e2ece9]', 'bg-[#fcf6bd]', 'bg-[#d0f4de]', 'bg-[#a9def9]', 'bg-[#e4c1f9]'][index % 7];\
  );

  text = text.replace(
    'className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:shadow-[0_10px_20px_rgba(0,0,0,0.14)] transition-shadow duration-200"',
    'className={\\ border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-200\}'
  );

  text = text.replace(
    'className="aspect-square border-b-4 border-black bg-surface-container-high overflow-hidden"',
    'className="aspect-square border-b-4 border-black bg-white overflow-hidden grayscale hover:grayscale-0 transition-all duration-300"'
  );

  text = text.replace(
    'className="w-full h-full object-cover object-top"',
    'className="w-full h-full object-cover object-top mix-blend-multiply"'
  );

  text = text.replace(
    'className="w-full bg-on-background text-white font-headline font-black py-4 uppercase border-4 border-transparent hover:bg-white hover:text-black hover:border-black transition-all text-center"',
    'className="w-full bg-white text-black font-headline font-black py-4 uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all text-center"'
  );

  fs.writeFileSync(file, text, 'utf-8');
}

fixHero();
fixHighlights();
fixCards();
