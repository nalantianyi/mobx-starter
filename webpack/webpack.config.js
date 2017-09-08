/**
 * Created by nalantianyi on 2017/4/19.
 */
const path = require('path');
const productRoot = path.resolve(__dirname, '../');
const webRoot = path.resolve(productRoot, 'web');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
// const svgDirs = [
//     require.resolve('antd').replace(/warn\.js$/, ''), // 1. 属于 antd 内置 svg 文件
// ];
module.exports = {
    devtool: 'cheap-eval-source-map',
    context: webRoot,
    entry: {
        main: ['./index.js',
            'babel-polyfill',
            'webpack/hot/only-dev-server',
            'webpack-dev-server/client?http://localhost:9000']
    },
    output: {
        publicPath: "/public/assets/",
        filename: '[name].js',
        path: path.resolve(productRoot, 'build/public/assets')
    },
    resolve: {
        extensions: ['.web.js', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                use: ['style-loader', {loader: 'css-loader', options: {modules: true}}, 'postcss-loader']
            },
            {
                test: /\.less$/,
                exclude: [/node_modules/],
                use: ['style-loader', {loader: 'css-loader', options: {modules: true}}, 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(jpeg|jpg|png|gif|svg)$/,
                use: 'url-loader?limit=8192',
                // exclude: svgDirs
            },
            // {
            //     test: /\.(svg)$/i,
            //     use: 'svg-sprite-loader',
            //     // include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
            // }
        ]
    },
    devServer: {
        contentBase: path.resolve(productRoot,'build'),
        port: 9000,
        hot: true,
        // proxy: {
        //     "/": "http://localhost:7003"
        // },
        publicPath: "/public/assets/"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.HotModuleReplacementPlugin(),
        // 开启全局的模块热替换(HMR)
        new webpack.NamedModulesPlugin(),
        // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
        new HtmlWebpackPlugin({
            chunks: ['main', 'vendor'],
            filename: '../../index.html',
            title: 'mobx-starter',
            template: '../web/index.html'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    pxtorem({
                        rootValue: 100,
                        propWhiteList: [],
                    }),
                    autoprefixer({browsers: ['last 2 versions']}),
                ]
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // 该配置假定你引入的 vendor 存在于 node_modules 目录中
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
    ]
};