/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'hevruta-connect.onrender.com']
    }
  }
}

module.exports = nextConfig
