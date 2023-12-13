const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"), // output folder
    publicPath: "",
  },
  module: {
    rules: [
        {
            test: /\.?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
                },
            },
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }]
        },
        {
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader", // for styles
            ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // base html
    }),
  ],
};