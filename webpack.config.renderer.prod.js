const shared = require('./webpack.config.renderer');

const renderer = {
  mode: 'production'
};

module.exports = { ...shared, ...renderer };
