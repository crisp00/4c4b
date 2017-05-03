"use strict";
var DHT11Sensor = require("./DHT11.js");
var CoreStateMachine = require("./statemachine.js");
var SocketioAPI = require("./socketio.js");
var CoreWebClient = require("./webclient.js");

var core = new CoreFCFB();

module.exports = CoreFCFB;
function CoreFCFB(){
  console.log("4c4b Started!");
  this.statemachine = new CoreStateMachine(this);
  this.dht11 = new DHT11Sensor(this);
  this.socketioAPI = new SocketioAPI(this);
  this.webclient = new CoreWebClient(this);
}
