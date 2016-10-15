'use strict';
/**
 * @ngdoc function
 * @name armsAngularApp.controller:AppointmentRequestsCtrl
 * @description
 * # AppointmentRequestsCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('AppointmentRequestsCtrl', [
    '$scope',
    '$log',
    'appointmentDataService',
    'moment',
    function($scope, $log, appointmentDataService, moment) {
      $scope.subjects = [];
      $scope.lectures = [];
      $scope.appointmentRequest = {};
      console.log("called");
      //send request data to server
      $scope.submitAppointmentRequestForm = function(isValid) {
          console.log($scope.appointmentRequestForm);
          if (isValid) {
            //convert date to SQL format
            $scope.appointmentRequest.requestDate = moment($scope.appointmentRequest.requestDate).format("YYYY-MM-DD");
            //convert time to SQL format
            $scope.appointmentRequest.requestStartTime = moment($scope.appointmentRequest.requestStartTime).format("HH:mm");
            $scope.appointmentRequest.requestEndTime = moment($scope.appointmentRequest.requestEndTime).format("HH:mm");
            //set status to 1
            $scope.appointmentRequest.status = 1;
            //invoke post method and pass $scope.appointmentRequest as a JSON object
            appointmentDataService.sendRequest($scope.appointmentRequest).then(
              function(response) {
                console.log(response);
                swal({
                  title: "Request Sent",
                  text: "You request has been successfully send",
                  type: "success",
                  timer: 2000
                })
              },
              function(error) {
                console.error(error);
              }
            );
            console.log($scope.appointmentRequest);
            //reset statue
            if (true) {
              $scope.appointmentRequest = {};
              $scope.appointmentRequestForm.$setPristine();
            }
          }
        };
        //load all lecture details to select2 component
      appointmentDataService.getAllLectures().then(
        function(response) {
          $scope.lectures = response.data;
        },
        function(error) {
          console.error(error);
        }
      );
      //load all lecture details to select2 component
      appointmentDataService.getAllSubjects().then(
        function(response) {
          $scope.subjects = response.data;
        },
        function(error) {
          console.error(error);
        }
      );
      /*********************************
          ANGULAR UI DATEPICKER CONFIGS
       *********************************/
      $scope.today = function() {
        $scope.appointmentRequest.requestDate = new Date();
      };
      $scope.clear = function() {
        $scope.appointmentRequest.requestDate = null;
      };
      $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };
      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };
      $scope.setDate = function(year, month, day) {
        $scope.appointmentRequest.requestDate = new Date(year, month, day);
        console.log($scope.appointmentRequest.requestDate);
      };
      $scope.popup2 = {
        opened: false
      };
      /*********************************
          ANGULAR UI TIMEPICKER CONFIGS
       *********************************/
      $scope.appointmentRequest.requestStartTime = $scope.appointmentRequest.requestEndTime = new Date();
      $scope.hstep = 1;
      $scope.mstep = 1;
      $scope.ismeridian = true;
      $scope.toggleMode = function() {
        $scope.ismeridian = !$scope.ismeridian;
      };
      $scope.changed = function() {
        console.log('startTime' + $scope.appointmentRequest.requestEndTime);
      };
    }
  ]);
