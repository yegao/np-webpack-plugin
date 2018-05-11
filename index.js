// 'use strict';
// use Polyfill for util.promisify in node versions < v8
// const promisify = require('util.promisify');
//
// const vm = require('vm');
// const fs = require('fs');
// const _ = require('lodash');
// const path = require('path');
// const childCompiler = require('./lib/compiler.js');
// const prettyError = require('./lib/errors.js');
// const chunkSorter = require('./lib/chunksorter.js');
//
// const fsStatAsync = promisify(fs.stat);
// const fsReadFileAsync = promisify(fs.readFile);

function NiepanPlugin(options) {
  console.log(options);
}

NiepanPlugin.prototype.apply = function(compiler) {
  // 设置回调来访问编译对象：
  compiler.plugin("compilation", function(compilation) {
    console.log('NiepanPlugin:compilation...')
    // // 现在设置回调来访问编译中的步骤：
    // compilation.plugin("optimize", function() {
    //   console.log("Assets are being optimized.");
    // });
  });

  compiler.plugin('emit', function(compilation, callback) {
    console.log('NiepanPlugin:emit...')
    if(typeof callback === 'function'){
      callback();
    }
  }.bind(this));

  compiler.plugin('done', function(compilation, callback) {
    console.log('NiepanPlugin:done...')
    if(typeof callback === 'function'){
      callback();
    }
  }.bind(this));
};

module.exports = NiepanPlugin;
