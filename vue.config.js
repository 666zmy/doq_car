// https://api.yodemall.kikistudio.cn/wxApi/channel/sendCode
const timestamp = new Date().getTime() // 时间戳
const targeDomain = 'https://api.yodemall.kikistudio.cn'
// const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 为了修改打包后css的文件名字
// vue.config.js
module.exports = {
  // 1----vue项目中关闭eslint
  lintOnSave: false,
  // 选项...
  // 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
  // publicPath: '/tools/', // '' 和 './'都是相对路径  js/chunk-vendors1600250024410.js
  productionSourceMap: false, // 上线打包后文件变小
  devServer: { // 为了本地联调时候 解决跨越问题
    // open: true, // 是否自动弹出浏览器页面
    // host: 'localhost',
    port: '8080', // 自己 本机端口号
    // https: false,
    // hotOnly: false,
    proxy: {
      '/open': {
        target: 'http://192.168.1.22:8070' // API服务器的地址
        // ws: true, // 代理websockets
      },
      '/wxApi': {
        target: targeDomain,
        ws: false,
        changeOrigin: true
      },
      '/ajax': {
        target: "https://omstest.doqtech.com.cn",
        ws: false,
        changeOrigin: true
      },
    }
  },
  indexPath: 'interested.html', // 指定生成到打包文件中index.html文件名字
  css: { // css打包文件添加时间戳
    extract: {
      // css添加时间戳
      filename: `css/[name].${timestamp}.css`,
      chunkFilename: `css/[name].${timestamp}.css`
    }
  },
  // webpack 配置 打包编译后的 文件名称
  configureWebpack: {
    output: {
      // js 添加时间戳
      filename: `js/[name]${timestamp}.js`,
      chunkFilename: `js/[name]${timestamp}.js`
    }
    // plugins: [ // 这种情况下该打包后的css 会多出系统原来的css
    //   new MiniCssExtractPlugin({
    //     filename: `css/[name]${timestamp}.css`
    //   })
    // ]
  }
}
