import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com a equipe do QuemVotar. Dúvidas, sugestões e parcerias.',
  alternates: { canonical: 'https://quemvotar.com.br/contact' },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-16">
        <h1 className="font-headline font-black text-5xl uppercase mb-6">Contato</h1>
        <p className="font-body font-medium text-lg">
          Esta página será detalhada na próxima revisão de conteúdo do projeto.
        </p>
      </main>
      <Footer />
    </div>
  );
}
