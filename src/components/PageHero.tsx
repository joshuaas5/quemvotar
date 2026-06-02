interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  accent?: 'yellow' | 'cyan' | 'pink' | 'green' | 'purple' | 'orange';
  stat?: {
    value: string;
    label: string;
  };
}

const ACCENT_CLASSES = {
  yellow: 'bg-[#FFD709]',
  cyan: 'bg-[#9BF6FF]',
  pink: 'bg-[#FFB3D9]',
  green: 'bg-[#C8FF8C]',
  purple: 'bg-[#D7B8FF]',
  orange: 'bg-[#FFC27A]',
};

export default function PageHero({ eyebrow, title, description, accent = 'yellow', stat }: PageHeroProps) {
  const accentClass = ACCENT_CLASSES[accent];

  return (
    <section className="relative border-4 border-black bg-[#111827] text-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      <div className={`absolute -right-16 -top-16 w-44 h-44 ${accentClass} border-4 border-black rotate-12`} />
      <div className="absolute right-16 bottom-8 w-24 h-24 bg-[#FF4D8D] border-4 border-black -rotate-12 hidden md:block" />
      <div className="absolute left-1/2 -bottom-12 w-36 h-36 bg-[#9BF6FF] border-4 border-black rotate-45 hidden lg:block" />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 md:gap-10 p-6 md:p-10 lg:p-12">
        <div>
          <p className={`${accentClass} text-black font-label font-black uppercase text-xs md:text-sm border-2 border-black px-3 py-1 w-max mb-5`}>
            {eyebrow}
          </p>
          <h1 className="font-headline font-black text-4xl md:text-6xl lg:text-7xl uppercase leading-none mb-5 max-w-5xl">
            {title}
          </h1>
          <p className="font-body font-bold text-base md:text-xl uppercase opacity-90 leading-relaxed max-w-4xl">
            {description}
          </p>
        </div>

        <aside className="bg-white text-black border-4 border-black p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(255,215,9,1)] h-max">
          <p className="font-label font-black uppercase text-xs opacity-70 mb-2">QuemVotar</p>
          <p className="font-headline font-black text-4xl uppercase leading-none">{stat?.value ?? 'Dados'}</p>
          <p className="font-body font-bold text-sm uppercase mt-3">{stat?.label ?? 'Fontes públicas, método claro e revisão editorial.'}</p>
        </aside>
      </div>
    </section>
  );
}
