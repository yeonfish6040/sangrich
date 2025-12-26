import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  typescript: {
    // 빌드 시 타입 체킹 건너뛰기
    ignoreBuildErrors: true,
  },
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
