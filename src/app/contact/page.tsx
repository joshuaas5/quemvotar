import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-16">
        <h1 className="font-headline font-black text-5xl uppercase mb-6">Contato</h1>
        <p className="font-body font-medium text-lg">
          Esta p�gina ser�detalhada na pr�xima revis�o de conte�do do projeto.
        </p>
      </main>
      <Footer />
    </div>
  );
}
