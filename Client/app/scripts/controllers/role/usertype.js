'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:UsertypeCtrl
 * @description
 * # UsertypeCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('UsertypeCtrl', [ '$scope','dataServiceRole',  function ($scope,dataServiceRole) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    //add new role method
    function addNewRole(role) {
      //invloke api service
      dataServiceRole.insertNewRole({"role" : role}).then(
      //if return is response
      function(response){
        console.log(response);
      },
      //if return is error
      function(error) {
        console.log(error);
      }
      );
    }

    //form submit event
    $scope.submitUserRoleForm = function(isValid){
      console.log("submitUserRoleForm");
      //if validation sucess
      if (isValid) {
        //invloke add new role method
        addNewRole($scope.userRole);

        //reset form
        $scope.userRole = '';
        $scope.userRoleForm.$setPristine();


      }
    };

  }]);
