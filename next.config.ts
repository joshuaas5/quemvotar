import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.camara.leg.br", pathname: "/**" },
      { protocol: "https", hostname: "dadosabertos.camara.leg.br", pathname: "/**" },
      { protocol: "https", hostname: "www.senado.leg.br", pathname: "/**" },
      { protocol: "http", hostname: "www.senado.leg.br", pathname: "/**" },
      { protocol: "https", hostname: "legis.senado.leg.br", pathname: "/**" },
      { protocol: "https", hostname: "www.politicos.org.br", pathname: "/**" },
      { protocol: "https", hostname: "ranking.org.br", pathname: "/**" },
      { protocol: "https", hostname: "fakeimg.pl", pathname: "/**" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
