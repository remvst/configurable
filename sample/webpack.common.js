const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: {
        main: './src/index.tsx',
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['main'],
        }),
        new MiniCssExtractPlugin(),
        new CssMinimizerPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: '[name]-[hash][ext][query]',
    },
    resolve: {
        extensions: ['*', '.js', '.ts', '.tsx'],
        alias: {
            react: path.resolve('./node_modules/react'),
        },
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
            ],
        }],
    },
    optimization: {
      minimizer: [
        `...`,
        new CssMinimizerPlugin(),
      ],
    },
};
