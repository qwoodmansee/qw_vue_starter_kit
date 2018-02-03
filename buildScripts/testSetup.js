// This file isnt transpiled, so have to use CommonJS and ES5

// Register babel to transpile before our tests run
require('babel-register')();

// Disable webpack features that mocha doesnt understand
require.extensions['.css'] = function() {};