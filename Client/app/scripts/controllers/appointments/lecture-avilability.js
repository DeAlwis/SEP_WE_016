  'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:LectureAvilabilityCtrl
 * @description
 * # LectureAvilabilityCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
  .controller('LectureAvilabilityCtrl', [
    '$rootScope',
    '$scope',
    'appointmentDataService',
    function($rootScope, $scope, appointmentDataService) {
      console.log($scope.days);
      //load his/her timeSlots to logged in lecture
      appointmentDataService.getMyTimeSlots($rootScope.user).then(function(d){
        $scope.days = [];
        $scope.days = d.data;
        console.log(d.data);
      });
      //add new timeslot
      $scope.addTimeSlot = function(index) {
        $scope.days[index].timeSlots.push({});
      };
      //controll time slot visibility
      $scope.toggleVisibility = function(parentIndex, index) {
        if ($scope.days[parentIndex].timeSlots[index].visibility) {
          $scope.days[parentIndex].timeSlots[index].visibility = false;
        } else {
          $scope.days[parentIndex].timeSlots[index].visibility = true;
        }
        appointmentDataService.toggleTimeSlot($scope.days[parentIndex].timeSlots[index]);
      };
      //insert new timeslot to database
      $scope.saveTimeSlot = function(parentIndex, index) {
        appointmentDataService.saveTimeSlot({
          userId: $rootScope.user.userId,
          dayDetails: $scope.days[parentIndex],
          slot: $scope.days[parentIndex].timeSlots[index]
        });
        $scope.days[parentIndex].timeSlots[index].status = true;
      };
      //remove given timeslot from database
      $scope.removeTimeSlot = function(parentIndex, index) {
        console.log($scope.days[parentIndex].timeSlots[index]);
        swal({
          title: "Please Confirm",
          text: "This message   ",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          closeOnConfirm: false
        }, function() {
            appointmentDataService.deleteTimeSlot($scope.days[parentIndex].timeSlots[index]);
            $scope.days[parentIndex].timeSlots.splice(index, 1);
            swal("Deleted!", "Time slot has been deleted.", "success");
        });
      };
      //update given time slot
      $scope.updateTimeSlot = function(parentIndex, index) {
        appointmentDataService.updateTimeSlot($scope.days[parentIndex].timeSlots[index]);
      };

    }
  ]);
