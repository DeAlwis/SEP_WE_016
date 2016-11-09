/**
 * Created by User on 9/9/2016.
 * Developer: Amila
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var SubjectController = ControllerMap.SubjectController;

router.get('/', function(req, res, next) {
    SubjectController.get(res);
});

router.post('/', function(req, res, next) {
    SubjectController.create(req.body, res);
});

router.delete('/', function(req, res, next) {
    SubjectController.delete(req.query.subjectId, res);
});

router.put('/', function(req, res, next) {
    SubjectController.updateSubject(req.query.subjectId, req.query.subjectCode, req.query.subjectCredit, req.query.subjectName, res);
});

router.get('/getNames', function(req, res, next) {
    SubjectController.getByName(res);
});

module.exports = router;
