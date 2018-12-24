module.exports = Demo;
function Demo(core){
    this.core = core;
}

Demo.prototype.onFCFBStart = function(){
    this.core.statemachine.updateState({"temp":21, "humid":60});

};

