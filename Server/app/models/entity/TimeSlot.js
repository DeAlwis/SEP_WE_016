/**
 * Created by User on 9/30/2016.
 * Develop: Namila
 * Model: TimeSlot
 */
var Sequelize = require('sequelize');
var connection  = require('./../Connection');

var TimeSlot = connection.define('TimeSlot',{
    day : Sequelize.STRING,
    fromTime : Sequelize.TIME,
    toTime : Sequelize.TIME,
    status: Sequelize.BOOLEAN,
    hide: Sequelize.BOOLEAN,
    isChecked: Sequelize.BOOLEAN
},{
    tableName: 'timeSlot',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    paranoid: true,
});

module.exports = TimeSlot;
