const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin')  //html -> file
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: "development",
  entry: [
    "./client/src/index.js",
    "./client/public/index.html",
    "./client/public/stylesheet.sass",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "client/build"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, //React -> ESNext -> ES5
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.s[ca]ss$/, //SASS -> CSS -> file
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  resolve: [".js", ".jsx", ".sass", ".scss"],
  devServer: {
    hotOnly: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "client/public/index.html",
    //   favicon: "client/public/favicon.ico",
    }),
    new MiniCSSExtractPlugin({ filename: "stylesheet.css" }),
  ],
};