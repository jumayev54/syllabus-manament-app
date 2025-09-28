/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/syllabus-manament-app' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/syllabus-manament-app/' : '',
  // Handle dynamic routes for static export
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
}

module.exports = nextConfig
