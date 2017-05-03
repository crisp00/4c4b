var http = require("http");
var fs = require("fs");

module.exports = CoreWebClient;
function CoreWebClient(core){
  this.core = core;
  this.clientPage = fs.readFileSync('/4c4b/webclient/index.html');
  this.server = http.createServer((request, response) => {
      response.setHeader('Content-Type', 'text/html');
      response.end(this.clientPage);
  });
  this.server.listen(80, "0.0.0.0")
}
