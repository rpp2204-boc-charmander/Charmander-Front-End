/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    AUTH: process.env.AUTH,
    STRAVA_ID: process.env.STRAVA_ID,
    STRAVA_SECRET: process.env.STRAVA_SECRET
  }
}

module.exports = nextConfig
