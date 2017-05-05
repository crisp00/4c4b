var io = require("socket.io");

module.exports = SocketIO;
function SocketIO(core){
  this.core = core;
}

SocketIO.prototype.onFCFBStart = function(){
  var self = this;

  this.io = io();
  this.io.on("connection", function(client){
    console.log("connection");
    client.on("getState", (data) => {
      //console.log("getState");
      client.emit("pushState", self.core.statemachine.state);
    });
    client.on("disconnect", () => {});
  });
  this.io.listen(3000);
}
