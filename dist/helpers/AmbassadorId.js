"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var genUsername = require('unique-username-generator');
var AmbassadorIdGenerator = function AmbassadorIdGenerator(email) {
  var ambassadorId = genUsername.generateFromEmail(email, 3);
  return ambassadorId;
};
var _default = exports["default"] = AmbassadorIdGenerator;