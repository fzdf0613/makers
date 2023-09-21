/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  reactStrictMode: false,
  webpack: (config) => {
    config.externals = [...config.externals, "canvas", "jsdom"];
    return config;
  },
};

module.exports = nextConfig;
