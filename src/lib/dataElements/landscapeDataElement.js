
var lb_data = require("./landscapAPIModule");

module.exports = function(settings) {
  return lb_data(settings.landscapeAttr);
};

