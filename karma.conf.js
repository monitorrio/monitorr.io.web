module.exports = function karmaConfig (config) {
  config.set({
    frameworks: [
      'mocha', 'chai'
    ],
    reporters: [
      'mocha', 'coverage'
    ],
    mochaReporter: {
      showDiff: true
    },
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js', // Symbols
      'client/src/tests.webpack.js'
    ],
    preprocessors: {
      'client/src/tests.webpack.js': ['webpack', 'sourcemap']
    },
    browsers: [
      'PhantomJS'
    ],
    singleRun: true,
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'html'}
      ]
    },
    webpack: require('./webpack.config'),
    webpackMiddleware: {
      noInfo: 'errors-only'
    }
  });
};
