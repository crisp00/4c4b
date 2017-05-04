var http = require("http");
var fs = require("fs");

module.exports = WebClient;
function WebClient(core){
  this.core = core;

  this.clientPage = fs.readFileSync(core.config.directory + 'plugins/webclient/data/index.html', "utf8");
  console.log(this.clientPage);
}

WebClient.prototype.onFCFBStart = function(){
  console.log(this.clientPage);
  console.log("WebClient::onFCFBStart()");
  this.server = http.createServer((request, response) => {
      console.log("HTTP Request");
      response.setHeader('Content-Type', 'text/html');
      response.end(this.clientPage);
  });
  this.server.listen(80, "0.0.0.0");
}
