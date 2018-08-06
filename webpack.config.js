const path = require('path');
module.exports = {
  entry: {
    'dist/input-moment': './index.js',
    'example/bundle': './example/app.js'
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    moment: 'moment'
  },
  devtool: 'source-map',
  resolve: {
    root: path.resolve('./')
  }
};
