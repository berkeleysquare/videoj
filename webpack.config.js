// Webpack configuration file.  This should be called with webpack's
// "--env" command line option either set to "development" or "production".
// For example:
//    # During active development
//    webpack --env=development --watch
//    # Production build
//    webpack --env=production
const webpack = require('webpack')
const webpackMerge = require('webpack-merge');
const FileLoader = require('file-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// replace localhost with 0.0.0.0 if you want to access
// your app from wifi or a virtual machine
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8081;

const stats = {
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
  colors: {
    green: '\u001b[32m'
  }
};

module.exports = function(env) {
  const isProd = env === 'production';
  const pubPath = '/assets';
  const buildDirectory = path.join(__dirname, './release');
  const htmlTemplate = './index.html.ejs';

  var config = isProd ? {
    devtool: 'source-map',
    mode: 'production',
    performance: {
      // Stop webpack from complaining about how large our JavaScript
      // bundles are.
      hints: false
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.LoaderOptionsPlugin({minimize: true, debug: false})
    ]
  } : {
    // dev
    devtool: 'cheap-module-eval-source-map',
    mode: 'development'
  };

  const entryPoint = './src/index.js';

  config = webpackMerge(config, {
    entry: {
      videoj: entryPoint
    },
    output: {
      path: buildDirectory,
      publicPath: pubPath,
      // Computing hashes is expensive and we don't need them in development
      filename: isProd ? '[name]-[chunkhash:8].js' : '[name].js',
      chunkFilename: isProd ? '[name]-[chunkhash:8].js' : '[name].js'
    },

    module: {
      rules: [{
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, './src'),
          require.resolve('query-string'), require.resolve('strict-uri-encode')
        ],
        use: {
          loader: 'babel-loader',
          // babel presets and plugins options are in .babelrc so jest can
          // see them.
          options: { babelrc: true }
        }
      }, {
        test: /\.css$/,

        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
        {
          test: /\.(jpg|png|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: isProd ? '[name]-[hash:8].[ext]' : '[name].[ext]',
              publicPath: '/assets'
            }
          }]
        },
        {
          test: /\.(ico)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/assets'
            }
          }]
        }]
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: isProd ? '[name]-[chunkhash:8].bundle.css' : '[name].bundle.css',
        chunkFilename: isProd ? '[id]-[chunkhash:8].bundle.css' : '[id].bundle.css'
      }),
      // create index.html.ejs
      new HtmlWebpackPlugin({
        template: htmlTemplate,
        inject: true,
        production: isProd,
        minify: isProd && {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
      })
    ],
    resolve: {
      extensions: [".js", ".json", ".jsx"],
      modules: [path.resolve(__dirname, "./src"),
        path.resolve(__dirname, "./node_modules")]
    }
  });
  return config;
}
