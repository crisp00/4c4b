var pluginsFile = require("./plugins.json");

module.exports = CorePluginLoader;
function CorePluginLoader(core){
  this.core = core;
  this.plugins = {};
  for(plugin in pluginsFile){
    this.plugins[pluginsFile[plugin].name] = require("./" + pluginsFile[plugin].name + "/");
  }
}
