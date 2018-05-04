function NiepanPlugin(options) {
  console.log(options);
}

NiepanPlugin.prototype.apply = function(compiler) {
  // 设置回调来访问编译对象：
  compiler.plugin("compilation", function(compilation) {
    console.log('compilation...')
    // // 现在设置回调来访问编译中的步骤：
    // compilation.plugin("optimize", function() {
    //   console.log("Assets are being optimized.");
    // });
  });

  compiler.plugin('emit', function(compilation, callback) {
    console.log('emit...')
    console.log(compilation);
    callback();
  }.bind(this));

  compiler.plugin('done', function(compilation, callback) {
    console.log('done...')
    console.log(compilation);
    callback();
  }.bind(this));
};

module.exports = NiepanPlugin;
