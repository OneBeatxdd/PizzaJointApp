const webpack = require('webpack');

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'bundle.[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: '@svgr/webpack',
                options: {
                    name: '[path][name].[contenthash].[ext]',
                    publicPath: '/',
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|woff(2)?|ttf|eot)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[contenthash].[ext]',
                    publicPath: '/',
                },
            },
        ],
    },
    watchOptions: {
        ignored: '/node_modules/',
        aggregateTimeout: 1000
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            inject: false,
            favicon: './src/logo.svg',
        }),
        new FaviconsWebpackPlugin({
            logo: './src/logo.svg',
            favicons: {
                appName: 'PJA',
                appDescription: 'Pizza Joint App',
                developerName: 'Sally Yue',
                icons: {
                    android: false,
                    coast: false,
                    yandex: false,
                    favicons: false,
                },
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
