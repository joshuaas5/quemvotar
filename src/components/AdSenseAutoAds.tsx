export default function AdSenseAutoAds() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? 'ca-pub-4642150915962893';
  if (!client) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}
