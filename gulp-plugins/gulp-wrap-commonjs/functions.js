var functions = {

  prefix: function (path) {
    return 'require.register("' + path + '", function (exports, module) {\n';
  },

  suffix: function () {
    return '\n});\n';
  },

  combine: function (path, content) {
    return functions.prefix(path) + content + functions.suffix();
  },
  
};

module.exports = functions;
