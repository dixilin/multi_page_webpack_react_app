const merge = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const base = require('./webpack.base');

module.exports = merge(base, {
  mode: 'development',
  plugins: [new HotModuleReplacementPlugin()],
  devServer: {
    contentBase: '/',
    port: 8080,
    hot: true,
    open: true,
  },
  devtool: 'cheap-module-eval-source-map',
});
