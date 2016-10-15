'use strict';
/**
 * @ngdoc function
 * @name armsAngularApp.controller:AppointmentsAppointmentCtrl
 * @description
 * # AppointmentsAppointmentCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('AppointmentCtrl', [
    '$scope',
    '$log',
    'appointmentDataService',
    'moment',
    function($scope, $log, appointmentDataService, moment) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
      $scope.pendingRequest = {};
      $scope.appointmentRequest = {};
      $scope.rooms = [];
      var data = {};

      $scope.$on('requestTableRowClick', function() {
        console.log(appointmentDataService.message);
        data.RequestId = appointmentDataService.message.id;
        $scope.pendingRequest.requestTitle = appointmentDataService.message.requestTitle;
        $scope.pendingRequest.requestSmallBref = appointmentDataService.message.requestSmallBref;
        $scope.pendingRequest.appointmentDate = moment(appointmentDataService.message.requestDate).toDate();
        $scope.pendingRequest.appointmentStartTime = moment(appointmentDataService.message.requestStartTime, 'HH:mm:ss');
        $scope.pendingRequest.appointmentEndTime = moment(appointmentDataService.message.requestEndTime, 'HH:mm:ss');
      });

      $scope.sendAppoinmentData = function() {
        //convert date to SQL format
        data.appointmentDate = moment($scope.pendingRequest.appointmentDate).format("YYYY-MM-DD");
        //convert time to SQL format
        data.appointmentStartTime = moment($scope.pendingRequest.appointmentStartTime).format("HH:mm");
        data.appointmentEndTime = moment($scope.pendingRequest.appointmentEndTime).format("HH:mm");
        //set status to 1
        data.status = 1;
        data.RoomId = $scope.pendingRequest.RoomId;
        //invoke post method and pass $scope.pendingRequest as a JSON object
        appointmentDataService.sendAppointment(data).then(
          function(response) {
            console.log(response);
            appointmentDataService.refreshTables();
            swal({
              title: "Request Sent",
              text: "You request has been successfully send",
              type: "success",
              timer: 2500
            });

          },
          function(error) {
            console.error(error);
          }
        );
      };

      //load available room details to select2 component
      appointmentDataService.getAvailableRooms().then(
        function(response) {
          $scope.rooms = response.data;
        },
        function(error) {
          console.error(error);
        }
      );

      /*********************************
          ANGULAR UI DATEPICKER CONFIGS
       *********************************/
      $scope.today = function() {
        $scope.pendingRequest.appointmentDate = new Date();
      };
      $scope.clear = function() {
        $scope.pendingRequest.appointmentDate = null; 
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
        $scope.pendingRequest.appointmentDate = new Date(year, month, day);
        console.log($scope.pendingRequest.appointmentDate);
      };
      $scope.popup2 = {
        opened: false
      };
      /*********************************
          ANGULAR UI TIMEPICKER CONFIGS
       *********************************/

      $scope.hstep = 1;
      $scope.mstep = 1;
      $scope.ismeridian = true;
      $scope.toggleMode = function() {
        $scope.ismeridian = !$scope.ismeridian;
      };
      $scope.changed = function() {
        console.log('startTime' + $scope.pendingRequest.appointmentEndTime);
        //console.log('endTime' + $scope.endTime);
      };

    }
  ]);
