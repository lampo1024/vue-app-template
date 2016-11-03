var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var webpack = require('webpack')

var config = require('./webpack.config')

config.vue = {
    loaders: {
        css: ExtractTextPlugin.extract("css")
    }
};

config.plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    // 压缩代码
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // 提取css为单文件
    new ExtractTextPlugin("[name].[contenthash].css"),
    new HtmlWebpackPlugin({
        filename: '../output/index.html',
        template: path.resolve(__dirname, '../app/index.html'),
        inject: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'vendors.[hash].js',
    }),
];

module.exports = config;