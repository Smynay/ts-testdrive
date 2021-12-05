import {resolve} from 'path';

export default {
    context: resolve(__dirname, '../src'),
    mode: 'development',
    entry: './index.ts',
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, '../dist')
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
}
