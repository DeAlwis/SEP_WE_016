/**
 * Created by User on 9/9/2016.
 * Developer: Amila
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var LecturerController = ControllerMap.LecturerController;
var LecturerAvailabilityController = ControllerMap.LecturerAvailabilityController;

router.get('/', function(req, res, next) {
    LecturerController.get(res);
});

router.get('/get-my-appointments', function(req, res, next) {
    LecturerController.getMyAppointments(req.query, res);

});

router.get('/get-my-slots', function(req, res, next) {
    LecturerAvailabilityController.getMyTimeSlots(req.query, res);

});

router.post('/save-timeslot', function(req, res, next) {
    LecturerAvailabilityController.saveTimeSlot(req.body, res);

});

router.put('/update-timeslot', function(req, res, next) {
    LecturerAvailabilityController.updateTimeSlot(req.body, res);

});

router.delete('/delete-timeslot', function(req, res, next) {
    LecturerAvailabilityController.deleteTimeSlot(req.query, res);

});

router.put('/toggle-timeslot', function(req, res, next) {
    LecturerAvailabilityController.toggleVisibility(req.body, res);
});



router.post('/', function(req, res, next) {
    LecturerController.create(req.body, res);
});

router.put('/', function(req, res, next) {
    LecturerController.update(req.body, res);
});

router.get('/:lecturername', function(req, res, next) {
    LecturerController.getEachLecturer(req.params.lecturername, res);
});

router.delete('/', function(req, res, next) {
    LecturerController.delete(req.body, res);
});
module.exports = router;
