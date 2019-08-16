// Autogenerate html file
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // Chosen mode tells webpack to use its built-in optimizations accordingly
  mode: 'development', // "production" | "development" | "none"
  // Relative to root of the application
  // Defaults to ./src
  entry: './frontend/Index.jsx', // String | Object | Array
  devtool: 'source-map',
  // Options related to how webpack emits results
  output: {
    // Filename template for entry chunks
    filename: './public/bundle.js' // String
  },
  optimization: {
    // Minimize the code
    minimize: false // Boolean
  },
  devServer: {
    // Served over HTTP/2 with HTTP
    // Specify a host to use
    host: 'localhost', // String
    // Specify port
    port: 8080, // Number
    // Enable webpack's Hot Module Replacement feature
    hot: true, // Boolean
    // Scripts will be inserted in the bundle to take care of live reloading,
    // and build messages will appear in the browser console
    inline: true, // boolean
    // Shows a full-screen overlay in the browser when there are compiler errors or warnings
    overlay: true, // boolean
    // Open the app after server start
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
      // Will add a unique hash to the src of the embedded <script> tag
      hash: true, // Boolean
      // Relative to root of the application
      filename: './index.html', // String
      // Title of the html document
      title: 'Spotisync', // String
      // Template html document to use when generating
      // Relative to root of the application
      template: './frontend/index.html' // String
    })
  ]
}
