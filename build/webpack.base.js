const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const glob = require('glob');

const setMPA = () => {
  const entry = {};
  const HtmlWebpackPlugins = [];
  const entryFiles = glob.sync(resolve(__dirname, '../src/views/*/index.js'));
  entryFiles.forEach((item) => {
    const match = item.match(/\/src\/views\/(.*)\/index\.js/);
    const pageName = match && match[1]; // 匹配的页面名称
    entry[pageName] = item;
    HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: resolve(__dirname, `../src/views/${pageName}/index.html`), // 模板路径
        filename: `${pageName}.html`, // 文件名称
        chunks: [pageName], // 使用哪些chunks,这里必须要加上[pageName]，如果不加开发环境只能显示最后一个页面
        inject: true, // chunk自动注入
      }),
    );
  });
  return {
    entry,
    HtmlWebpackPlugins,
  };
};
const { entry, HtmlWebpackPlugins } = setMPA();

const env = process.env.NODE_ENV;
module.exports = {
  entry,
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'static/js/[name].js', // [name]占位符
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          'postcss-loader',
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecession: 8, // px转rem小数点位数
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|svg|jpeg|bmp|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // 小于10K则使用base64
              name: 'static/img/[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'static/fonts/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    ...HtmlWebpackPlugins,
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          // 抽离公共模块
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
        },
        vendors: {
          // 抽离node_modules下的第三方模块
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
          priority: 10,
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': resolve(__dirname, '../src'),
    },
    modules: ['node_modules'],
  },
  stats: 'errors-only', // 只在发生错误时输出
};
