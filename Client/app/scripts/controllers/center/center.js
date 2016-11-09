'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:CenterCenterCtrl
 * @description
 * # CenterCenterCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
    .controller('CenterCenterCtrl', ['$scope', 'subjectService', 'centerService', function ($scope, subjectService, centerService) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        /*
         * scope objects declartions
         */
        $scope.updateCenter = {};
        $scope.updateCenter.Subjects = [];
        $scope.centerSubject= {
            selectedSubjects: []
        };
        $scope.updateCenterSubject = {
            selectedSubjects: []
        }

        /*
         * use to create new center
         * @isvalid = check if it is a valid center
         */
        $scope.submitCenterForm = function (isvalid) {
            var center = {};
            if ($scope.CenterName) {
                center.centerName = $scope.CenterName;
                center.subject = $scope.centerSubject.selectedSubjects;
                return centerService.createCenter(center).then(function (data) {
                    if (data.status == 200) {
                        $scope.CenterName = '';
                        $scope.selectedSubjects = [];
                        swal('success', 'successfully insert center', 'success');
                        getCenters();
                    } else {
                        alert("error going on");
                    }
                });
            } else {
                swal('error', 'please fill empty fields', 'Error');
            }
        }

        /*
         * delete the center
         * @centerId = id of the center that needed to delete
         */
        $scope.deleteCenter = function (centerId) {
            if (centerId) {
                return centerService.deleteCenter(centerId).then(function (response) {
                    if (response) {
                        swal('success', 'successfully remove center', 'success');
                        return getCenters();
                    } else {
                        return alert("error going on");
                    }
                })
            }
        }

        /*
         * load the values to $scope.update and it will replace by the selected center
         */
        $scope.updateCenterDetails = function (center) {
            $scope.updateCenter = center;
            $scope.updateCenterSubject.selectedSubjects = [];
            center.Subjects.forEach(function(item) {
                $scope.updateCenterSubject.selectedSubjects.push(item.id);
            })
        }

        /*
         * set if the subject is assigned to the particular center or not
         * @subjectId = id of the subject
         */
        $scope.checkAvailable = function (subjectId) {
            $scope.updateCenter.Subjects.forEach(function(item) {
                if(item.id == subjectId) {
                    return true;
                }
            })
        }

        /*
         * get all the excisting centers
         */
        function getCenters() {
            centerService.getCenters().then(function (response) {
                $scope.centers = response.data;
                return;
            })
        }

        /*
         * get the available subjects
         */
        function getSubjects() {
            subjectService.getAllSubjects().then(function (res) {
                $scope.subjects = res.data;
            });
        }

        /*
         * make update request to the server to update the center informations
         */
        $scope.updateCenterInfoToServer = function() {
           var updatedCenter = {};
           if ($scope.updateCenter.centerName) {
               updatedCenter.id = $scope.updateCenter.id;
               updatedCenter.centerName = $scope.updateCenter.centerName;
               updatedCenter.subject = $scope.updateCenterSubject.selectedSubjects;
               return swal({
                    title: "Are you sure to update "+updatedCenter.centerName,
                    text: "The center will updated according to your suggestions",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, update it!",
                    closeOnConfirm: true,
               }, function(update) {
                   if(update) {
                       return centerService.updateCenter(updatedCenter).then(function(data) {
                           if (data.status == 200) {
                               $scope.updateCenter.centerName = '';
                               $scope.updateCenterSubject.selectedSubjects = [];
                               swal('success', 'successfully updated center', 'success');
                               getCenters();
                           } else {
                               alert("error going on");
                           }
                       });
                   }
               })
           }
        }

        getSubjects();
        getCenters();
    }]);
