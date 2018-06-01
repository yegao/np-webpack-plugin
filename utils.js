const fs = require('fs');

let templates = {};
let styles = {};
let scripts = {};
let index = 0;
function add(){
  return `np_${++index}`;
}

function template(data,id){
  const reg = /<template[\s\S]*?>[\s\S]*?<([a-zA-Z]*)([\s\S]*?)>([\s\S]*?)<\/template>/;
  if(reg.test(data)){
    var list = reg.exec(data);
    var tag = list[1];
    var attr = list[2];
    var content = list[3];
    // templates[id] = content;
    return replace(`<${tag} np='${id}' ${attr}>${content}`);
  }
  return data;
}

function style(data,id){
  const reg = /^([\s\S]*?)<style[\s\S]*?>([\s\S]*?)<\/style>([\s\S]*?)$/;
  if(reg.test(data)){
    var list = data.match(reg);
    styles[id] = list[2];
    return `${list[1]}${list[3]}`;
  }
  return data
}

function script(data,id){
  const reg = /^([\s\S]*?)<script[\s\S]*?>([\s\S]*?)<\/script>([\s\S]*?)$/;
  if(reg.test(data)){
    var list = data.match(reg);
    scripts[id] = list[2];
    return `${list[1]}${list[3]}`;
  }
  return data
}

function combine(o){
  var res = '';
  for(var k in o){
    res += o[k];
  }
  return res;
}

function replace (source){
  let npsource = source;
  if(/<inline.*?>(.*?)<\/inline>/.test(npsource)){
    npsource = npsource.replace(/<inline.*?>(.*?)<\/inline>/g,function(match,path){
      var buffer = fs.readFileSync(path);
      return replace(buffer);
    });
  }
  if(/<np.*?>(.*?\.np).*?<\/np>/.test(npsource)){
    npsource = npsource.replace(/<np.*?>(.*?\.np).*?<\/np>/g,function(match,path){
        let buffer = fs.readFileSync(path);
        buffer = buffer.toString();
        let id = add();
        buffer = style(buffer,id);
        buffer = script(buffer,id);
        return template(buffer,id);
      });
  }
  return `${npsource}
  <style>${combine(styles)}</style>
  <script type="text/javascript">${combine(scripts)}</script>`;
}

const utils = {
  add,
  template,
  script,
  style,
  replace,
  source:{
    templates,
    scripts,
    styles
  }
}
module.exports = utils;
