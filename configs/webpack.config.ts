import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import webpack from 'webpack';

const isProd: boolean = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = (ext: string): string =>
  isDev ? `bundle.${ext}` : `bundle.[fullhash].${ext}`;

const jsLoaders = (): webpack.RuleSetUseItem[] => {
  return [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          {
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime',
            ],
          },
        ],
      },
    },
  ];
};

const webpackConfig: webpack.Configuration = {
  context: resolve(__dirname, '../src'),
  mode: 'development',
  entry: './index.ts',
  output: {
    filename: filename('js'),
    path: resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': resolve(__dirname, '../src'),
      '@core': resolve(__dirname, '../src/core'),
    },
  },
  devServer: {
    port: 3000,
    hot: isDev,
    historyApiFallback: true,
  },
  devtool: isDev ? 'source-map' : false,
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: '../public/index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, '../public/favicon.ico'),
          to: resolve(__dirname, '../dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new ESLintWebpackPlugin({
      context: resolve(__dirname, '../'),
      extensions: ['js', 'ts', 'json'],
      exclude: ['node_modules', 'dist'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ts|js)$/,
        exclude: resolve(__dirname, '../node_modules'),
        use: jsLoaders(),
      },
    ],
  },
};

export default webpackConfig;
