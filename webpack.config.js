// const webpack = require("webpack")
// module.exports = {
//     entry: {
//   main: [
//     'webpack-hot-middleware/client?noInfo=true&reload=true', // 生产环境的入口建议把这个去掉
//     './index.js'
//   ]
// },
// plugins: [
//   new webpack.HotModuleReplacementPlugin()
// ]
// }

const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
const MinifyPlugin = require('babel-minify-webpack-plugin');
module.exports = {
  mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'), //入口文件
    output: {
        path: path.resolve(__dirname,'dist'), //输出路径
        filename: 'js/index.js'             // 输出项目根目录
    },
    node: {
      fs: 'empty',
      net:'empty',
      tls:'empty',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-3'] //兼容es6，并添加.babelrc
                }
            }]

        }]
    },
   
    target: 'node', // 服务端打包
    externals: [nodeExternals()], //node 打包可去除一些警告
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, './../')
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MinifyPlugin() //压缩js
    ]
};
