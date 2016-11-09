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
      var vm = this;
      var user = $rootScope.user;
      console.log(appointmentDataService);

      function promiseFunc() {
        var deferred = $q.defer();
        appointmentDataService.getMyAppointmentsLecture(user).then(function(response) {
          console.log(response.data);
          deferred.resolve(response.data);
        });
        return deferred.promise;
      }

      function callback(json) {
        console.log(json);
      }

      function reloadData() {
        var resetPaging = true;
        vm.dtInstance.reloadData(callback, resetPaging);
      }

      $scope.$on('refreshDataTables', function() {
        console.log('refreshDataTables');
          vm.dtInstance.reloadData();
      });

      function someClickHandler(info) {
        console.log(info);
        appointmentDataService.passAppoinmentData(info);
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
      }




      vm.dtOptions = DTOptionsBuilder
        .fromFnPromise(function() {
          return promiseFunc();
        })
        // Add Bootstrap compatibility
        .withOption('rowCallback', rowCallback)
        .withBootstrap();
      vm.dtColumns = [
        DTColumnBuilder.newColumn('appointmentDate').withTitle('Date').renderWith(function(data, type, full) {
          return moment(full.appointmentDate).format("MMM-DD");
        }),
        DTColumnBuilder.newColumn(null).withTitle('Time Slot').renderWith(function(data, type, full) {
          return moment(full.TimeSlot.fromTime, 'HH:mm:ss').format("hh:mm A")+' - '+ moment(full.TimeSlot.toTime, 'HH:mm:ss').format("hh:mm A");
        }),
        DTColumnBuilder.newColumn('appointmentTitle').withTitle('Title'),
        DTColumnBuilder.newColumn('appointmentNotes').withTitle('Notes'),
        DTColumnBuilder.newColumn(null).withTitle('Venue').renderWith(function(data, type, full) {
          var st;
          if (full.Room !== 'undefined' ) {
              return full.Room.roomName;
          } else {
            return 'N/A';
          }
        }),
        DTColumnBuilder.newColumn('approved').withTitle('Status').renderWith(function(data, type, full) {
          var st;
          if (full.approved == true) {
             return '<span class="label label-success">Approved</span>';
          } else if (full.reShedule == true) {
              return '<span class="label label-info">On Reshedule</span>';
          } else {
              return '<span class="label label-warning">Pending</span>';
          }

        }),
        DTColumnBuilder.newColumn(null).withTitle('Action').notSortable().renderWith(actionsHtml)
      ];
      vm.newPromise = promiseFunc();
      vm.reloadData = reloadData;
      vm.dtInstance = {};

      function actionsHtml(data, type, full, meta) {
        return '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal2"> more details</button>'+
         '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#resheduleModal">Reshedule</button>';
      }

      $scope.reload = function() {
        //vm.dtInstance.reloadData();
         appointmentDataService.refreshTables();
      };



    }
  ]);
