const fs = require('fs');
const runDevServer = require('@uidu/webpack-config/bin/dev.js');

runDevServer({
  serverOptions: {
    https: false
  },
  webpackOptions: {
    resolve: {
      mainFields: ['jobvalue:src', 'module', 'atlaskit:src', 'browser', 'main'],
    },
  },
}).catch(err => {
  console.log(err);
  process.exit(err);
});