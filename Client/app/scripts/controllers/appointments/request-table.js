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
            
            /*
                student appointment display table configuration and logic
             */
            var displayStudentAppointmentTable = function() {
                sudentTable.dtOptions = DTOptionsBuilder
                    .fromFnPromise(appointmentDataService.getPendingRequests().then(function(response) {
                        console.log(response.data)
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
                        var st;
                        if (full.status == 'true') {
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
                    .fromFnPromise(appointmentDataService.getStudentRequests(user).then(function(response) {
                        console.log(response.data)
                        return response.data;
                    }))
                    // Add Bootstrap compatibility
                    .withBootstrap()
                    .withOption('rowCallback', rowCallback);
                lectureTable.dtColumns = [
                    DTColumnBuilder.newColumn('requestTitle').withTitle('Title').withClass('text-danger'),
                    DTColumnBuilder.newColumn('requestDate').withTitle('Date').renderWith(function(data, type, full) {
                        return moment(full.requestDate).format("MMM-DD");
                    }),
                    DTColumnBuilder.newColumn('requestStartTime').withTitle('Start Time').renderWith(function(data, type, full) {
                        return moment(full.requestStartTime, 'HH:mm:ss').format("hh:mm A");
                    }),
                    DTColumnBuilder.newColumn('requestEndTime').withTitle('End Time').renderWith(function(data, type, full) {
                        return moment(full.requestEndTime, 'HH:mm:ss').format("hh:mm A");
                    })
                ];



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

        }
    ]);
