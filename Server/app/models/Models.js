/**
 * Created by User on 9/6/2016.
 * Develop: Amila
 * Registry of the model and every model have to register here
 */
var Models = {};

Models.Lecturer = require('./entity/Lecturer');
Models.LecturerAvailability = require('./entity/LecturerAvailability');
Models.User = require('./entity/User');
Models.Student = require('./entity/Student');
Models.UserType = require('./entity/UserType');
Models.Hod = require('./entity/Hod');
Models.FeedBackSession = require('./entity/FeedbackSession');
Models.Feedback = require('./entity/Feedback');
Models.Question = require('./entity/Question');
Models.Subject = require('./entity/Subject');
Models.Center = require('./entity/Center');
Models.Faculty = require('./entity/Faculty');
Models.Department = require('./entity/Department');
Models.Batch = require('./entity/Batch');
//Models.Request = require('./entity/Request');
Models.Room = require('./entity/Room');
Models.Appointment = require('./entity/Appointment');
Models.QuestionTemplate = require('./entity/QuestionTemplate');


module.exports = Models;
