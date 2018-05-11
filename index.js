class NiepanPlugin{
  constructor(options){
    console.log(options);
  }
  apply(compiler){
    // for webpack4
    if(compiler.hooks){
      compiler.hooks.emit.tapAsync.bind(compiler.hooks.emit, 'NiepanPlugin')(function(compilation,callback){
          console.log('emit...')
          if(typeof callback === 'function'){
            callback();
          }
      })
    }
    else{
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
          if(typeof callback === 'function'){
            callback();
          }
        }.bind(this));

        compiler.plugin('done', function(compilation, callback) {
          console.log('done...')
          if(typeof callback === 'function'){
            callback();
          }
        }.bind(this));
    }
  }
}

module.exports = NiepanPlugin;
