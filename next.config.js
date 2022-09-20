/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'encrypted-tbn0.gstatic.com', 'res.cloudinary.com'],
  },
  env: {
    ACCESS_TOKEN_KEY: 'secretkeyaccesstokenok',
    REFRESH_TOKEN_KEY: 'secretkeyrefreshtokenok',
    MONGODB_URI:
      'mongodb+srv://ngockhoi96:nOhAnnCFpeiAPoYe@cluster0.k5yfvio.mongodb.net/miki_shop?retryWrites=true&w=majority',
    GOOGLE_ID: '967258674012-vln6rpc61amovb916nhlbqg8u0n4sh96.apps.googleusercontent.com',
    GOOGLE_SECRET: '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',
    CLOUD_NAME: 'doa5p4v4z',
    API_KEY: '713324216691184',
    API_SECRET: 'UiCKSCwd-jKb_Bt8TvDbXnKf4Q8',
    BASE_URL: 'http://localhost:3000',
  },
};

module.exports = nextConfig;
