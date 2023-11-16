const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Webpack plugin that generates our html file and injects our bundles. 
      new HtmlWebpackPlugin({
       // Creates a copy of the index.html file in the dist folder and inserts in script tag to the newly created bundle.js file
       template: './index.html', 
       // Optional parameters
       title: 'PWA Text Editor'
     }),
    
     // Injects our custom service worker
     new InjectManifest({
       swSrc: './src-sw.js',
       swDest: 'src-sw.js',
     }),
 
     // Creates a manifest.json file.
     new WebpackPwaManifest({
       fingerprints: false,
       inject: true,
       name: 'PWA Text Editor',
       short_name: 'JATE',
       description: 'Just another text editor!',
       background_color: '#ffffff',
       theme_color: '#ffffff',
       start_url: '/',
       publicPath: '/',
       icons: [
         {
           src: path.resolve('src/images/logo.png'),
           sizes: [96, 128, 192, 256, 384, 512],
         },
       ],
     }),
     ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
