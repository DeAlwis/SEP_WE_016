/**
 * Created by User on 9/9/2016.
 * Developer : Amila
 */
var Modules = require('../../models/Models');
var Subject = Modules.Subject;


SubjectController = function() {
  /*
   * get all the Subjects
   */
  this.get = function(res) {
    Subject.findAll().then(function(data) {
      res.send(data);
    });
  };

  /*
  * insert new subject
  */
  this.create = function(subjectInstance, res) {
    Subject.create(subjectInstance).then(function(data) {
      res.send(data);
    });
  }

  /*
   * delete subject
   */
  this.delete = function(subjectId, res) {
    Subject.find({
      where: {
        id: subjectId
      }
    }).then(function(subject) {
      if(subject) {
        subject.destroy().then(function(data) {
          res.send(data);
        });
      }
    })
  };

  /*
   * update subject
   */ 
  this.updateSubject = function(subjectId, subjectCode, subjectCredit, subjectName, res) {
    Subject.find({
      where: {
        id: subjectId
      }
    }).then(function(subject) {
      if(subject) {
        subject.update({
          subjectName: subjectName,
          subjectCredit: subjectCredit,
          subjectCode: subjectCode
        }).then(function(data) {
          res.send(data);
        });
      }
    });
  }

  /*
   * get by name
   */
  this.getByName = function(res) {
    Subject.findAll({
      attributes: ['subjectName', 'id']
    }).then(function(subjectNames) {
      res.send(subjectNames);
    });
  }
};

module.exports = new SubjectController();
