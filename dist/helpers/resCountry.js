"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var resCountry = function resCountry(data, country) {
  var results = [];
  var ResCountry = country;
  if (!ResCountry) {
    ResCountry = "nothing";
  }
  data.map(function (el) {
    var resCountries = el.resCountries;
    if (resCountries.includes(ResCountry)) {} else {
      results.push(el);
    }
  });
  if (results) {
    return results;
  }
  return null;
};
var _default = exports["default"] = resCountry;