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
        '$rootScope',
        '$scope',
        '$log',
        'appointmentDataService',
        'moment',
        function($rootScope, $scope, $log, appointmentDataService, moment) {
            $scope.subjects = [];
            $scope.lectures = [];
            $scope.appointmentRequest = {};
            $scope.appointmentData = {};
            $scope.called = false;

            var resetEverything = function() {
                $scope.called = false;
                $scope.appointmentRequest = {};
                $scope.availableTimeSlots = '';
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
            };
            //send request data to server
            $scope.submitAppointmentRequestForm = function(isValid) {
                console.log($scope.appointmentRequestForm);
                if (isValid) {
                    //get logged in user
                    $scope.appointmentRequest.student = $rootScope.user;
                    //invoke post method and pass $scope.appointmentRequest as a JSON object
                    appointmentDataService.sendRequest($scope.appointmentRequest).then(
                        function(response) {
                            console.log(response);
                            appointmentDataService.refreshTables();
                            swal({
                                title: "Request Sent",
                                text: "You request has been successfully send",
                                type: "success",
                                timer: 2000
                            });
                        },
                        function(error) {
                            console.error(error);
                        }
                    );
                    console.log($scope.appointmentRequest);
                    resetEverything();
                    $scope.appointmentRequestForm.$setPristine();


                }
            };

            $scope.submitAppoinmentReshedule = function() {
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

            $scope.reload = function() {
                appointmentDataService.refreshTables();
            };


            //load all lecture details to select2 component
            appointmentDataService.getAllLectures().then(
                function(response) {
                    $scope.lectures = response.data;
                    console.log("All Lecturers");
                    console.log(response.data);
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

            $scope.dataChange = function() {
                appointmentDataService.getAvailableTimeSlots({ id: this.appointmentRequest.LecturerId, date: this.appointmentRequest.selectedDate }).then(
                    function(response) {
                        console.log(response);
                        $scope.called = true;
                        $scope.availableTimeSlots = response.data;
                    },
                    function(error) {
                        console.error(error);
                    });
            };

            $scope.selectTimeSlot = function(timeSlot) {
                $scope.appointmentRequest.selectedTimeSlot = timeSlot;
                $scope.appointmentData.TimeSlot = timeSlot;
                console.log(timeSlot);
            };

            $scope._24hoursToAmPm = function(time) {
                return moment(time, 'HH:mm:ss').format("hh:mm A");
            };

            $scope.$on('requestTableRowClick', function() {
                $scope.appoinment = {};
                $scope.appointmentData = {};
                resetEverything();
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
                        console.log(data);
                        $scope.appointmentData = data;


                    }
                );
            });

            $scope.getMoreAvailableTimeSlots = function() {
                appointmentDataService.getMoreAvailableTimeSlots({
                    appointmentDate: $scope.appointmentData.appointmentDate,
                    LecturerId: $scope.appointmentData.TimeSlot.LecturerId,
                }).then(
                    function(response) {
                        $scope.availableTimeSlots = [];
                        $scope.availableTimeSlots = response.data;
                        console.log(response.data);
                    }
                );
            };
            //console.log(appointmentDataService);

        }
    ]);
