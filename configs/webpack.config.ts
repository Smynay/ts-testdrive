import {resolve} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isProd: boolean = process.env.NODE_ENV === 'production';
const isDev: boolean = !isProd;

const filename = (ext: string): string => isDev ? `bundle.${ext}` : `bundle.[fullhash].${ext}`;

export default {
    context: resolve(__dirname, '../src'),
    mode: 'development',
    entry: './index.ts',
    output: {
        filename: filename('js'),
        path: resolve(__dirname, '../dist')
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': resolve(__dirname, '../src'),
            '@core': resolve(__dirname, '../src/core'),
        }
    },
    devtool: isDev ? 'source-map' : false,
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: '../public/index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: resolve(__dirname, '../public/favicon.ico'),
                    to: resolve(__dirname, '../dist'),
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(ts|js)$/,
                exclude: resolve(__dirname, '../node_modules'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            {
                                plugins: [
                                    '@babel/plugin-proposal-class-properties',
                                    '@babel/plugin-transform-runtime'
                                ]
                            }
                        ]
                    }
                }
            }
        ]
    }
}
