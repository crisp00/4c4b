var rpiDhtSensor = require('rpi-dht-sensor');


module.exports = DHT11Sensor;
function DHT11Sensor(corefcfb){
  this.core = corefcfb;
  this.sensor = new rpiDhtSensor.DHT11(4);
  this.updateRepeat(1000);
}

DHT11Sensor.prototype.updateRepeat = function(updateInterval){
  var self = this;

  var reads = this.sensor.read();
  console.log("DHT11Sensor Update: Humidity: " + reads.humidity + "% , Temperature: " + reads.temperature + "C°");
  this.core.statemachine.updateState({"temp":reads.temperature, "humid":reads.humidity});
  setTimeout(function(){self.updateRepeat(updateInterval)}, updateInterval);
}
