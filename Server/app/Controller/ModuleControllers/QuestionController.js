var Modules = require('../../models/Models');
var Question = Modules.Question;

QuestionController = function() {
    this.create = function(questionInstance, response) {
        Question.create(questionInstance).then(function(result) {
            response.send(result);
        });
    };

    this.get = function(res) {
        Question.findAll().then(function(data) {
            res.send(data);
        });
    };


    this.update = function(questionInstance, id, res) {
        console.log(questionInstance);
        Question.find({
            where: {
                id: id
            }
        }).then(function(question) {
            question.update({
                question: questionInstance
            }).then(function(result) {
                res.send(result);
            });
        });
    };


    this.delete = function(questionId, res) {
        Question.find({
            where: {
                id: questionId
            }
        }).then(function(data) {
            data.destroy().then(function(response) {
                return res.send(response);
            });
        });
    };
};

module.exports = new QuestionController();
