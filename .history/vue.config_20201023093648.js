const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
module.exports = {
  publicPath: "./",
  outputDir:'ROOT',
  lintOnSave: false,

  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type =>
      addStyleResource(config.module.rule("less").oneOf(type))
    );
  },
  configureWebpack: config => { 

    // 开发环境不需要gzip
    if (process.env.NODE_ENV !== "production") return;

    config.plugins.push(
      new CompressionWebpackPlugin({
        // 正在匹配需要压缩的文件后缀
        test: /\.(js|css|svg|woff|ttf|json|html)$/,
        // 大于10kb的会压缩
        threshold: 10240,
        // 其余配置查看compression-webpack-plugin 
      })
    );
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  runtimeCompiler: true,
  productionSourceMap: false
};

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "./src/uitls/css/layout.less"), // 需要全局导入的less
        path.resolve(__dirname, "./src/uitls/css/modifyvant.less"),
        path.resolve(__dirname, "./src/uitls/css/theme.less")
      ]
    });
}
