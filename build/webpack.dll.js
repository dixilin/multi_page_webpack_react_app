const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { DllPlugin } = require('webpack');

module.exports = {
  entry: {
    react: ['react'], // 最终打包生成的name--->react: ['react']--->要打包的库是react
    reactDOM: ['react-dom'], // 最终打包生成的name--->reactDOM: ['react']--->要打包的库是react-dom
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, '../dll'),
    library: '[name]_[hash:8]', // 打包的库向外暴露出去的内容名
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 打包生成一个manifest.json  -->提供和react的映射关系
    new DllPlugin({
      name: '[name]_[hash:8]', // 映射库暴露的内容名称
      path: resolve(__dirname, '../dll/manifest.json'), // 输出文件路径
    }),
  ],
  mode: 'production',
};
