/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // basePath : '/frontend',
  // output: "export",
  reactStrictMode: false,
  // images: {
  //   domains: ['52.136.38.134'], // Add the domain here
  // },
  eslint: {
    ignoreDuringBuilds: true, 
  },
}

module.exports = nextConfig
