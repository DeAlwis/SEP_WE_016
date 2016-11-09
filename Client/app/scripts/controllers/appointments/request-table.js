'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:AppointmentsRequestTableCtrl
 * @description
 * # AppointmentsRequestTableCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('RequestTableCtrl', [
    '$rootScope',
    '$scope',
    'appointmentDataService',
    'DTOptionsBuilder',
    'DTColumnBuilder',
    '$q',
    'moment',
    function($rootScope, $scope, appointmentDataService, DTOptionsBuilder, DTColumnBuilder, $q, moment) {
      var vm = this;
      var user = $rootScope.user;
      console.log(appointmentDataService);

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
        DTColumnBuilder.newColumn('appointmentNoteLecturer').withTitle('Notes'),
        DTColumnBuilder.newColumn('appointmentTitle').withTitle('Title'),
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
        if(full.approved == true) {
          return '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal"> more details</button>'+
                 '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#resheduleModal">Reshedule</button>';
        } else {
          return '';
        }

      }

      $scope.reload = function() {
        //vm.dtInstance.reloadData();
         appointmentDataService.refreshTables();
      };


      function promiseFunc() {
        var deferred = $q.defer();
        appointmentDataService.getMyAppointments(user).then(function(response) {
          console.log(response.data);
          deferred.resolve(response.data);
        });
        return deferred.promise;
      };

      function reloadData() {
        var resetPaging = true;
        vm.dtInstance.reloadData(callback, resetPaging);
      }

      function callback(json) {
        console.log(json);
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
        console.log(info);
        appointmentDataService.passRequestData(info);
      };

      $scope.$on('refreshDataTables', function() {
        console.log('refreshDataTables');
          vm.dtInstance.reloadData();
      });

    }
  ]);
