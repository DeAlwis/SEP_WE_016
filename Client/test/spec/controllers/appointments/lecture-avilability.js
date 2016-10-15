'use strict';

describe('Controller: LectureAvilabilityCtrl', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var LectureAvilabilityCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LectureAvilabilityCtrl = $controller('LectureAvilabilityCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LectureAvilabilityCtrl.awesomeThings.length).toBe(3);
  });
});
