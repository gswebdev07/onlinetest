const path = require("path")
const HWP = require("html-webpack-plugin")
require("@babel/polyfill")

module.exports = {
  entry: ["@babel/polyfill", path.join(__dirname, "/src/index.js")],
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js",
  },
  devServer: {
    proxy: {
      "/": {
        target: "http://localhost:5000",
      },
    },
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: "babel-loader", exclude: "/node_modules" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(png|jpg|svg)$/, use: "file-loader" },
      { test: /\.ttf$/, use: "file-loader" },
    ],
  },
  plugins: [new HWP({ template: path.join(__dirname, "/public/index.html") })],
}
