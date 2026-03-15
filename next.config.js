/** @type {import('next').NextConfig} */
const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*/",
        destination: `${apiUrl}/:path*/`,
      },
      {
        source: "/api/v1/:path*",
        destination: `${apiUrl}/:path*/`,
      },
    ];
  },
  output: "standalone",
};

module.exports = nextConfig;
