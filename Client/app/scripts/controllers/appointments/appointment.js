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
        '$rootScope',
        'CONFIG',
        '$scope',
        '$log',
        'appointmentDataService',
        'moment',
        function($rootScope,CONFIG, $scope, $log, appointmentDataService, moment) {
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
            $scope.pendingRequest = {};
            $scope.appointment = {};
            $scope.appoinment = {};
            $scope.appointmentData = {};
            $scope.rooms = [];
            $scope.availableTimeSlots = [];
            var data = {};

            $scope.$on('requestTableRowClick', function() {
                $scope.pendingRequest = {};
                console.log(appointmentDataService.message);
                appointmentDataService.getAPendingAppoinment(appointmentDataService.message).then(
                    function(response) {
                        var data = response.data;
                        console.log(data);
                        $scope.pendingRequest.id = data.id;
                        $scope.pendingRequest.lecturerId = data.TimeSlot.LecturerId;
                        $scope.pendingRequest.requestTitle = data.appointmentTitle;
                        $scope.pendingRequest.requestSmallBref = data.appointmentSmallBref;
                        $scope.pendingRequest.appointmentDate = moment(data.appointmentDate).toDate();
                        $scope.pendingRequest.appointmentDay = data.TimeSlot.day;
                        $scope.pendingRequest.fromTime = moment(data.TimeSlot.fromTime, 'HH:mm:ss').format("hh:mm A");
                        $scope.pendingRequest.toTime = moment(data.TimeSlot.toTime, 'HH:mm:ss').format("hh:mm A");
                        $scope.pendingRequest.Student = data.Student;
                        $scope.pendingRequest.timeSlot = data.TimeSlot;
                        $scope.pendingRequest.appointmentNoteStudent = data.appointmentNoteStudent;
                        console.log(data);

                        appointmentDataService.getAvailableRooms($scope.pendingRequest).then(
                            function(response) {
                                $scope.rooms = response.data;
                            }
                        );
                    }
                );


            });

            $scope.placeAppoinment = function() {
                $scope.pendingRequest.appointmentNoteLecturer = $scope.appointmentNoteLecturer;                
                appointmentDataService.placeAppoinment($scope.pendingRequest).then(
                    function(d) {
                        console.log(d);
                        appointmentDataService.refreshTables();
                        angular.element("#myModal").modal('hide');
                    }
                );
            };

            $scope.$on('appoinmentTableRowClick', function() {
                $scope.appoinment = {};
                appointmentDataService.getAppointmentMoreDetails(appointmentDataService.message).then(
                    function(response) {
                        var data = response.data;
                        $scope.appoinment.id = data.id;
                        $scope.appoinment.Lecturer = data.TimeSlot.Lecturer;
                        $scope.appoinment.Student = data.Student;
                        $scope.appoinment.appointmentDate = moment(data.appointmentDate).toDate();
                        $scope.appoinment.appointmentDay = data.TimeSlot.day;
                        $scope.appoinment.fromTime = moment(data.TimeSlot.fromTime, 'HH:mm:ss').format("hh:mm A");
                        $scope.appoinment.toTime = moment(data.TimeSlot.toTime, 'HH:mm:ss').format("hh:mm A");
                        $scope.appoinment.TimeSlot = data.TimeSlot;
                        $scope.appoinment.room = data.Room;
                        $scope.appointmentData = data;
                        $scope.getMoreAvailableTimeSlots2 ();                       
                        console.log($scope.appointmentData);
                    }
                );
            });

            $scope.submitAppoinmentReshedule = function () {
              appointmentDataService.sendRescheduleRequest($scope.appointmentData).then(function (response) {
                 angular.element("#resheduleModal").modal('hide');             
                swal({
                    title: "Request Sent",
                    text: "You reschedule request has been successfully send",
                    type: "success",
                    timer: 2000
                });
              }, function (error) {
                /* body... */
              });
            };

            $scope.getMoreAvailableTimeSlots = function(){
              appointmentDataService.getMoreAvailableTimeSlots({
                    appointmentDate: $scope.pendingRequest.appointmentDate,
                    LecturerId: $scope.pendingRequest.timeSlot.LecturerId,
                }).then(
                function(response){
                  $scope.availableTimeSlots = [];
                  $scope.availableTimeSlots = response.data;
                  console.log(response.data);
                }
              );
            };

            $scope.getMoreAvailableTimeSlots2 = function(){
              appointmentDataService.getMoreAvailableTimeSlots({
                    appointmentDate: $scope.appointmentData.appointmentDate,
                    LecturerId: $scope.appointmentData.TimeSlot.LecturerId,
                }).then(
                function(response){
                  $scope.availableTimeSlots = [];
                  $scope.availableTimeSlots = response.data;
                  console.log(response.data);
                }
              );
            };

            $scope._24hoursToAmPm = function(time) {
                return moment(time, 'HH:mm:ss').format("hh:mm A");
            };


            $scope.selectRoom = function(room) {
                $scope.pendingRequest.selectedRoom = room;
                $scope.appointmentData.Room = room;
                console.log(room);
            };

            $scope.selectTimeSlot = function(timeSlot) {
              $scope.pendingRequest.timeSlot = timeSlot;
              $scope.appointmentData.TimeSlot = timeSlot;
              appointmentDataService.getAvailableRooms($scope.pendingRequest).then(
                  function(response) {
                      $scope.rooms = [];
                      $scope.rooms = response.data;
                  }
              );
              console.log(timeSlot);
            };

            $scope.clearTimeSlots = function(){
              $scope.pendingRequest.TimeSlot = '';
              $scope.pendingRequest.room = '';
              $scope.rooms = [];
              $scope.availableTimeSlots = [];
            };

            //load time table in new tab
            $scope.showTimeTable = function(operation){
              if (operation == 'make') {
                 window.open(CONFIG.BASE_URL+$scope.pendingRequest.Student.Batch.timeTable,'_blank');
              } else {
                 window.open(CONFIG.BASE_URL+$scope.appoinment.Student.Batch.timeTable,'_blank');
              }
             
            };



        }
    ]);
