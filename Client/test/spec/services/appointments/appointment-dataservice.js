'use strict';

describe('Service: appointmentDataService', function () {

  // load the service's module
  beforeEach(module('armsAngularApp'));

  // instantiate service
  var appointmentDataService;
  beforeEach(inject(function (_appointmentDataservice_) {
    appointmentDataService = appointmentDataservice_;
  }));

  it('should do something', function () {
    expect(!!appointments/appointmentDataService).toBe(true);
  });

});
