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
    function ($http, CONFIG, $rootScope) {
      //get base url
      var baseUrl = CONFIG.BASE_URL;
      var appointmentDataService = {};
      var message = '';


      appointmentDataService.getAllLectures = function () {
        return $http.get(baseUrl + 'lecturer');
      };
      appointmentDataService.getAllSubjects = function () {
        return $http.get(baseUrl + 'subject');
      };
      appointmentDataService.getMyAppointment = function () {
        return $http.get(baseUrl + 'subject');
      };


      appointmentDataService.sendRequest = function (appointmentRequest) {
        return $http.post(baseUrl + 'request/create', JSON.stringify(appointmentRequest));
      };
      appointmentDataService.getPendingRequests = function () {
        return $http.get(baseUrl + 'request');
      };
      appointmentDataService.getStudentRequests = function (lecturer) {
        console.log(lecturer);
        return $http.get(baseUrl + 'request/get-student-requests', {
          params: lecturer
        });
      };

      appointmentDataService.getAvailableRooms = function () {
        return $http.get(baseUrl + 'appointment/get-available-rooms');
      };
      appointmentDataService.sendAppointment = function (appointment) {
        return $http.post(baseUrl + 'appointment/create', JSON.stringify(appointment));
      };

      appointmentDataService.getMyAppointmentLecture = function (lecturer) {
        return $http.get(baseUrl + 'lecturer/get-my-appointments', {
          params: lecturer
        });
      };

      appointmentDataService.passRequestData = function (msg) {
        this.message = msg;
        $rootScope.$broadcast('requestTableRowClick');

      };

      appointmentDataService.refreshTables = function () {
        $rootScope.$broadcast('refreshDataTables');

      };

      /**
       * get given lecture all appointments
       * @param lecturer
       * @returns {HttpPromise}
         */
      appointmentDataService.getMyTimeSlots= function (lecturer) {
        return $http.get(baseUrl + 'lecturer/get-my-slots', {
          params: lecturer
        });
      };

      /**
       * send new time slot to server
       * @param timeSlot
       * @returns {HttpPromise}
       */
      appointmentDataService.saveTimeSlot = function (timeSlot) {
        console.log(timeSlot);
        return $http.post(baseUrl + 'lecturer/save-timeslot', JSON.stringify(timeSlot));
      };

      /**
       * update given time slot
       * @param timeSlot
       * @returns {HttpPromise}
       */
      appointmentDataService.updateTimeSlot = function (timeSlot) {
        return $http.put(baseUrl + 'lecturer/update-timeslot',JSON.stringify(timeSlot));
      };

      /**
       * toggle visibility of given time slot
       * @param timeSlot
       * @returns {HttpPromise}
       */
      appointmentDataService.toggleTimeSlot = function (timeSlot) {
        return $http.put(baseUrl + 'lecturer/toggle-timeslot',JSON.stringify(timeSlot));
      };

      /**
       * remove given time slot
       * @param timeSlot
       * @returns {HttpPromise}
       */
      appointmentDataService.deleteTimeSlot = function (timeSlot) {
        return $http.delete(baseUrl + 'lecturer/delete-timeslot',{
          params: timeSlot
        });
      };


      return appointmentDataService;
    }
  ]);
