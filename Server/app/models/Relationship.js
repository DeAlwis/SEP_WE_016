/**
 * Created by Amila on 9/7/2016.
 * Modified by Pasindu on 9/9/2016.
 * create relationship in between each models.
 */
var Models = require('./Models');
var connection = require('./Connection');
var Relationship = function() {



    /**added by Kasun*/

    //User Type Relationship

    Models.UserRole.hasMany(Models.User)
    Models.User.belongsTo(Models.UserRole)

    //User Management Relationship
    
    Models.User.hasMany(Models.Hod)
    Models.User.hasMany(Models.Student)
    Models.User.hasMany(Models.Lecturer)

    Models.Hod.belongsTo(Models.User)
    Models.Student.belongsTo(Models.User)
    Models.Lecturer.belongsTo(Models.User)
 
    Models.Hod.belongsTo(Models.Department)
   
    





    Models.Hod.hasMany(Models.FeedBackSession)
    Models.FeedBackSession.belongsTo(Models.Hod)

    Models.FeedBackSession.hasMany(Models.Feedback)
    Models.Feedback.belongsTo(Models.FeedBackSession)

    Models.Subject.hasMany(Models.FeedBackSession)
    Models.FeedBackSession.belongsTo(Models.Subject)

    Models.Question.hasMany(Models.Feedback)
    Models.Feedback.belongsTo(Models.Question)

    Models.Center.belongsTo(Models.Subject)
    Models.Subject.hasMany(Models.Center)

    Models.Faculty.belongsToMany(Models.Center,{through: 'FacultyCenter'})
    Models.Center.belongsToMany(Models.Faculty,{through: 'FacultyCenter'})

    Models.Department.belongsToMany(Models.Faculty,{through: 'DepartmentFaculty'})
    Models.Faculty.belongsToMany(Models.Department,{through: 'DepartmentFaculty'})

    Models.Center.hasMany(Models.Batch)
    Models.Batch.belongsTo(Models.Center)

    Models.Department.hasMany(Models.Batch)
    Models.Batch.belongsTo(Models.Department)

    Models.Batch.hasMany(Models.Student)
    Models.Student.belongsTo(Models.Batch)

    Models.Lecturer.belongsToMany(Models.Batch,{through: 'LecturerBatch'})
    Models.Batch.belongsToMany(Models.Lecturer, {through: 'LecturerBatch'})

    Models.Student.hasMany(Models.Request)
    Models.Request.belongsTo(Models.Student)

    Models.Lecturer.hasMany(Models.Request)
    Models.Request.belongsTo(Models.Lecturer)

    Models.Lecturer.hasMany(Models.Room)
    Models.Room.belongsTo(Models.Lecturer)


   
    Models.Appointment.belongsTo(Models.Request)



    Models.Appointment.belongsTo(Models.Room)

    /**added by pasindu*/
   

    Models.Lecturer.hasMany(Models.FeedBackSession)
    Models.FeedBackSession.belongsTo(Models.Lecturer)

    Models.Subject.belongsToMany(Models.Lecturer,{through: 'SubjectLecturer'})
    Models.Lecturer.belongsToMany(Models.Subject,{through: 'SubjectLecturer'})

    Models.FeedBackSession.belongsTo(Models.Subject)

    Models.Request.belongsTo(Models.Subject)

    Models.FeedBackSession.belongsTo(Models.Center)

    Models.FeedBackSession.belongsTo(Models.Faculty)

    Models.FeedBackSession.belongsTo(Models.Department)

    Models.FeedBackSession.belongsTo(Models.Batch)

    Models.QuestionTemplate.belongsToMany(Models.Question, {
       through: 'QuestionTemplateQuestion'
    });
    Models.Question.belongsToMany(Models.QuestionTemplate, {
        through: 'QuestionTemplateQuestion'
    });



    // Relation for batch - subject
    Models.Subject.belongsToMany(Models.Batch, {
        through: {
            model: Models.BatchSubject,
            unique: false
        },
        foreignKey: 'subjectId',
        constraints: false
    });
    Models.Batch.belongsToMany(Models.Subject, {
        through: {
            model: Models.BatchSubject,
            unique: false
        },
        foreignKey: 'batchId',
        constraints: false
    });



    Models.Room.belongsTo(Models.Faculty)

    connection
        .sync()
        .then(function(err) {
            console.log("Database created");
        }, function (err) {
            console.log('An error occurred while creating the table:', err);
        });
}

module.exports = new Relationship();