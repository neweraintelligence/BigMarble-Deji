/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '**',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    // Add explicit alias for @ to resolve imports in Docker builds
    config.resolve.alias['@'] = path.resolve(__dirname)
    return config
  },
}

module.exports = nextConfig