var moment = require('moment');

var Helper = {

    /**
     * convert AM PM hour to 24type hours
     * @param  {DATE} time
     * @return {DATE}
     */
    convertTo24Hours : function(time) {
        return moment(time).format("HH:mm");
    },
    /**
     * convert 24type hour to JS format
     * @param  {DATE} time
     * @return {DATE}
     */
    _24HoursToJsDateFormat : function(time) {
        return moment(time, 'HH:mm:ss');
    },

    /**
     * convert 24type hour to AM PM
     * @param  {DATE} time
     * @return {DATE}
     */
    _24HoursToAmPm : function(time) {
        return moment(time, 'HH:mm:ss').format("hh:mm A");
    },

    /**
     * convert JS date to SQL date
     * @param  {DATE} time
     * @return {DATE}
     */
    JSDateToSQLDate : function(date) {
        return moment(date).format("YYYY-MM-DD");
    },

    /**
     * get day from JS date
     * @param  {DATE} time
     * @return {DATE}
     */
    getDay : function(date) {
        var number = moment(date).day();
        switch (number) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
        }
    }

};
module.exports = Helper;
