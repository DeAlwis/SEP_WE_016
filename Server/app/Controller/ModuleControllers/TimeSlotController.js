/**
 * Created by User on 9/9/2016.
 * Developer : Namila Radith
 */
var Sequelize = require('../../models/Connection.js');
var Modules = require('../../models/Models');
var Helper = require('../../models/Helper');
var ControllerMap = require('../ControllerMap');
var Lecturer = Modules.Lecturer;
var TimeSlot = Modules.TimeSlot;



/**
* initilize basic day object 
 */
var initDays = function() {
    return [{
        day: 'Monday',
        checked: false,
        timeSlots: []
    }, {
        day: 'Tuesday',
        checked: false,
        timeSlots: []
    }, {
        day: 'Wednesday',
        checked: false,
        timeSlots: []
    }, {
        day: 'Thursday',
        checked: false,
        timeSlots: []
    }, {
        day: 'Friday',
        checked: false,
        timeSlots: []
    }, {
        day: 'Saturday',
        checked: false,
        timeSlots: []
    }, {
        day: 'Sunday',
        checked: false,
        timeSlots: []
    }, ];
};
TimeSlotController = function() {
    /**
     * insert new time slot
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.saveTimeSlot = function(TimeSlotInstance, res) {

        //create new TimeSlot instanse and set parameters
        Lecturer.findOne({
            where: {
                status: 1,
                UserId: TimeSlotInstance.userId
            }
        }).then(function(data) {
            TimeSlot.create({
                day: TimeSlotInstance.dayDetails.day,
                isChecked: TimeSlotInstance.dayDetails.checked,
                fromTime: Helper.convertTo24Hours(TimeSlotInstance.slot.from),
                toTime: Helper.convertTo24Hours(TimeSlotInstance.slot.to),
                status: 1,
                hide: false,
                LecturerId: data.id
            }).then(function(data) {

                res.send(data);
            });
        })

    };

    /**
     * returns all time slots for given lecture
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.getMyTimeSlots = function(UserInstance, res) {
        //get all time slots
        Lecturer.findOne({
            where: {
                status: 1,
                UserId: UserInstance.userId
            }
        }).then(function(data) {
            TimeSlot.findAll({
                where: {
                    status: 1,
                    LecturerId: data.id
                }

            }).then(function(data) {
                //fill days array using reytrived data
                var days = [];
                days = initDays();
                //iterate through days array
                for (var i = 0, len = days.length; i < len; i++) {
                    //iterate through data array
                    for (var j = 0, len2 = data.length; j < len2; j++) {
                        //if day in days equals day in data then
                        if (days[i].day === data[j].day) {
                            //day checkbox set enable
                            days[i].checked = data[j].isChecked;
                            //push new day object to day object time slot property
                            days[i].timeSlots.push({
                                //convert date values
                                id: data[j].id,
                                from: Helper._24HoursToJsDateFormat(data[j].fromTime),
                                to: Helper._24HoursToJsDateFormat(data[j].toTime),
                                status: data[j].status,
                                visibility: data[j].hide,
                            });
                        }
                    }
                }

                res.send(days);

            });
        });

    };
    /**
     * delete given time slot
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.deleteTimeSlot = function(TimeSlotInstance, res) {
        //console.log(TimeSlotInstance);
        TimeSlot.find({
            where: {
                id: TimeSlotInstance.id
            }
        }).then(function(data) {
            if (data) {
                console.log(data);
                data.destroy().then(function(result) {
                    return res.send(result);
                });
            }
            return;
        });
    };
    /**
     * toggle visibility of given time slot
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.toggleVisibility = function(TimeSlotInstance, res) {
        TimeSlot.update({
            hide: TimeSlotInstance.visibility
        }, {
            where: {
                id: TimeSlotInstance.id,
            }
        }).then(function(data) {
            res.send(data);
        });
    };
    /**
     * update given time slot
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.updateTimeSlot = function(TimeSlotInstance, res) {
        console.log(TimeSlotInstance);
        TimeSlot.update({
            fromTime: Helper.convertTo24Hours(TimeSlotInstance.from),
            toTime: Helper.convertTo24Hours(TimeSlotInstance.to)
        }, {
            where: {
                id: TimeSlotInstance.id,
            }
        }).then(function(data) {
            res.send(data);
        });
    };
    /**
     * list all free TimeSlots for given date and lecture
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.getAvailableTimeSlots = function(DataInstance, res) {
        TimeSlot.findAll({
                where: {
                    status: 1,
                    LecturerId: DataInstance.id,
                    hide: 0,
                    day: Helper.getDay(DataInstance.date),
                    id: {
                        $notIn: [Sequelize.literal("SELECT a.TimeSlotId FROM appointment a WHERE a.appointmentDate >= '" + Helper.JSDateToSQLDate(DataInstance.date) + "'")],
                    }
                }
            })
            .then(function(data) {
                var timeSlots = [];
                for (var i = 0, len2 = data.length; i < len2; i++) {
                    timeSlots.push({
                        id: data[i].id,
                        day: data[i].day,
                        fromTime: Helper._24HoursToAmPm(data[i].fromTime),
                        toTime: Helper._24HoursToAmPm(data[i].toTime),
                        status: data[i].status,
                        hide: data[i].hide,
                        isChecked: data[i].isChecked,
                        createdAt: data[i].createdAt,
                        updatedAt: data[i].updatedAt,
                        deletedAt: data[i].deletedAt,
                        LecturerId: data[i].LecturerId
                    });
                }
                res.send(timeSlots);
            });
    };
    /**
     * list all free TimeSlots for given date and lecture
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.getMoreAvailableTimeSlots = function(DataInstance, res) {
            console.log(DataInstance);
 
            TimeSlot.findAll({
                    where: {
                        status: 1,
                        LecturerId: DataInstance.LecturerId,
                        hide: 0,
                        day: Helper.getDay(DataInstance.appointmentDate),
                        id: {
                            $notIn: [Sequelize.literal("SELECT a.TimeSlotId FROM appointment a WHERE a.appointmentDate >= '" + Helper.JSDateToSQLDate(DataInstance.appointmentDate) + "'")],
                        }
                    }
                })
                .then(function(data) {
                    var timeSlots = [];
                    for (var i = 0, len2 = data.length; i < len2; i++) {
                        timeSlots.push({
                            id: data[i].id,
                            day: data[i].day,
                            fromTime: Helper._24HoursToAmPm(data[i].fromTime),
                            toTime: Helper._24HoursToAmPm(data[i].toTime),
                            status: data[i].status,
                            hide: data[i].hide,
                            isChecked: data[i].isChecked,
                            createdAt: data[i].createdAt,
                            updatedAt: data[i].updatedAt,
                            deletedAt: data[i].deletedAt,
                            LecturerId: data[i].LecturerId
                        });
                    }
                    res.send(timeSlots);
                });
        
    };
};
module.exports = new TimeSlotController();
