/**
 * Created by User on 9/9/2016.
 * Developer: Namila
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var AppointmentController = ControllerMap.AppointmentController;
var TimeSlotController = ControllerMap.TimeSlotController;


router.get('/get-my-appointments', function(req, res, next) {
    AppointmentController.getMyAllAppoinments(req.query, res);

});

router.get('/l-get-my-appointments', function(req, res, next) {
    AppointmentController.getMyAllApprovedAppoinments(req.query, res);

});

router.get('/get-my-pending-appointments', function(req, res, next) {
    AppointmentController.getMyAllPendingAppoinments(req.query, res);

});

router.get('/get-a-appointment', function(req, res, next) {
    AppointmentController.getAppointmentMoreDetails(req.query, res);

});

router.get('/get-a-pending-appointment', function(req, res, next) {
    AppointmentController.getAnPendingAppoinment(req.query, res);

});

router.get('/get-available-rooms', function(req, res, next) {
    AppointmentController.getAllAvailableRooms(req.query, res);

});

router.post('/save-appointment-request', function(req, res, next) {
    AppointmentController.saveAppoinmentRequest(req.body, res);

});
router.put('/save-reschedule-request', function(req, res, next) {
    AppointmentController.saveAppoinmentRescheduleRequest(req.body, res);

});

router.put('/make-appoinment', function(req, res, next) {
    AppointmentController.makeAppoinment(req.body, res);

});

module.exports = router;
