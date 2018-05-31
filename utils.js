const fs = require('fs');

let templates = {};
let styles = {};
let scripts = {};
let index = 0;
function add(){
  return `np-${++index}`;
}

function template(data,id){
  const reg = new RegExp("<template[\s\S]*?>[\s\S]*?<([a-zA-Z]*)([\s\S]*?)>([\s\S]*?)<\/template>");
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
  const reg = new RegExp("([\s\S]*?)<style[\s\S]*?>([\s\S]*?)<\/style>([\s\S]*?)");
  if(reg.test(data)){
    var list = data.match(reg);
    styles[id] = list[2];
    return `${list[1]}${list[3]}`;
  }
  return data
}

function script(data,id){
  const reg = new RegExp("([\s\S]*?)<script[\s\S]*?>([\s\S]*?)<\/script>([\s\S]*?)");
  if(reg.test(data)){
    var list = data.match(reg);
    scripts[id] = list[2];
    return `${list[1]}${list[3]}`;
  }
  return data
}

function replace (source){
  return  source.replace(/<inline.*?>(.*?)<\/inline>/g,function(match,path){
            var buffer = fs.readFileSync(path);
            return replace(buffer);
          }).replace(/<np.*?>(.*?\.np).*?<\/np>/g,function(match,path){
            var buffer = fs.readFileSync(path);
            var id = add();
            buffer = style(buffer,id);
            buffer = script(buffer,id);
            return template(buffer,id);
          });
}

const utils = {
  add,
  template,
  script,
  style,
  source:{
    templates,
    scripts,
    styles
  }
}
module.exports = utils;
