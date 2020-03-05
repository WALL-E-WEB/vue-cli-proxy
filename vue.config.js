let env = process.env.NODE_ENV;
// npm i compression-webpack-plugin -D
const CompressionWebpackPlugin = require("compression-webpack-plugin");
module.exports = {
    // 如果是hash模式
    publicPath: env === 'production' ? './' : '/',

    // 如果是history模式
    // publicPath: env === 'production' ? '/' : '/',
    outputDir: 'dist/c',
    filenameHashing: false,
    productionSourceMap: false,

    // 输出文件目录默认'dist
    outputDir: "dist",

    runtimeCompiler: false,

    // 静态资源目录 (js, css, img, fonts)

    assetsDir: "assets",
    //设置打包之后是否打包.map文件
    productionSourceMap: env !== "development" ? false : true,

    // 所有 webpack-dev-server 的选项都支持
    devServer: {
        port: 8083,
        host: "0.0.0.0",
        hot: true,
        open: false,
        disableHostCheck: true,
        proxy: {
            // axios.defaults.baseURL = '/a
            '/a': {
                target: "http://localhost:3000",
                // ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/a': ''
                }
            },
        }
        // proxy: "http://localhost:3000",

    },
    configureWebpack: config => {
        if (env !== "development") {
            // 配置打包 压缩js
            config.plugins.push(
                new CompressionWebpackPlugin({
                    algorithm: "gzip",
                    test: /\.js$|\.html$|.\css/, //匹配文件名
                    threshold: 10240, //对超过10k的数据压缩
                    deleteOriginalAssets: false, //不删除源文件
                    minRatio: 0.8
                })
            );
        }
    }
}