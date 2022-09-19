/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'encrypted-tbn0.gstatic.com', 'res.cloudinary.com'],
  },
  env: {},
};

module.exports = nextConfig;
