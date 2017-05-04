
module.exports = SmartDataNet;
function SmartDataNet(core){
  this.core = core;
}

SmartDataNet.prototype.onFCFBStart = () => {
  var date = new Date();
  console.log(date.toDateString());
};
