'use strict';

describe('Controller: SubjectsCtrl', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var SubjectsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubjectsCtrl = $controller('SubjectsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SubjectsCtrl.awesomeThings.length).toBe(3);
  });
});
