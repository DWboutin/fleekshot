/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  styledComponents: true,
  env: {
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
  },
};

module.exports = nextConfig;
