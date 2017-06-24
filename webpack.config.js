const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: __dirname,
  entry: ["./app/js/entry.js", "./app/html/index.html"],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "bundle.js"
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.html$/,
        use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'app'),
      'node_modules'
    ]
  },
  devServer: {}
};
