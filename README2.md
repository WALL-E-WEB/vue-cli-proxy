## vue-cli3.0+ 配置文件+命令行跨域解决方案

1. 在package.json同级目录下创建 环境配置文件 .env.xxx (xxx一般为:dev / pro /test )
2. package.json配置 命令行
3. 配置axios.defaults.baseURL
4. vue.config.js配置跨域

>1.在package.json同级目录下创建 环境配置文件
>
>![image-20200305161012418](%E6%96%B0%E5%BB%BA%E6%96%87%E6%9C%AC%E6%96%87%E6%A1%A3.assets/image-20200305161012418-1583633264842.png)
>
>```js
>文件内容格式如下:按需
>NODE_ENV="development"                            //环境名
>VUE_APP_BASE_URL="http://xxx.xxx.xxx"             //服务器地址
>VUE_APP_BASE_API="http://xxx.xxx.xxx:port"        //接口地址
>VUE_APP_DIR_NAME="xxx"                            //打包名
>
>注意:
>	1.必须以VUE_APP开头
>2.上面地址引号后不可有空格
>3.设置跨域后VUE_APP_BASE_API接上vue.config.js文件中proxy设置的'/api'
>	如:VUE_APP_BASE_API="http://xxx.xxx.xxx:port/api"
>```
>
>2.package.json配置 命令行
>
>```json
>{
>"name": "qywx",
>"version": "0.1.0",
>"private": true,
>"scripts": {
>"serve": "vue-cli-service serve",
>"build": "vue-cli-service build",
> //'development'为.env.xxx文件中NODE_ENV对应
> // --mode 后制定执行的文件
>"serve:dev": "vue-cli-service serve --mode development",
>"build:pro": "vue-cli-service build --mode production"
>},
>} 
>
>命令窗口运行:npm run serve:dev 开发模式
>命令窗口运行:npm run build:pro 打包生产模式
>```
>
>3.配置axios.defaults.baseURL
>
>```js
>import axios from 'axios'
>axios.defaults.baseURL = process.env.VUE_APP_BASE_API
>```
>
>4.vue.config.js中devserver配置跨域;
>
>```js
>let env = process.env.NODE_ENV;
>// npm i compression-webpack-plugin -D
>const CompressionWebpackPlugin = require("compression-webpack-plugin");
>module.exports = {
>// 如果是hash模式
>publicPath: env === 'production' ? './' : '/',
>
>// 如果是history模式
>// publicPath: env === 'production' ? '/' : '/',
>outputDir: 'dist/c',
>filenameHashing: false,
>productionSourceMap: false,
>
>// 输出文件目录默认'dist
>outputDir: "dist",
>
>runtimeCompiler: false,
>
>// 静态资源目录 (js, css, img, fonts)
>
>assetsDir: "assets",
>//设置打包之后是否打包.map文件
>productionSourceMap: env !== "development" ? false : true,
>
>// 所有 webpack-dev-server 的选项都支持
>devServer: {
>   port: 8083,
>   host: "0.0.0.0",
>   hot: true,
>   open: false,
>   disableHostCheck: true,
>   proxy: {
>       // axios.defaults.baseURL = '/api'
>       //或axios.defaults.baseURL = 'http://xxxxx/api'
>       '/api': {
>           target: "http://localhost:3000",
>           // ws: true,
>           changeOrigin: true,
>           pathRewrite: {
>               '^/api': ''
>           }
>       },
>   }
>   // proxy: "http://localhost:3000",
>
>},
>configureWebpack: config => {
>   if (env !== "development") {
>       // 配置打包 压缩js
>       config.plugins.push(
>           new CompressionWebpackPlugin({
>               algorithm: "gzip",
>               test: /\.js$|\.html$|.\css/, //匹配文件名
>               threshold: 10240, //对超过10k的数据压缩
>               deleteOriginalAssets: false, //不删除源文件
>               minRatio: 0.8
>           })
>       );
>   }
>}
>}
>```
>
>


