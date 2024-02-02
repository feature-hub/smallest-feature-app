import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';

/**
 * @type {import('webpack').Configuration}
 */
const baseConfig = {
  entry: './src/index.tsx',
  plugins: [
    new webpack.BannerPlugin({
      banner: 'Source: https://github.com/feature-hub/smallest-feature-app',
    }),
  ],
  externals: ['react'],
  optimization: {
    minimizer: [new TerserPlugin({extractComments: false}), '...'],
  },
};

/**
 * @type {import('webpack').Configuration}
 */
const browserConfig = {
  ...baseConfig,
  output: {
    filename: 'index.umd.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'swc-loader',
          options: /** @type {import('@swc/core').Config} */ ({
            jsc: {parser: {syntax: 'typescript'}, target: 'es2020'},
          }),
        },
      },
    ],
  },
};

/**
 * @type {import('webpack').Configuration}
 */
const serverConfig = {
  ...baseConfig,
  output: {
    filename: 'index.node.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'swc-loader',
          options: /** @type {import('@swc/core').Config} */ ({
            jsc: {parser: {syntax: 'typescript'}, target: 'es2022'},
          }),
        },
      },
    ],
  },
};

export default [browserConfig, serverConfig];
