import type { Metadata } from "next";
import { Space_Grotesk, Work_Sans } from "next/font/google";
import { ToastProvider } from "@/components/Toast";
import { NavigationProvider } from "@/components/NavigationProvider";
import NavigationOverlay from "@/components/NavigationOverlay";
import BackToTop from "@/components/BackToTop";
import ConsentManager from "@/components/ConsentManager";
import { MinhaUrnaProvider } from "@/components/candidatos/MinhaUrnaProvider";
import { MinhaUrnaBar } from "@/components/candidatos/MinhaUrnaBar";
import { LoadingFeedback } from "@/components/LoadingFeedback";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const siteUrl = "https://www.quemvotar.com.br";
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
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "QuemVotar",
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/og-match-eleitoral.png`,
        width: 1731,
        height: 909,
        alt: "QuemVotar - Dados oficiais sobre políticos brasileiros",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [`${siteUrl}/og-match-eleitoral.png`],
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
  icons: {
    icon: [
      { url: "/icon.png?v=5", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico?v=5", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png?v=5",
    shortcut: "/favicon.ico?v=5",
  },
  manifest: "/manifest.json",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID ?? 'G-YDYV55PQYE';
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
// Sem rede de anúncio aprovada (ex.: AdSense), não há banner de cookies nem
// scripts de publicidade — o Analytics coleta livremente. Quando uma rede de
// anúncio for aprovada, define NEXT_PUBLIC_ADSENSE_CLIENT e o banner volta.
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? '';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${workSans.variable} antialiased scroll-smooth`}>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png?v=5" />
        <link rel="shortcut icon" href="/favicon.ico?v=5" />
        {adsenseClient && (
          <meta name="google-adsense-account" content={adsenseClient} />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-background text-on-background font-body">
        <Analytics />
        <MinhaUrnaProvider>
          <NavigationProvider>
            <ToastProvider>
              {children}
              <LoadingFeedback />
              <MinhaUrnaBar />
              <NavigationOverlay />
              <BackToTop />
            </ToastProvider>
          </NavigationProvider>
        </MinhaUrnaProvider>

        <ConsentManager adsenseClient={adsenseClient} gaId={gaId} gtmId={gtmId} />
      </body>
    </html>
  );
}
