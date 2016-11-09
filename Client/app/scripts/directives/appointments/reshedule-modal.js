'use strict';

/**
 * @ngdoc directive
 * @name armsAngularApp.directive:resheduleModal
 * @description
 * # resheduleModal
 */
angular.module('armsAngularApp')
  .directive('resheduleModal',[
  	'$rootScope', function ($rootScope) {
    return {
      templateUrl: 'views/appointments/reshedule-modal.html',
      restrict: 'E',
      scope: {
      	  role: '@'
      },
      controller:'AppointmentRequestsCtrl',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  }]);
