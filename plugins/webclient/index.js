var http = require("http");
var fs = require("fs");

module.exports = WebClient;
function WebClient(core){
  this.core = core;

  this.clientPage = fs.readFileSync(core.config.directory + 'plugins/webclient/data/index.html', "utf8");
}

WebClient.prototype.onFCFBStart = function(){
  console.log("WebClient::onFCFBStart()");
  this.server = http.createServer((request, response) => {
      response.setHeader('Content-Type', 'text/html');
      response.end(this.clientPage);
  });
  this.server.listen(81, "127.0.0.1");
}
