var util = require("util");
var Organel = require("organic").Organel;
var Chemical = require("organic").Chemical;

module.exports = function LogicAction(plasma, config){
  Organel.call(this, plasma);

  this.config = config;

  this.on(config.handleChemicalType || "LogicAction", function(chemical, sender, callback){
    var dataLogic = chemical.action;
    
    var self = this;
    if(Array.isArray(dataLogic)) {
      var next = function(){
        var handler = dataLogic.shift();
        if(handler) {
          handler = require(process.cwd()+handler);
          handler.call(self, chemical, next);
        } else
          callback(chemical);
      }
      next();
    } else {
      dataLogic = require(process.cwd()+dataLogic);
      dataLogic.call(this, chemical, callback);
    }
  });
}

util.inherits(module.exports, Organel);