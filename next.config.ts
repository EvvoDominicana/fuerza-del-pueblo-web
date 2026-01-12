
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'core-js/modules/es.array.concat.js': false,
      'core-js/modules/es.array.index-of.js': false,
      'core-js/modules/es.string.trim.js': false,
      'core-js/modules/es.string.includes.js': false,
      'core-js/modules/es.array.reverse.js': false,
      'core-js/modules/es.promise.js': false,
      'core-js/modules/es.object.assign.js': false,
      'core-js/modules/es.object.keys.js': false,
      'canvg': false,
    };
    return config;
  },
  experimental: {
    turbo: {
      resolveAlias: {
        'core-js/modules/es.array.concat.js': './src/lib/noop.ts',
        'core-js/modules/es.array.index-of.js': './src/lib/noop.ts',
        'core-js/modules/es.string.trim.js': './src/lib/noop.ts',
        'core-js/modules/es.string.includes.js': './src/lib/noop.ts',
        'core-js/modules/es.array.reverse.js': './src/lib/noop.ts',
        'core-js/modules/es.promise.js': './src/lib/noop.ts',
        'core-js/modules/es.object.assign.js': './src/lib/noop.ts',
        'core-js/modules/es.object.keys.js': './src/lib/noop.ts',
        'canvg': './src/lib/noop.ts',
      },
    },
  },
};

export default nextConfig;
