/*
 * handle the url for any get, put, post and delete request
 * developer : Amila
 */
var express = require('express');
var router = express.Router();
var StudentRoute = require('./moduleRoutes/StudentRoute');
var UserTypeRoute = require('./moduleRoutes/UserTypeRoute');
var LecturerRoute = require('./moduleRoutes/LecturerRoute');
var FacultyRoute = require('./moduleRoutes/FacultyRoute');
var SubjectRoute = require('./moduleRoutes/SubjectRoute');
var RequestRoute = require('./moduleRoutes/RequestRoute');
var QuestionRoute = require('./moduleRoutes/QuestionRoute');

router.use('/student/', StudentRoute);
router.use('/userType/', UserTypeRoute);
router.use('/lecturer/', LecturerRoute);
router.use('/subject/', SubjectRoute);
router.use('/faculty/', FacultyRoute);
router.use('/request/', FacultyRoute);
router.use('/question/', QuestionRoute);

module.exports = router;
