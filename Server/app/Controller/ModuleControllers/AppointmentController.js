var Modules = require('../../models/Models');
var Helper = require('../../models/Helper');
var Sequelize = require('sequelize');
var Appointment = Modules.Appointment;
var TimeSlot = Modules.TimeSlot;
var User = Modules.User;
var Student = Modules.Student;
var Batch = Modules.Batch;
var Lecturer = Modules.Lecturer;
var Room = Modules.Room;

/**
 * convert JS date to SQL date
 * @param  {DATE} time
 * @return {DATE}
 */
function JSDateToSQLDate(date) {
    return moment(date).format("YYYY-MM-DD");
}

AppointmentController = function() {
    /**
     * save new appointment request
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.saveAppoinmentRequest = function(AppoinmnInstance, res) {
        Student.findOne({
            where: {
                status: 1,
                UserId: AppoinmnInstance.student.userId
            }
        }).then(function(data) {
            Appointment.create({
                appointmentDate: Helper.JSDateToSQLDate(AppoinmnInstance.selectedDate),
                appointmentTitle: AppoinmnInstance.requestTitle,
                appointmentSmallBref: AppoinmnInstance.requestSmallBref,
                status: 1,
                approved: 0,
                reShedule: 0,
                cancel: 0,
                StudentId: data.id,
                TimeSlotId: AppoinmnInstance.selectedTimeSlot.id
            }).then(function(data) {

                res.send(data);
            });
        });

    };
    /**
     * save new appointment request
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.saveAppoinmentRescheduleRequest = function(AppoinmentInstance, res) {
        var approvedStatus = 0;
        if (AppoinmentInstance.userRole == 'Lecturer') {
             approvedStatus = 1;
        }
        
        Appointment.update({           
            appointmentDate : Helper.JSDateToSQLDate(AppoinmentInstance.appointmentDate),
            appointmentNoteStudent : AppoinmentInstance.appointmentNoteStudent,
            TimeSlotId: AppoinmentInstance.TimeSlot.id,
            reShedule: 1,
            approved: approvedStatus
        }, {
            where: {
                id: AppoinmentInstance.id,
            }
        }).then(function(data) {
            res.send(data);
        });

    };
    /**
     * returns all appoinments by the student
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.getMyAllAppoinments = function(UserInstance, res) {
        Student.findOne({
            where: {
                status: 1,
                UserId: UserInstance.userId
            }
        }).then(function(data) {
            Appointment.findAll({
                    where: {
                        status: 1,
                        StudentId: data.id,
                        //StudentId: 1,
                    },
                    include: [{
                        model: TimeSlot,
                        where: {
                            id: Sequelize.col('Appointment.TimeSlotId')
                        }
                    }]

                })
                .then(function(data) {
                    res.send(data);
                });
        });
    };
    /**
     * returns more details of given appointment
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.getAppointmentMoreDetails = function(AppointmentInstance, res) {
        Appointment.findOne({
                where: {
                    status: 1,
                    id: AppointmentInstance.id,
                },
                include: [{
                    model: TimeSlot,
                    where: {
                        id: Sequelize.col('Appointment.TimeSlotId')
                    },
                    include: [{
                        model: Lecturer,
                        where: {
                            id: Sequelize.col('TimeSlot.LecturerId')
                        },
                        include: [{
                            model: User,
                            where: {
                                id: Sequelize.col('TimeSlot.Lecturer.UserId')
                            }
                        }]
                    }]
                }, {
                    model: Room,
                    where: {
                        id: Sequelize.col('Appointment.RoomId')
                    }
                }, {
                    model: Student,
                    where: {
                        id: Sequelize.col('Appointment.StudentId')
                    },

                }]

            })
            .then(function(data) {
                res.send(data);
            });

    };
    /**
     * returns selected pending appoinments to lecture
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.getAnPendingAppoinment = function(AppoimnetInstance, res) {
        Appointment.find({
                where: {
                    status: 1,
                    id: AppoimnetInstance.id,
                },
                include: [{
                    model: TimeSlot,
                    where: {
                        id: Sequelize.col('Appointment.TimeSlotId')
                    }
                }, {
                    model: Student,
                    where: {
                        id: Sequelize.col('Appointment.StudentId')
                    },
                    include: [{
                        model: User,
                        where: {
                            id: Sequelize.col('Student.UserId')
                        },

                    }, {
                        model: Batch,
                        where: {
                            id: Sequelize.col('Student.BatchId')
                        }
                    }]
                }]

            })
            .then(function(data) {

                res.send(data);
            });
    };
    /**
     * returns all pending appointments to lecture
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.getMyAllPendingAppoinments = function(LectureInstance, res) {
        Lecturer.findOne({
            where: {
                status: 1,
                UserId: LectureInstance.userId
            }
        }).then(function(data) {
            Appointment.findAll({
                    where: {
                        status: 1,
                        approved: 0,
                        TimeSlotId: {
                            $in: [Sequelize.literal("SELECT timeSlot.id     FROM timeSlot WHERE timeSlot.LecturerId = '" + data.id + "'")]
                        }
                    },
                    include: [{
                        model: TimeSlot,
                        where: {
                            id: Sequelize.col('Appointment.TimeSlotId')
                        }
                    }]

                })
                .then(function(data) {
                    res.send(data);
                });
        });
    };
    /**
     * returns all apprived appointments to lecture
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.getMyAllApprovedAppoinments = function(LectureInstance, res) {
        Lecturer.findOne({
            where: {
                status: 1,
                UserId: LectureInstance.userId
            }
        }).then(function(data) {
            Appointment.findAll({
                    where: {
                        status: 1,
                        approved: 1,
                        TimeSlotId: {
                            $in: [Sequelize.literal("SELECT timeSlot.id     FROM timeSlot WHERE timeSlot.LecturerId = '" + data.id + "'")]
                        }
                    },
                    include: [{
                        model: TimeSlot,
                        where: {
                            id: Sequelize.col('Appointment.TimeSlotId')
                        }
                    }, {
                        model: Student,
                        where: {
                            id: Sequelize.col('Appointment.StudentId')
                        }
                    }, {
                        model: Room,
                        where: {
                            id: Sequelize.col('Appointment.RoomId')
                        }
                    }]

                })
                .then(function(data) {
                    res.send(data);
                });
        });
    };
    /**
     * returns all available rooms
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.getAllAvailableRooms = function(AppoinmentInstance, res) {
        console.log(AppoinmentInstance);
        var timeSlot = JSON.parse(AppoinmentInstance.timeSlot);
        console.log(Helper.JSDateToSQLDate(AppoinmentInstance.appointmentDate));
        Room.findAll({
                where: {
                    status: 1,
                    id: {
                        $notIn: [
                            Sequelize.literal(
                                "   SELECT appointment.RoomId\n" +
                                "   FROM appointment JOIN timeSlot \n" +
                                "   ON appointment.TimeSlotId = timeSlot.id\n" +
                                "   WHERE timeSlot.fromTime >= (SELECT timeSlot.fromTime FROM timeSlot WHERE timeSlot.id = " + timeSlot.id + ") AND appointment.appointmentDate = '" + Helper.JSDateToSQLDate(AppoinmentInstance.appointmentDate) + "' AND appointment.RoomId IS NOT NULL "
                            )
                        ]
                    }
                }

            })
            .then(function(data) {
                res.send(data);
            });
    };
    /**
     * create an appointment
     * @param  {REQUEST},{RESPONSE}
     * @return {RESPONSE}
     */
    this.makeAppoinment = function(AppoinmentInstance, res) {
        //var room = JSON.parse(AppoinmentInstance.selectedRoom);
        Appointment.update({
            RoomId: AppoinmentInstance.selectedRoom.id,
            appointmentDate : Helper.JSDateToSQLDate(AppoinmentInstance.appointmentDate),
            appointmentNoteLecturer : AppoinmentInstance.appointmentNoteLecturer,
            TimeSlotId: AppoinmentInstance.timeSlot.id,
            approved: 1
        }, {
            where: {
                id: AppoinmentInstance.id,
            }
        }).then(function(data) {
            res.send(data);
        });
    };

};

module.exports = new AppointmentController();
