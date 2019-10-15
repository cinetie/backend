const getCurrentDate = ()=>{
    return Date.prototype.toUTCString();
};

const addMoreDays = (days) =>{
    const now = new Date();
    const date = new Date(now.valueOf());
    date.setDate(date.getDate()+days);
    return date;
};

export default { getCurrentDate,addMoreDays};