var mod = require('module');
var stackTrace = require('stack-trace');
var mockFilePath = stackTrace.get()[0].getFileName();

var origRequire = require;
var origLoad = mod._load;
var interceptRequires = null;

var parentModule = new mod(mockFilePath);
parentModule.filename = mockFilePath;
parentModule.paths = mod._nodeModulePaths(require('path').dirname(mockFilePath));

var fileIsInPath = function(str, substr){
  return (str === substr) ||
    (str.lastIndexOf("/"+substr) === (str.length-substr.length - 1));
};

module.exports = function (moduleName, options){
  var newModule = null;
  options = options || {};
  interceptRequires = options.requires;

  if (options.sandbox && options.sandbox.toLowerCase() === 'root') {
    modFilePath = mod._resolveFilename(moduleName,parentModule);
    var cachedEntry = mod._cache[modFilePath];
    delete mod._cache[modFilePath];
    newModule = origRequire(moduleName);
    if (cachedEntry){
      mod._cache[modFilePath] = cachedEntry;
    } else {
      delete mod._cache[modFilePath];
    }
    return newModule;
  } else if (options.sandbox && options.sandbox.toLowerCase() === 'all'){
    var origCache = mod._cache;
    mod._cache = {};
    newModule = origRequire(moduleName);
    mod._cache = origCache;
  } else {
    newModule = origRequire(moduleName);
  }

  interceptRequires = null;
  return newModule;
};

mod._load = function(req){
  var newModule = null;
  if (interceptRequires){
    Object.keys(interceptRequires).some(function(key){
      if (fileIsInPath(req,key)){
        newModule=interceptRequires[key];
        return true;
      }
    });
  }

  return newModule || origLoad.apply(this, arguments);
};
