/*
 * created by : Amila
 * the controller class to handle functions related to center
 */
var Modules = require('../../models/Models');
var Center = Modules.Center;
var Connection = Modules.Connection;
var Subject = Modules.Subject;

CenterController = function() {
    /*
     * function that used to create controller
     * @center :- new instance provided by the client
     * @res :- response object that used to send data to client
     */
    this.createCenter = function(center, res) {
        var centerInstance = {};
        centerInstance.centerName = center.center.centerName;
        return Center.create(centerInstance).then(function(instance) {
            return instance.setSubjects(center.center.subject).then(function(data) {
                if(data) {
                    return res.send(data);
                } else {
                    return res.send({'status': 500, 'message' : 'please try to add data again'})
                }
            });
        });
    }

    /*
     * function that use to get the center details
     * @res :- response object that used to send all the center informations to client
     */
    this.getCenters = function(res) {
        return Center.findAll({
            include: [{
                model: Subject
            }]
        }).then(function(response) {
            if (!response.length == 0) {
                return res.send(response);
            } else {
                return res.send({'status': 500, 'message': 'no data available'});
            }
        });
    }

    /*
     * function that used to remove the center
     * @ceenterId :- id of the center that wish to delete
     * @res :- response object that sent the status if the center removed properly or not
     */
    this.removeCenters = function(centerId, res) {
        return Center.find({
            where: {
                id: centerId
            }
        }).then(function(center) {
            if(center) {
                return center.destroy().then(function(data) {
                    return res.send(data)
                })
            } else {
                return res({'status': 404, 'message': 'not such a object'});
            }
        });
    }

    /*
     * function that update the center informations
     * @center :- the updated instance
     * @res :- response object that send status if the center updated successfully or not
     */
    this.updateCenters = function(center, res) {
        return Center.find({
            where: {
                id: center.center.id
            }
        }).then(function(instance) {
            console.log("*************"+JSON.stringify(instance));
            if(instance) {
                return instance.update({
                    centerName: center.center.centerName
                }).then(function(updatedInstance) {
                    return updatedInstance.setSubjects(center.center.subject).then(function(data) {
                        if(data) {
                            return res.send(data);
                        } else {
                            return res.send({'status': 500, 'message' : 'please try to add data again'})
                        }
                    });
                })
            }
        })
    }
}

module.exports = new CenterController();