/**
 * Created by User on 9/7/2016.
 * Develop: Amila
 * Model: Batch
 */
var Sequelize = require('sequelize');
var connection  = require('./../Connection');

var Batch = connection.define('Batch',{
    /*this can be week end or week day*/
    batchWeek : Sequelize.STRING,
    batchName : Sequelize.STRING,
    status: Sequelize.BOOLEAN
},{
    tableName: 'batch',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    paranoid: true
});

module.exports = Batch;