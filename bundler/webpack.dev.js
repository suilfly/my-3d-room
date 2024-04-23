const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    index: '/src/index.js',
  },
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my-3d-room',
    }),
    // 这样非import引入的地址资源就可以正常解析
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, '../src/assets') }],
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
