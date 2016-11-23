module.exports = {
  entry: "./app/app.js",
  output: { path: __dirname + '/dist/', filename: 'app.js'},
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /app/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};