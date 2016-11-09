'use strict';

describe('Service: QuestionService', function () {

  // load the service's module
  beforeEach(module('armsAngularApp'));

  // instantiate service
  var Question;
  beforeEach(inject(function (_Question_) {
    Question = _Question_;
  }));

  it('should do something', function () {
    expect(!!Question).toBe(true);
  });

});
