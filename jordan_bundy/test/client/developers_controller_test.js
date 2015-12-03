require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('developer controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('CaffeineApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to run', function() {
    var controller = new $ControllerConstructor('DevelopersController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.developers)).toBe(true);
  });
});

