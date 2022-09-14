/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'encrypted-tbn0.gstatic.com', 'res.cloudinary.com'],
  },
  env: {
    NEXTJS_APP_BASE_URL: 'http://localhost:9600',
  },
};

module.exports = nextConfig;
