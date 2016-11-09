'use strict';

describe('Directive: appointments/resheduleModalLecture', function () {

  // load the directive's module
  beforeEach(module('armsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<appointments/reshedule-modal-lecture></appointments/reshedule-modal-lecture>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the appointments/resheduleModalLecture directive');
  }));
});
