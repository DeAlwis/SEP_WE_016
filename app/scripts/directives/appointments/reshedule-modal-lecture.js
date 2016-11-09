'use strict';

/**
 * @ngdoc directive
 * @name armsApp.directive:appointments/resheduleModalLecture
 * @description
 * # appointments/resheduleModalLecture
 */
angular.module('armsApp')
  .directive('appointments/resheduleModalLecture', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the appointments/resheduleModalLecture directive');
      }
    };
  });
