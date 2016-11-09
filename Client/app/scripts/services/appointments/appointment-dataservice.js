'use strict';
/**
 * @ngdoc service
 * @name armsAngularApp.appointments/appointmentDataService
 * @description
 * # appointments/appointmentDataService
 * Service in the armsAngularApp.
 */
angular.module('armsAngularApp')
    .service('appointmentDataService', [
        '$http',
        'CONFIG',
        '$rootScope',
        function($http, CONFIG, $rootScope) {
            //get base url
            var baseUrl = CONFIG.BASE_URL;
            var appointmentDataService = {};
            var message = '';

            /**
             * load all lectures
             * @param
             * @returns {HttpPromise}
             */
            appointmentDataService.getAllLectures = function() {
                return $http.get(baseUrl + 'lecturer');
            };
            /**
             * load all subjects
             * @param
             * @returns {HttpPromise}
             */
            appointmentDataService.getAllSubjects = function() {
                return $http.get(baseUrl + 'subject');
            };
            /**
             * get given lecture all appointments
             * @param lecturer
             * @returns {HttpPromise}
             */
            appointmentDataService.getMyAppointments = function(student) {
                return $http.get(baseUrl + 'appointment/get-my-appointments', {
                    params: student
                });
            };
            /**
             * get given lecture all appointments
             * @param lecturer
             * @returns {HttpPromise}
             */
            appointmentDataService.getAppointmentMoreDetails = function(appoinment) {
                return $http.get(baseUrl + 'appointment/get-a-appointment', {
                    params: appoinment
                });
            };
            /**
             * get given lecture all appointments
             * @param lecturer
             * @returns {HttpPromise}
             */
            appointmentDataService.getMyAppointmentsLecture = function(lecture) {
                return $http.get(baseUrl + 'appointment//l-get-my-appointments', {
                    params: lecture
                });
            };
            /**
             * send appointment request to server
             * @param {appointmentRequest}
             * @returns {HttpPromise}
             */
            appointmentDataService.sendRequest = function(appointmentRequest) {
                return $http.post(baseUrl + 'appointment/save-appointment-request', JSON.stringify(appointmentRequest));
            };            
            /**
             * send appointment reschedule to server
             * @param {appointmentRequest}  
             * @returns {HttpPromise}
             */ 
            appointmentDataService.sendRescheduleRequest = function(appointmentRequest) {
                return $http.put(baseUrl + 'appointment/save-reschedule-request', JSON.stringify(appointmentRequest));
            };
            /**
             * load all Pending appointment requests
             * @param {lecturer}
             * @returns {HttpPromise}
             */
            appointmentDataService.getPendingRequests = function(lecturer) {
                return $http.get(baseUrl + 'appointment/get-my-pending-appointments', {
                    params: lecturer
                });
            };

            /**
             * get an pending appoinment
             * @param {appoinment}
             * @returns {HttpPromise}
             */
            appointmentDataService.getAPendingAppoinment = function(appoinment) {
                return $http.get(baseUrl + 'appointment/get-a-pending-appointment', {
                    params: appoinment
                });
            };
            /**
             * get available rooms
             * @param {appoinment}
             * @returns {HttpPromise}
             */
            appointmentDataService.getAvailableRooms = function(appoinment) {
                console.log(appoinment);
                return $http.get(baseUrl + 'appointment/get-available-rooms', {
                    params: appoinment
                });
            };


            appointmentDataService.getStudentRequests = function(lecturer) {
                console.log(lecturer);
                return $http.get(baseUrl + 'request/get-student-requests', {
                    params: lecturer
                });
            };


            appointmentDataService.placeAppoinment = function(appointment) {
                console.log(appointment);
                return $http.put(baseUrl + 'appointment/make-appoinment', JSON.stringify(appointment));
            };

            appointmentDataService.getMyAppointmentLecture = function(lecturer) {
                return $http.get(baseUrl + 'lecturer/get-my-appointments', {
                    params: lecturer
                });
            };

            appointmentDataService.passRequestData = function(msg) {
                this.message = '';
                this.message = msg;
                $rootScope.$broadcast('requestTableRowClick');
            };

            appointmentDataService.passAppoinmentData = function(msg) {
                this.message = '';
                this.message = msg;
                $rootScope.$broadcast('appoinmentTableRowClick');
            };

            appointmentDataService.refreshTables = function() {
                $rootScope.$broadcast('refreshDataTables');

            };

            /**
             * get given lecture all appointments
             * @param lecturer
             * @returns {HttpPromise}
             */
            appointmentDataService.getMyTimeSlots = function(lecturer) {
                return $http.get(baseUrl + 'lecturer/get-my-slots', {
                    params: lecturer
                });
            };

            /**
             * send new time slot to server
             * @param timeSlot
             * @returns {HttpPromise}
             */
            appointmentDataService.saveTimeSlot = function(timeSlot) {
                console.log(timeSlot);
                return $http.post(baseUrl + 'lecturer/save-timeslot', JSON.stringify(timeSlot));
            };

            /**
             * update given time slot
             * @param timeSlot
             * @returns {HttpPromise}
             */
            appointmentDataService.updateTimeSlot = function(timeSlot) {
                return $http.put(baseUrl + 'lecturer/update-timeslot', JSON.stringify(timeSlot));
            };

            /**
             * toggle visibility of given time slot
             * @param timeSlot
             * @returns {HttpPromise}
             */
            appointmentDataService.toggleTimeSlot = function(timeSlot) {
                return $http.put(baseUrl + 'lecturer/toggle-timeslot', JSON.stringify(timeSlot));
            };

            /**
             * remove given time slot
             * @param timeSlot
             * @returns {HttpPromise}
             */
            appointmentDataService.deleteTimeSlot = function(timeSlot) {
                return $http.delete(baseUrl + 'lecturer/delete-timeslot', {
                    params: timeSlot
                });
            };

            /**
             * get free time slots for given lecturer
             * @param timeSlot
             * @returns {HttpPromise}
             */
            appointmentDataService.getAvailableTimeSlots = function(lecturer) {
                console.log(lecturer);
                return $http.get(baseUrl + 'lecturer/available-timeslot', {
                    params: lecturer
                });
            };            
            /**
             * get more free time slots for given lecturer
             * @param timeSlot
             * @returns {HttpPromise}
             */
            appointmentDataService.getMoreAvailableTimeSlots = function(lecturer) {
                console.log(lecturer);
                return $http.get(baseUrl + 'lecturer/more-available-timeslot', {
                    params: lecturer
                });
            };


            return appointmentDataService;
        }
    ]);
