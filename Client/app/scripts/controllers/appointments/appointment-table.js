'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:AppointmentTableCtrl
 * @description
 * # AppointmentTableCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('AppointmentTableCtrl', [
    '$scope',
    'DTOptionsBuilder',
    'DTColumnBuilder',
    '$q',
    'appointmentDataService',
    'moment',
    '$rootScope',
    function($scope, DTOptionsBuilder, DTColumnBuilder, $q, appointmentDataService, moment, $rootScope) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
      var lectureTable = this;
      var sudentTable = this;
      var user = $rootScope.user;

      //load available room details to select2 component
      appointmentDataService.getStudentRequests(user).then(
        function(response) {
          $scope.rooms = response.data;
        },
        function(error) {
          console.error(error);
        }
      );


      /*
          student appointment display table configuration and logic
       */
      var displayStudentAppointmentTable = function() {
          sudentTable.dtOptions = DTOptionsBuilder
            .fromFnPromise(appointmentDataService.getPendingRequests().then(function(response) {
              console.log(response.data);
              return response.data;
            }))
            // Add Bootstrap compatibility
            .withBootstrap();
          sudentTable.dtColumns = [
            DTColumnBuilder.newColumn('requestTitle').withTitle('Title').withClass('text-danger'),
            DTColumnBuilder.newColumn('requestDate').withTitle('Date').renderWith(function(data, type, full) {
              return moment(full.requestDate).format("MMM-DD");
            }),
            DTColumnBuilder.newColumn('requestStartTime').withTitle('Start Time').renderWith(function(data, type, full) {
              return moment(full.requestStartTime, 'HH:mm:ss').format("hh:mm A");
            }),
            DTColumnBuilder.newColumn('requestEndTime').withTitle('End Time').renderWith(function(data, type, full) {
              return moment(full.requestEndTime, 'HH:mm:ss').format("hh:mm A");
            }),
            DTColumnBuilder.newColumn('status').withTitle('Status').renderWith(function(data, type, full) {

              if (full.status === 'true') {
                return '<span class="label label-warning">Pending</span>';
              } else {
                return '<span class="label label-warning">Pending</span>';
              }
            }),
            DTColumnBuilder.newColumn(null).withTitle('Action').notSortable().renderWith(actionsHtml)
          ];

          function actionsHtml(data, type, full, meta) {
            return '<button class="btn btn-sm btn-danger" ng-click="showCase.delete(showCase.persons[])" )"="">' +
              '   Cancel' +
              '</button>';
          }
        }
        /*
            lecture appointment display table configuration and logic
         */
      var displayLectureAppointmentTable = function() {
        console.log(JSON.stringify($rootScope.user));
        lectureTable.dtOptions = DTOptionsBuilder
          .fromFnPromise(appointmentDataService.getMyAppointmentLecture(user).then(function(response) {
            console.log(response.data)
            return response.data;
          }))
          // Add Bootstrap compatibility
          .withBootstrap()
          .withOption('rowCallback', rowCallback);
        lectureTable.dtColumns = [
          DTColumnBuilder.newColumn('Room.roomName').withTitle('Location').withClass('text-danger'),
          DTColumnBuilder.newColumn('appointmentDate').withTitle('Date').renderWith(function(data, type, full) {
            return moment(full.appointmentDate).format("MMM-DD");
          }),
          DTColumnBuilder.newColumn('appointmentStartTime').withTitle('Start Time').renderWith(function(data, type, full) {
            return moment(full.appointmentStartTime, 'HH:mm:ss').format("hh:mm A");
          }),
          DTColumnBuilder.newColumn('appointmentEndTime').withTitle('End Time').renderWith(function(data, type, full) {
            return moment(full.appointmentEndTime, 'HH:mm:ss').format("hh:mm A");
          })
        ];

        //lectureTable.dtInstance.rerender();


        function actionsHtml(data, type, full, meta) {
          return '<button class="btn btn-sm btn-success" ng-click="showCase.delete(showCase.persons[])" )"="">' +
            '   Make Appointment' +
            '</button>&nbsp;' +
            '<button class="btn btn-sm btn-danger" ng-click="showCase.delete(showCase.persons[])" )"="">' +
            '   Cancel Appointment' +
            '</button>';
        }

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
          // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
          $('td', nRow).unbind('click');
          $('td', nRow).bind('click', function() {
            $scope.$apply(function() {
              someClickHandler(aData);
            });
          });
          return nRow;
        };

        function someClickHandler(info) {
          appointmentDataService.passRequestData(info);
        };




      }
      if ($rootScope.user.role == 'lecture') {
        displayLectureAppointmentTable();
      }
      if ($rootScope.user.role == 'student') {
        displayStudentAppointmentTable();
      }

      $scope.$on('refreshDataTables', function() {
        console.log('refreshTables')
        if ($rootScope.user.role == 'lecture') {
          displayLectureAppointmentTable();
        }
        if ($rootScope.user.role == 'student') {
          displayStudentAppointmentTable();
        }
      });

    }
  ]);
