const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const GlobImporter = require('node-sass-glob-importer');
const { default: ImageminPlugin } = require('imagemin-webpack-plugin');
const ImageminMozjpeg = require('imagemin-mozjpeg');
const baseWebpackConfig = require('./webpack.base.conf');

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: GlobImporter(),
                webpackImporter: false,
              },
              additionalData: '@import "~/scss/base/_includes.scss";',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ImageminPlugin({
      test: /\.png|jp(e)?g|gif|svg$/i,
      optipng: null,
      jpegtran: null,
      svgo: {
        plugins: [
          {
            removeViewBox: false,
          },
        ],
      },
      pngquant: {},
      plugins: [
        ImageminMozjpeg(),
      ],
      cacheFolder: baseWebpackConfig.externals.paths.cache,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      ignoreOrder: true,
    }),
    new webpack.ProgressPlugin({
      activeModules: true,
      entries: true,
      modules: true,
      profile: true,
    }),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(buildWebpackConfig);
});
