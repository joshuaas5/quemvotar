import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuemVotar - Consulte perfis politicos com fonte oficial.",
  description:
    "Busque parlamentares em exercicio com dados rastreaveis da Camara dos Deputados e do Senado Federal.",
  keywords: ["eleicoes", "politica", "dados publicos", "camara", "senado", "quemvotar"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="antialiased scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <style>{`.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }`}</style>
      </head>
      <body className="min-h-screen flex flex-col bg-background text-on-background font-body">
        {children}
      </body>
    </html>
  );
}
