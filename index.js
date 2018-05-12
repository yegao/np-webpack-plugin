/**
 * NiepanPlugin depends on html-webpack-plugin
 */
function CONSOLEKEYS(o){
  console.log(Object.keys(o).join(","))
}

class NiepanPlugin{
  constructor(options){
    console.log(options);
  }

  apply(compiler){
    // for webpack4
    if(compiler.hooks){
      compiler.hooks.compilation.tap.bind(compiler.hooks.compilation, 'np-webpack-plugin')(function (compilation) {
        // console.log('\ncompilation');
        compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync.bind(compilation.hooks.htmlWebpackPluginAlterAssetTags, 'np-webpack-plugin')(
          function (htmlPluginData, callback) {
            // console.log(htmlPluginData);
            var result = htmlPluginData;
            callback(null, result);
          }
        );
      });
      // compiler.hooks中有如下这些属性
      // shouldEmit,done,additionalPass,beforeRun,run,emit,afterEmit,
      // thisCompilation,compilation,normalModuleFactory,contextModuleFactory,
      // beforeCompile,compile,make,afterCompile,watchRun,failed,invalid,
      // watchClose,environment,afterEnvironment,afterPlugins,afterResolvers,
      // entryOption
      compiler.hooks.emit.tapAsync.bind(compiler.hooks.emit, 'np-webpack-plugin')(function(compilation,callback){
          // console.log('\nemit');
          var source = compilation.assets['index.html'].source();
          compilation.assets['index.html'].source = function(){
            var npSource = source.replace(/<np.*?>(.*?)<\/np>/g,"this is niepan component");
            // console.log(npSource)
            return npSource;
          }
          // CONSOLEKEYS(compilation);
          //
          // _pluginCompat,hooks,name,compiler,resolverFactory,inputFileSystem,
          // requestShortener,options,outputOptions,bail,profile,performance,
          // mainTemplate,chunkTemplate,hotUpdateChunkTemplate,runtimeTemplate,
          // moduleTemplates,semaphore,entries,_preparedEntrypoints,entrypoints,
          // chunks,chunkGroups,namedChunkGroups,namedChunks,modules,_modules,
          // cache,records,nextFreeModuleIndex,nextFreeModuleIndex2,
          // additionalChunkAssets,assets,errors,warnings,children,
          // dependencyFactories,dependencyTemplates,childrenCounters,
          // usedChunkIds,usedModuleIds,fileTimestamps,contextTimestamps,
          // compilationDependencies,_buildingModules,_rebuildingModules,
          // fullHash,hash,fileDependencies,contextDependencies,missingDependencies


          // console.log(compilation.assets);
          //
          // {
          //   'app.js': CachedSource {
          //      _source: ConcatSource { children: [Array] },
          //      _cachedSource: undefined,
          //      _cachedSize: undefined,
          //      _cachedMaps: {},
          //      node: [Function],
          //      listMap: [Function]
          //    },
          //   'runtime~app.js': CachedSource {
          //      _source: ConcatSource { children: [Array] },
          //      _cachedSource: undefined,
          //      _cachedSize: undefined,
          //      _cachedMaps: {},
          //      node: [Function],
          //      listMap: [Function]
          //    },
          //   'vendor.js': CachedSource {
          //      _source: ConcatSource { children: [Array] },
          //      _cachedSource: undefined,
          //      _cachedSize: undefined,
          //      _cachedMaps: {},
          //      node: [Function],
          //      listMap: [Function]
          //    }
          // }
          callback();
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

// convertPluginData(compilation,pluginData){
//   var self = this;
//   var body = [];
//   var head = [];
//   pluginData.head.forEach(function (tag) {
//     head.push(self.processTag(compilation, tag));
//   });
//   pluginData.body.forEach(function (tag) {
//     body.push(self.processTag(compilation, tag));
//   });
//   return { head: head, body: body, plugin: pluginData.plugin, chunks: pluginData.chunks, outputName: pluginData.outputName };
// }
//   HtmlWebpackInlineSourcePlugin.prototype.processTag = function (compilation, regex, tag) {
//   var assetUrl;
//
//   // inline js
//   if (tag.tagName === 'script' && regex.test(tag.attributes.src)) {
//     assetUrl = tag.attributes.src;
//     tag = {
//       tagName: 'script',
//       closeTag: true,
//       attributes: {
//         type: 'text/javascript'
//       }
//     };
//
//   // inline css
//   } else if (tag.tagName === 'link' && regex.test(tag.attributes.href)) {
//     assetUrl = tag.attributes.href;
//     tag = {
//       tagName: 'style',
//       closeTag: true,
//       attributes: {
//         type: 'text/css'
//       }
//     };
//   }
//
//   if (assetUrl) {
//     // Strip public URL prefix from asset URL to get Webpack asset name
//     var publicUrlPrefix = compilation.outputOptions.publicPath || '';
//     var assetName = path.posix.relative(publicUrlPrefix, assetUrl);
//     var asset = compilation.assets[assetName];
//     var updatedSource = this.resolveSourceMaps(compilation, assetName, asset);
//     tag.innerHTML = (tag.tagName === 'script') ? updatedSource.replace(/(<)(\/script>)/g, '\\x3C$2') : updatedSource;
//   }
//
//   return tag;
// };
}

module.exports = NiepanPlugin;
