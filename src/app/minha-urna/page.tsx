import type { Metadata } from 'next';
import { toolMetadata } from '@/lib/sharing/metadata';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHero from '@/components/PageHero';
import { MinhaUrnaView } from '@/components/candidatos/MinhaUrnaView';

export const metadata: Metadata = toolMetadata('Cola eleitoral 2026: monte, baixe e imprima', 'Monte sua cola grátis na ordem da urna: deputado federal, estadual ou distrital, dois senadores, governador e presidente.', '/minha-urna');

export default function MinhaUrnaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow qv-grid-bg py-10 md:py-16 px-4 md:px-6" style={{ paddingBottom: '80px' }}>
        <div className="max-w-4xl mx-auto space-y-8">
          <Breadcrumbs items={[{ label: 'Minha Urna' }]} />

          <PageHero
            eyebrow="Eleições Gerais · 04/10/2026"
            title="Minha cola eleitoral"
            description="Prepare as seis escolhas do 1º turno, baixe uma imagem e imprima para levar à votação. Sua lista fica neste navegador."
            accent="yellow"
            stat={{ value: 'Local', label: 'Nada é publicado; a lista fica apenas no navegador.' }}
          />

          <MinhaUrnaView />
        </div>
      </main>

      <Footer />
    </div>
  );
}
