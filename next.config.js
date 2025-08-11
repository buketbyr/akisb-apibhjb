/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // DİKKAT: output: 'export' KULLANMAYIN!
  // pages router kullanıyoruz, API routes gerekiyor.
};

module.exports = nextConfig;
