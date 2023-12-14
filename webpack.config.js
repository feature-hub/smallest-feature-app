/**
 * @type {import('webpack').Configuration}
 */
const browserConfig = {
  entry: './src/index.tsx',
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
  externals: ['react'],
};

/**
 * @type {import('webpack').Configuration}
 */
const serverConfig = {
  entry: './src/index.tsx',
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
  externals: ['react'],
};

export default [browserConfig, serverConfig];
