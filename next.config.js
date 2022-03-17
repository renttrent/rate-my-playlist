/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.scdn.co', 'https://i.scdn.co/', 'this-person-does-not-exist.com']
  }
}

module.exports = nextConfig
