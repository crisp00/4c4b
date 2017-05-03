
module.exports = CoreStateMachine;
function CoreStateMachine(corefcfb){
  this.core = corefcfb;
  this.state = {};
}

CoreStateMachine.prototype.updateState = function(newState){
  for(key in newState){
    this.state[key] = newState[key];
  }
  console.log("Received state update. New State: " + JSON.stringify(this.state));
}
