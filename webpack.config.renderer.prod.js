const shared = require('./webpack.config.renderer');

const merge = require('webpack-merge');

module.exports = merge.smart(shared, {
  mode: 'production',
});
