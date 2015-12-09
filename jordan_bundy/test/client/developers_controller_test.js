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
    $ControllerConstructor('DevelopersController', {$scope: $scope});
  }));

  it('should be able to run', function() {
    var controller = new $ControllerConstructor('DevelopersController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.developers)).toBe(true);
  });

  describe('rest requests', function() {
    var developer = {_id: 1, name: 'Mike', language: 'love'};
    var developer2 = {_id: 2, name: 'Gregory', language: 'espanol'};

    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
     //$ControllerConstructor('DevelopersController', {$scope: $scope})
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an array to developers with a GET all', function() {
      $httpBackend.expectGET('/drip/developers').respond(200, [{_id: 1, name: 'TJ'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.developers[0].name).toBe('TJ');
    });

    it('should be able to create new Developer', function() {
      $httpBackend.expectPOST('/drip/developer').respond(200, {
        _id: 1, 
        name: 'Mark', 
        language: 'javascript'
      });
      expect($scope.developers.length).toBe(0);
      $scope.newDeveloper.name = 'not Mark';
      $scope.create($scope.newDeveloper);
      $httpBackend.flush();
      console.log($scope.developers[0].name);
      expect($scope.developers[0].name).toBe('Mark');
    });

    it('should delete a bear', function() {
      $httpBackend.expectDELETE('/drip/developer/1').respond(200, {});
      $scope.developers.push(developer, developer2);
      expect($scope.developers[0].name).toBe('Mike');
      $scope.remove(developer);
      $httpBackend.flush();
      expect($scope.developers[0].name).toBe('Gregory');
    });

    it('should edit a bear', function() {
      developer2.index = 0;
      $httpBackend.expectPUT('/drip/developer/2').respond(200, {});
      $scope.developers.push(developer);
      expect($scope.developers[0].name).toBe('Mike');
      $scope.update(developer2);
      $httpBackend.flush();
      expect($scope.developers[0].name).toBe('Gregory');
    });
  });
});

