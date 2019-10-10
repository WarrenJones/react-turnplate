/*** webpack.config.js ***/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "example/index.html"),
  filename: "./index.html"
});
module.exports = {
  entry: path.join(__dirname, "example/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
          },
          {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: "sass-loader" // 将 Sass 编译成 CSS
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        // 增加加载图片的规则
        test: /\.(png|svg|jpg|gif|svga|mp3)$/,
        use: [
          {
            loader: "file-loader",
            // options: {
            //   outputPath: "../img/",
            //   publicPath: "/public/webpack/img/",
            //   name: "[name][hash].[ext]"
            // }
          }
        ]
      },
    ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    port: 3001
  },
  devtool:'#eval-source-map'
};
