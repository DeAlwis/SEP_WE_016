var Sequelize = require('sequelize');
var connection = require('./../Connection');

var QuestionTemplate = connection.define('QuestionTemplate', {
    templateName: Sequelize.STRING,
    status: Sequelize.BOOLEAN
}, {
    tableName: 'questionTemplate',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    paranoid: true
});

module.exports = QuestionTemplate;
