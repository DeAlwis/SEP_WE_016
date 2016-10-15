'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:QuestionsCtrl
 * @description
 * # QuestionsCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('QuestionsCtrl', ['$scope', 'QuestionService', function($scope, QuestionService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    function getQuestionData() {
      QuestionService.getAllQuestions().then(function(res) {
        $scope.allQuestions = res.data;
        return res.data;
      });
    }

    function createNewQuestion(questionInstance) {
      var question = {};
      question.question = questionInstance;
      QuestionService.createNewQuestion(question).then(function(response) {
        if (response.status === 200) {
          swal('success', "insert new question", 'success');
          getQuestionData();
        } else {
          swal('Error', 'Not inserted record', 'error');
        }
      });
    }


    $scope.submitQuestionForm = function(isValid) {
      if (isValid) {
        createNewQuestion($scope.question);
        $scope.question = '';
        $scope.questionForm.$setPristine();
      }
    };



    $scope.deleteQuestion = function(questionId) {
      QuestionService.deleteQuestion(questionId).then(function(res) {
        if (res.status === 200) {
          swal('success', "delete the question", 'success');
          getQuestionData();
        } else {
          swal('Error', 'Not inserted record', 'error');
        }
      });
    };

    $scope.updateQuestion = function(questionId) {
      swal({
        title: "Are You sure to update this question ",
        text: "After you update the values are replaced",
        type: 'input',
        showCancelButton: true,
        animation: "slide-from-top",
        inputPlaceholder: "question eg:test question?",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, update it!",
        closeOnConfirm: true
      }, function(inputValue) {
        if (inputValue) {
          var question = {};
          question.id = questionId;
          question.question = inputValue;
          QuestionService.updateQuestion(question).then(function(result) {
            if (result.status === 200) {
              swal('success', 'Updated values', 'success');
              getQuestionData();
            } else {
              swal('error', 'Error is going on', 'Error');
            }
          });
        }

      });
    };


    getQuestionData();



  }]);
