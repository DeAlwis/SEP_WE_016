'use strict';

/**
 * @ngdoc service
 * @name armsAngularApp.Question
 * @description
 * # Question
 * Service in the armsAngularApp.
 */
angular.module('armsAngularApp')
  .factory('QuestionService', ['$http', 'CONFIG', function($http, CONFIG) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var baseUrl = CONFIG.BASE_URL;
    var QuestionService = {};

    QuestionService.createNewQuestion = function(question) {
      console.log(question);
      return $http.post(baseUrl + 'question', question);
    };


    QuestionService.getAllQuestions = function() {
      return $http.get(baseUrl + 'question');
    };

    QuestionService.deleteQuestion = function(questionId) {
      return $http({
        method: 'delete',
        url: baseUrl + 'question',
        params: {
          questionId: questionId
        }
      }).then(function(res) {
        return res;
      });
    };

    QuestionService.updateQuestion = function(questionInstance) {
      return $http({
        method: 'put',
        url: baseUrl + 'question',
        params: questionInstance
      }).then(function(res) {
        return res;
      });
    };

    return QuestionService;
  }]);
