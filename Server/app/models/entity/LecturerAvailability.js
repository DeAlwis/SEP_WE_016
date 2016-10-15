/**
 * Created by User on 9/30/2016.
 * Develop: Namila
 * Model: LecturerAvailability
 */
var Sequelize = require('sequelize');
var connection  = require('./../Connection');

var LecturerAvailability = connection.define('LecturerAvailability',{
    day : Sequelize.STRING,
    fromTime : Sequelize.TIME,
    toTime : Sequelize.TIME,
    status: Sequelize.BOOLEAN,
    hide: Sequelize.BOOLEAN,
    isChecked: Sequelize.BOOLEAN
},{
    tableName: 'lecturerAvailability',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    paranoid: true,
});

module.exports = LecturerAvailability;
