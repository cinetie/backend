const getCurrentDate = () => Date.prototype.toUTCString();
// add specified number of days to today's date
const addMoreDays = (days) => {
  const now = new Date();
  const date = new Date(now.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
// if today's date is 30 and tommorow is 31 then return 0 if tommorow !=31 and today is 30 return 1
// if today's date == 31 return 1 and lastly if today's date !=30 then return 0
// 0 :false 1: true
const isEndOfMonth = () => {
  const now = new Date();
  if (now.getDate() === 21) {
    const tommorow = new Date(now.valueOf());
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
const isEndOfyear = () => {
  const now = new Date();
  // now.getMonth() === 12 && now.getDate() === 31
  if (now.getMonth() === 3 && now.getDate() === 15) {
    return 1;
  }
  return 0;
};
const convertToTimestamp = (date) => {
  const newDate = new Date(date).getTime();
  return newDate;
};
const removeDays = (days) => {
  const start = new Date();
  const date = new Date(start.getTime());
  date.setDate(date.getDate() - days);
  return date.getTime();
};
const convertToISO = (date) => {
  const isoDate = new Date(date);
  return isoDate.toISOString();
};

const compareDates = (date1, date2) => {
  const sysDate = `${date1.getFullYear()}-${
    date1.getMonth() + 1
  }-${date1.getDate()}`;
  const raveDate = `${date2.getFullYear()}-${
    date2.getMonth() + 1
  }-${date2.getDate()}`;
  const result = sysDate === raveDate ? 1 : 0;
  return result;
};

export default {
  getCurrentDate,
  addMoreDays,
  isEndOfMonth,
  isEndOfyear,
  convertToTimestamp,
  removeDays,
  convertToISO,
  compareDates,
};
