const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', // "production" | "development" | "none"
  entry: {
    main: './src/index.js',
    callback: './src/oauthCallback.js'
  }, // String | Object | Array
  devtool: 'source-map',
  output: {
    filename: '[name].[hash].js', // String
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimize: false // Boolean
  },
  devServer: {
    host: 'localhost', // String
    contentBase: './dist', // String
    port: 80, // Number
    hot: true, // Boolean
    inline: true, // boolean
    overlay: true, // boolean
    open: true // boolean
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff(2)?|ttf|otf|eot|svg|jpe?g|png|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // String
      title: 'Spotisync', // String
      template: './public/index.html', // String
      chunks: ['main'] // Array
    }),
    new HtmlWebpackPlugin({
      filename: 'callback.html', // String
      title: 'Spotisync - Callback', // String
      template: './public/callback.html',
      chunks: ['callback'] // Array
    })
  ]
}
