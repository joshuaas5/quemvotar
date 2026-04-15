import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { MatchClient } from '@/components/match/MatchClient';
import { getParlamentares } from '@/lib/api';

export const revalidate = 1800;

export default async function MatchPage() {
  const parlamentares = await getParlamentares();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <section className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="font-headline font-black text-5xl uppercase mb-4">Match eleitoral</h1>
            <p className="font-body font-bold text-lg uppercase opacity-80">
              Responda aos temas abaixo para encontrar parlamentares mais próximos do seu perfil
              político.
            </p>
          </section>

          <MatchClient parlamentares={parlamentares} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
