const runDevServer = require('@uidu/webpack-config/bin/dev.js');

runDevServer({
  serverOptions: {
    https: false,
  },
  webpackOptions: {
    resolve: {
      mainFields: ['jobvalue:src', 'browser', 'module', 'main'],
    },
  },
})
  .catch((err) => {})
  .catch((err) => {
    console.log(err);
    process.exit(err);
  });
