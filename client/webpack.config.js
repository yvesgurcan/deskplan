const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, './')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new GenerateSW({
            maximumFileSizeToCacheInBytes: 9999999999,
            skipWaiting: true
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['main.*.js']
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    watch: true,
    devServer: {
        overlay: true,
        writeToDisk: true,
        stats: 'minimal'
    }
};
