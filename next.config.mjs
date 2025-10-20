/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-2cb00cd498db403f87493524abf2de89.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
