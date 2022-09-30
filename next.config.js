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
    GOOGLE_ID: '648607880723-hkc95468mv9na657f574obdbud3o9fah.apps.googleusercontent.com',
    GOOGLE_SECRET: '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',
    GOOGLE_EMAIL: 'ngockhoi9671@gmail.com',
    GOOGLE_EMAIL_REDIRECT: 'https://developers.google.com/oauthplayground',
    GOOGLE_OAUTH_RF_TOKEN:
      '1//04CZeIjUFyhQPCgYIARAAGAQSNwF-L9Irx5S3bniJN0f_hEHesCIq9Cj6TcOA3Seq8q4x6VwslHJ5nKKgY6ckMK1K9HSJR4oZW_w',
    CLOUD_NAME: 'doa5p4v4z',
    API_KEY: '713324216691184',
    API_SECRET: 'UiCKSCwd-jKb_Bt8TvDbXnKf4Q8',
    PRODUCTION_BASE_URL: 'https://miki-jewelry-quang-212.vercel.app',
    DEV_BASE_URL: 'http://localhost:3000',
    PUSHER_ID: '1482193',
    PUSHER_KEY: 'fb8e2c1822be76c549cc',
    PUSHER_SECRET: 'e6cbcf88db5535278f0b',
    PUSHER_CLUSTER: 'ap1',
  },
  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: '/api/:path*',
  //       headers: [
  //         { key: 'Access-Control-Allow-Credentials', value: 'true' },
  //         {
  //           key: 'Access-Control-Allow-Origin',
  //           value: 'https://miki-jewelry-quang-212.vercel.app, http://localhost:3000',
  //         },
  //         { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
  //         {
  //           key: 'Access-Control-Allow-Headers',
  //           value:
  //             'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
