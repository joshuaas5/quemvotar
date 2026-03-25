import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-16">
        <h1 className="font-headline font-black text-5xl uppercase mb-6">Termos de Uso</h1>
        <p className="font-body font-medium text-lg">
          Esta página será detalhada na próxima revisão jurídica e operacional do projeto.
        </p>
      </main>
      <Footer />
    </div>
  );
}
