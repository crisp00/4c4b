var http = require("http");

module.exports = SmartDataNet;
function SmartDataNet(core){
  console.log("Initializing SmartDataNet plugin");
  this.core = core;
  console.log("4c4b version " + this.core.version);
}

SmartDataNet.prototype.onFCFBStart = function(){
  var self = this;
  console.log("SmartDataNet::onFCFBStart");

  this.baseRequest = {
    hostname: "stream.smartdatanet.it",
    path: "/api/input/the4bees_avogadro/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic dGhlNGJlZXNfYXZvZ2Fkcm86S1NlMGI4Y0d5cg=="
    }
  };

  this.baseBody = {
    "stream": "4CIGruppo4Device01",
    "sensor": "4d599e4f-5827-4bf5-fc30-d610d3b6f3b6",
    "values": [{
      // "time": "2015-03-10T11:30:00Z",
      "components": {
          "id": "DHT11",
          // "T": 20,
          // "H": 50,
       },
       "validity": "valid"
    }]
  };

  this.core.statemachine.onFresh((state) => {
    //console.log("SmartDataNet::fresh");
    var reqObj = self.baseRequest;
    var req = http.request(reqObj, (response) => {
      //console.log("SmartDataNet::Response status " + response.statusCode + ":" + response.statusMessage);
      var data = "";
      response.on("data", (newData) => {
        data = data + newData;
      });
      response.on("end", () => {
        //console.log("Response data: " + data);
      });
    });
    var body = self.baseBody;
    var date = new Date();
    body.values[0].time = self.computeTime(date);
    body.values[0].components.T = state.temp;
    body.values[0].components.H = state.humid;
    req.end(JSON.stringify(body));
    //console.log(JSON.stringify(body));
  });
};

SmartDataNet.prototype.computeTime = function(date){
  return date.getFullYear() + "-" + pad(date.getMonth(), 2) + "-" + pad(date.getDay(), 2) + "T" + pad(date.getHours(), 2) + ":" +
   pad(date.getMinutes(), 2) + ":" + pad(date.getSeconds(), 2) + "Z";
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
