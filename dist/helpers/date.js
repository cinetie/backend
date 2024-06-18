"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var getCurrentDate = function getCurrentDate() {
  return Date.prototype.toUTCString();
};
// add specified number of days to today's date
var addMoreDays = function addMoreDays(days) {
  var now = new Date();
  var date = new Date(now.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
// if today's date is 30 and tommorow is 31 then return 0 if tommorow !=31 and today is 30 return 1
// if today's date == 31 return 1 and lastly if today's date !=30 then return 0
// 0 :false 1: true
var isEndOfMonth = function isEndOfMonth() {
  var now = new Date();
  if (now.getDate() === 21) {
    var tommorow = new Date(now.valueOf());
    tommorow.setDate(tommorow.getDate() + 1);
    if (tommorow.getDate() === 31) {
      return 0;
    }
    return 1;
  }
  if (now.getDate() === 31) {
    return 1;
  }
  return 0;
};
var isEndOfyear = function isEndOfyear() {
  var now = new Date();
  // now.getMonth() === 12 && now.getDate() === 31
  if (now.getMonth() === 3 && now.getDate() === 15) {
    return 1;
  }
  return 0;
};
var convertToTimestamp = function convertToTimestamp(date) {
  var newDate = new Date(date).getTime();
  return newDate;
};
var removeDays = function removeDays(days) {
  var start = new Date();
  var date = new Date(start.getTime());
  date.setDate(date.getDate() - days);
  return date.getTime();
};
var convertToISO = function convertToISO(date) {
  var isoDate = new Date(date);
  return isoDate.toISOString();
};
var compareDates = function compareDates(date1, date2) {
  var sysDate = "".concat(date1.getFullYear(), "-").concat(date1.getMonth() + 1, "-").concat(date1.getDate());
  var raveDate = "".concat(date2.getFullYear(), "-").concat(date2.getMonth() + 1, "-").concat(date2.getDate());
  var result = sysDate === raveDate ? 1 : 0;
  return result;
};
var _default = exports["default"] = {
  getCurrentDate: getCurrentDate,
  addMoreDays: addMoreDays,
  isEndOfMonth: isEndOfMonth,
  isEndOfyear: isEndOfyear,
  convertToTimestamp: convertToTimestamp,
  removeDays: removeDays,
  convertToISO: convertToISO,
  compareDates: compareDates
};