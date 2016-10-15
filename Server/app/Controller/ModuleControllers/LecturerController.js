/**
 * Created by User on 9/9/2016.
 * Developer : Amila
 */
var Modules = require('../../models/Models');
var Lecturer = Modules.Lecturer;
var Appointment = Modules.Appointment;
var Room = Modules.Room;
var Request = Modules.Request;
var moment = require('moment');

LecturerController = function() {

    this.get = function(res) {
        Lecturer.findAll().then(function(data) {
          res.send(data);
        });
    }

    this.getMyAppointments = function(RequestInstance, res) {
        console.log(RequestInstance);
        Appointment.findAll({
            where: {
                status: 1
            },
            include: [{
                model: Room,
                where: { id: Sequelize.col('Appointment.RoomId') }
            }, {
                model: Request,
                where: {
                        //id: Sequelize.col('Appointment.RequestId'),
                        LecturerId:RequestInstance.id,
                }
            }]
        }).then(function(data) {
            res.send(data);

        });
    };

    this.saveTimeslot = function(LecturerInstance, res){
      console.log(LecturerInstance);
      console.log(convertTo24Hours(LecturerInstance.slot.from));

    };

    this.create = function(LecturerInstance, res) {
        Lecturer.create(LecturerInstance).then(function(data) {
            res.send(data);
        });
    };

    this.update = function(LecturerInstance, res) {
        Lecturer.update({
            lecturerFullName: LecturerInstance.lecturerFullName
        },{
            where:{
                lecturerId: LecturerInstance.lecturerId
            }
        }).then(function(data) {
            res.send(data);
        });
    };

    this.delete = function(LectureInstance, res) {
        Lecturer.destroy({
            where: {
                lecturerId: LectureInstance.lecturerId
            }
        });
    };

    this.getEachLecturer = function(LecturerName, res) {
        Lecturer.find({
            where: {
               lecturerFullName :{
                   $like: LecturerName
               }
            }
        }).then(function(data) {
            res.send(data);
        });
    };
};

function convertTo24Hours(time) {
  return moment(time.hour + ':' + time.min +' '+time.period , ["h:mm A"]).format("HH:mm");
}

module.exports = new LecturerController();
