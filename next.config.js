/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  styledComponents: true,
  env: {
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
