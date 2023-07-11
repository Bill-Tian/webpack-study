// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',  // 开发模式
    entry: path.resolve(__dirname, '../src/main.js'),  // 入口文件
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']  // 从右向左解析原则
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', { loader: 'postcss-loader', options: { postcssOptions: { plugins: [autoprefixer] } } }, 'less-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [ // 设置limit 大小超过100k时，将打包成图片文件，小于100k时打包成base64格式
                    { loader: 'url-loader', options: { limit: 102400, fallback: { loader: 'file-loader', options: { name: 'img/[name].[hash:8].[ext]' } } } },
                ]
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[hash:8].css",
            chunkFilename: "[id].css",
        })
    ],
}
