'use strict';

/**
 * @ngdoc directive
 * @name armsAngularApp.directive:resheduleModalLecture
 * @description
 * # resheduleModalLecture
 */
angular.module('armsAngularApp')
  .directive('resheduleModalLecture', function () {
    return {
    	templateUrl: 'views/appointments/reshedule-modal.html',
    	restrict: 'E',
    	scope: {
    		  role: '@'
    	},
    	controller:'AppointmentCtrl',
      link: function postLink(scope, element, attrs) {
       
      }
    };
  });
