"use strict";
var DHT11Sensor = require("./DHT11.js");
var CoreStateMachine = require("./statemachine.js");
var CorePluginLoader = require("./plugins/");
var config = require("./config.json");

var core = new CoreFCFB();

module.exports = CoreFCFB;
function CoreFCFB(){
  console.log("4c4b Started!");
  this.version = "0.0.1";
  this.config = config;
  this.statemachine = new CoreStateMachine(this);
  this.dht11 = new DHT11Sensor(this);
  this.pluginLoader = new CorePluginLoader(this);
  this.pluginClasses = this.pluginLoader.plugins;

  this.plugins = {};
  for(plugin in this.pluginClasses){
    this.plugins[plugin] = new this.pluginClasses[plugin](this);
  }

  for(plugin in this.plugins){
    this.plugins[plugin].onFCFBStart();
  }

}
