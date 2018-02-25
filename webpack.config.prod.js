import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const deployFolderName = "dist" // this should be the same as the variable in package.json's clean-dist function
export default {
  devtool: 'source-map',

  entry: {
    vendor: path.resolve(__dirname, 'src/vendor.js'),
    main: path.resolve(__dirname, 'src/index.js')
  },

  target: 'web',

  output: {
    path: path.resolve(__dirname, deployFolderName),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },

  plugins: [
    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    new WebpackMd5Hash(),

    // Use CommonsChunkPlugin to create a separate bundle of
    // vendor libraries so that they're cached separately
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor'
    }),

    // Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),

    // Global loader configuration
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        noInfo: true // set to false to see a list of every file being bundled.
    }),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],

  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?sourceMap')}
    ]
  }
}
