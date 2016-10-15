/**
 * Created by User on 9/7/2016.
 * Develop: Amila
 * Model: Request
 */
var Sequelize = require('sequelize');
var connection  = require('./../Connection');

var Request = connection.define('Request',{

    requestDate : Sequelize.DATEONLY,
    requestStartTime : Sequelize.TIME,
    requestEndTime : Sequelize.TIME,
    requestSmallBref : Sequelize.STRING,
    status: Sequelize.BOOLEAN
},{
    tableName: 'request',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    paranoid: true
});

module.exports = Request;