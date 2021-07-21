'use strict'

const debug = require('debug')('debug:convert');
const moment = require('moment');

let convertOutputDate = (date, isToday=false, isNow=false, isGetMoment=false) => {
    if(isToday)
        return moment().format("DD-MM-YYYY");
    if(!date)
        return null;
    if( moment(date, "YYYY-MM-DD HH:mm:ss", true).isValid() ){
        let ret = moment(date, "YYYY-MM-DD HH:mm:ss");
        return isGetMoment ? ret : ret.format("DD-MM-YYYY HH:mm:ss");
    }
    if( moment(date, "YYYY-MM-DD", true).isValid() ){
        let ret = moment(date, "YYYY-MM-DD");
        return isGetMoment ? ret : ret.format("DD-MM-YYYY HH:mm:ss");
    }
    return null;
};

module.exports = {
    convertOutputDate
}