module.exports = {
  entry: "./app/app.js",
  output: { path: __dirname + '/dist/', filename: 'app.js'},
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /app/,
        loaders: ['babel-loader?presets[]=es2015']
      }
    ]
  }
};