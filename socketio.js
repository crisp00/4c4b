var io = require('socket.io');

module.exports = SocketIOAPI;
function SocketIOAPI(core){
  var self = this;

  this.core = core;
  this.io = io();
  this.io.on("connection", function(client){
    console.log("connection");
    client.on("getState", (data) => {
      console.log("getState");
      client.emit("pushState", self.core.statemachine.state);
    });
    client.on("disconnect", () => {});
  });
  this.io.listen(3000);
}
