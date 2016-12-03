module.exports = function(options) {
  return {
    entry: ['babel-polyfill', options.base + '/' + options.tmp + '/scripts/main.js'],
    output: {
        filename: 'main.bundle.js'
    }
  }
};
