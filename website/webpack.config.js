const runDevServer = require('@uidu/webpack-config/bin/dev.js');

runDevServer({
  serverOptions: {
    https: false,
  },
  webpackOptions: {
    resolve: {
      mainFields: [
        'jobvalue:src',
        'module',
        'main',
        'atlaskit:src',
      ],
    },
  },
}).catch((err) => {
  console.log(err);
  process.exit(err);
});
