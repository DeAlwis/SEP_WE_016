/**
 * Created by User on 9/6/2016.
 * Develop: Amila
 * Registry of the model and every model have to register here
 */
var Models = {};


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
Models.TimeSlot = require('./entity/TimeSlot');

// Required by Login 
Models.UserRole = require('./entity/UserRole');
Models.User = require('./entity/User');

//Required by User Module
Models.Lecturer = require('./entity/Lecturer');
Models.Student = require('./entity/Student');
Models.Hod = require('./entity/Hod');
Models.QuestionTemplate = require('./entity/QuestionTemplate');


module.exports = Models;
