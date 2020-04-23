const { resolve } = require('path');
const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

const { DllReferencePlugin, IgnorePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const cssnano = require('cssnano');
const base = require('./webpack.base');

// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); //打包后可视化插件
module.exports = merge(base, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]_[contenthash:8].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano, // 依赖cssnanoF
    }),
    new CleanWebpackPlugin(),
    // 若不使用dll删除DllReferencePlugin插件
    new DllReferencePlugin({
      manifest: resolve(__dirname, '../dll/manifest.json'),
    }),
    new IgnorePlugin(/^\.\/locale$/, /moment$/),
    // 若不使用dll删除AddAssetHtmlWebpackPlugin插件
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, '../dll/*.js'),
      outputPath: './lib',
      publicPath: '../dist/lib', // 相对路径，也可设置绝对路径
    }),
    // new BundleAnalyzerPlugin(),
  ],
  devtool: 'cheap-module-source-map',
});
