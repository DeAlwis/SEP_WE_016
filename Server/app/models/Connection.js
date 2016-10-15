/**
 * Created by User on 9/6/2016.
 * Develop: Amila
 * this class will make connection with mysql server and create hanel between mysql database and
 * this app
 */
var Sequelize = require('sequelize');
var sequelize = require('sequelize');
     sequelize = new Sequelize('acadamic', 'root', 'password', {
      dialect: "mysql",
      port:    3306,
    });

module.exports = sequelize;
