var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var CenterController = ControllerMap.CenterController;

router.post('/', function(req, res, next) {
    CenterController.createCenter(req.body, res);
});

router.get('/', function(req, res, next) {
    CenterController.getCenters(res);
});

router.delete('/:id', function(req, res, next) {
    CenterController.removeCenters(req.params.id, res);
});

router.put('/', function(req, res, next) {
    CenterController.updateCenters(req.body, res);
})
module.exports = router;