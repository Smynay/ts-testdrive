import {resolve} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
    context: resolve(__dirname, '../src'),
    mode: 'development',
    entry: './index.ts',
    output: {
        filename: 'bundle.[fullhash].js',
        path: resolve(__dirname, '../dist')
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': resolve(__dirname, '../src'),
            '@core': resolve(__dirname, '../src/core'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: '../public/index.html'
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
            filename: 'bundle.[fullhash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}
