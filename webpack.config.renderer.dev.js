const path = require('path');
const { spawn } = require('child_process');
const shared = require('./webpack.config.renderer');

const renderer = {
  mode: 'development',
  devServer: {
    contentBase: path.resolve('./dist'),
    port: 9000,
    after() {
      spawn('electron', ['./dist/electron.bundle.js'], {
        shell: true,
        env: process.env,
        stdio: 'inherit'
      })
        .on('close', code => process.exit(0))
        .on('error', spawnError => console.error(spawnError));
    }
  }
};

module.exports = { ...shared, ...renderer };
