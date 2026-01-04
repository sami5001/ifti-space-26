/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],

  // Image optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Turbopack configuration (Next.js 15 default bundler)
  turbopack: {},

  webpack: (config, options) => {
    if (options.isServer) {
      require('./lib/rss');
    }

    return config;
  },

  // Add your redirects here
  async redirects() {
    return [
      // Example redirects - customize for your social links
      // {
      //   source: '/twitter',
      //   destination: 'https://twitter.com/yourusername',
      //   permanent: true,
      // },
      // {
      //   source: '/github',
      //   destination: 'https://github.com/yourusername',
      //   permanent: true,
      // },
    ];
  },
};

module.exports = nextConfig;
