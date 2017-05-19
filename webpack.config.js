module.exports = {
    entry: './public/js/app.js',
    output: {
        filename: 'build.js',
        path: __dirname + '/public',
        publicPath: 'public/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },

  watch: true,

  watchOptions: {
    aggregateTimeout: 150
  }
};
