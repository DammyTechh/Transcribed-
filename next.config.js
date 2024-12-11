/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      buffer: false
    };
    return config;
  },
  env: {
    NEXT_PUBLIC_AZURE_SPEECH_KEY: process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY,
    NEXT_PUBLIC_AZURE_SPEECH_KEY_2: process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY_2,
    NEXT_PUBLIC_AZURE_SPEECH_REGION: process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION,
    NEXT_PUBLIC_AZURE_SPEECH_ENDPOINT: process.env.NEXT_PUBLIC_AZURE_SPEECH_ENDPOINT,
  }
};

module.exports = nextConfig;