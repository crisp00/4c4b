
module.exports = CoreStateMachine;
function CoreStateMachine(corefcfb){
  this.core = corefcfb;
  this.state = {};
  this.freshCallbacks = [];
}

CoreStateMachine.prototype.updateState = function(newState){
  for(key in newState){
    this.state[key] = newState[key];
  }
  console.log("Received state update. New State: " + JSON.stringify(this.state));
  this.fresh();
}

CoreStateMachine.prototype.onFresh = function(callback){
  if(typeof callback === "function"){
    this.freshCallbacks = this.freshCallbacks.concat([callback]);
  }
}

CoreStateMachine.prototype.fresh = function(){
  for(callback of this.freshCallbacks){
    callback(this.state);
  }
}
