/**
 * Created by User on 9/16/2016.
 * Developer: Namila
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var RequestController = ControllerMap.RequestController;

router.get('/', function(req, res, next) {
    RequestController.get(res);
});

router.post('/create', function(req, res, next) {
    RequestController.create(req.body, res);
});

router.put('/', function(req, res, next) {
    RequestController.update(req.body, res);
});

router.delete('/', function(req, res, next) {
    RequestController.delete(req.body, res);
});

router.get('/:studentNo', function(req, res, next) {
    RequestController.getStudent(req.params.studentNo, res);
});
module.exports = router;