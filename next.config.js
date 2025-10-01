/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async rewrites() {
    return [
      { source: '/api/_ops/health', destination: '/api/ops/health' },
    ];
  },
  async redirects() {
    return [
      { source: '/Member', destination: '/member', permanent: true },
    ];
  },
};
module.exports = nextConfig;
