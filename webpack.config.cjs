const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin')  //html -> file
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: "development",
  entry: [
    "./client/src/index.js",
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
        test: /.(png|jpe?g|gif|ico|svg)$/, //image -> file
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
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
  resolve: {
    extensions: [".js", ".jsx", ".sass", ".scss"],
    alias: {
      public: '../../public/'
    }
  },
  devServer: {
    hotOnly: true,
    port: 3000,
    proxy: {
      '/': 'http://localhost:8080'
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./client/public/index.html",
      favicon: "./client/public/favicon.ico"
    }),
    new MiniCSSExtractPlugin({ filename: "stylesheet.css" }),
  ],
};