import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/word',
        destination: '/word/sunday-video',
        permanent: true,
      },
      {
        source: '/school',
        destination: '/school/kids-elementary',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
