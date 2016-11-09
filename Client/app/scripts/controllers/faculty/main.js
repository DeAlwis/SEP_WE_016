'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:FacultyMainCtrl
 * @description
 * # FacultyMainCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
    .controller('FacultyMainCtrl', ['$scope', 'facultyService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, facultyService, DTOptionsBuilder, DTColumnBuilder) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        /*
         * add new faculty to service
         */
        function createNewFaculty(facultyInstance) {
            var faculty = {};
            faculty.facultyName = facultyInstance;
            facultyService.insertNewFaculty(faculty).then(function (response) {
                if (response.status === 200) {
                    swal('success', "insert new faculty", 'success');
                    getFacultyData();
                } else {
                    swal('Error', 'Not inserted record', 'error');
                }
            });
        };

        /*
         *handle faculty update task 
         *facultyId = id of the faculty
         */
        function handleFacultyUpdates(facultyId, updatedValue) {
            facultyService.updateFaculty(facultyId, updatedValue).then(function (response) {
                if (response.status === 200) {
                    swal('success', "updated faculty", 'success');
                    getFacultyData();
                } else {
                    swal('Error', 'Not updated record', 'error');
                }
            });
        };

        /*
         * delete faculty
         * faculty Id = id of the faculty
         * facultyName = name of the faculty
         */
        $scope.deleteFaculty = function (facultyId, facultyName) {
            swal({
                title: "Are You sure to delete this faculty " + facultyName,
                text: "After you delete this you have to add it again if you want",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: true
            }, function () {
                facultyService.deleteFaculty(facultyId).then(function (response) {
                    if (response.status === 200) {
                        swal('success', "Delete faculty", 'success');
                        getFacultyData();
                    } else {
                        swal('Error', 'Not deleted record', 'error');
                    }
                });
            });
        };

        /*
         * facultyId = Id of the faculty
         * facultyName = name of the faculty
         */
        $scope.updateFaculty = function (facultyId, facultyName) {
            swal({
                title: "update faculty " + facultyName,
                text: "give the new name for faculty",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: true,
                animation: "slide-from-top",
                inputPlaceholder: "new faculty name",
                confirmButtonText: "Update"
            },
                function (inputValue) {
                    if (inputValue === false)
                        return false;
                    if (inputValue === "") {
                        swal.showInputError("You need to write something!");
                        return false;
                    }
                    handleFacultyUpdates(facultyId, inputValue);
                });
        };

        /*
         * handle create faculty form submiting
         */
        $scope.submitFacultyForm = function (isValid) {
            if (isValid) {
                createNewFaculty($scope.faculty);
                $scope.faculty = '';
                $scope.facultyForm.$setPristine();
            }
        };

        function getFacultyData() {
            facultyService.getAllFacultyDetails().then(function (response) {
                $scope.allFaculty = response.data;
                return response.data;
            });
        }
        getFacultyData();
    }]);
