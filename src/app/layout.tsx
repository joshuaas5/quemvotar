import type { Metadata } from "next";
import { Space_Grotesk, Work_Sans } from "next/font/google";
import Script from "next/script";
import AdSenseAutoAds from "@/components/AdSenseAutoAds";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
});

const siteUrl = "https://quemvotar.com.br";
const defaultTitle = "QuemVotar - Descubra quem é quem na política";
const defaultDescription =
  "Consulte parlamentares em exercício com dados oficiais e rastreáveis da Câmara dos Deputados e do Senado Federal. Notas, presença, gastos, votações e match eleitoral.";

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: "%s | QuemVotar",
  },
  description: defaultDescription,
  keywords: [
    "eleições",
    "política",
    "dados públicos",
    "congresso",
    "quemvotar",
    "candidatos",
    "deputados",
    "senadores",
    "partidos",
    "ranking dos políticos",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "QuemVotar",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "QuemVotar - Dados oficiais sobre políticos brasileiros",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? 'ca-pub-4642158915962893';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${workSans.variable} antialiased scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <style>{`.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }`}</style>
        {adsenseClient && (
          <meta name="google-adsense-account" content={adsenseClient} />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-background text-on-background font-body">
        <AdSenseAutoAds />
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="gtm"
            />
          </noscript>
        )}
        {children}

        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}

        {gtmId && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
