var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var QuestionController = ControllerMap.QuestionController;

router.post('/', function(req, res, next) {
    QuestionController.create(req.body, res);
});

router.get('/', function(req, res, next) {
    QuestionController.get(res);
});

router.delete('/', function(req, res, next) {
    QuestionController.delete(req.query.questionId, res);
});

router.put('/', function(req, res, next) {
    QuestionController.update(req.query.question, req.query.id, res);
});

module.exports = router;
