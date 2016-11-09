'use strict';

describe('Controller: PendingAppointmentsRequestTableCtrl', function () {

  // load the controller's module
  beforeEach(module('armsAngularApp'));

  var PendingAppointmentsRequestTableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PendingAppointmentsRequestTableCtrl = $controller('PendingAppointmentsRequestTableCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PendingAppointmentsRequestTableCtrl.awesomeThings.length).toBe(3);
  });
});
