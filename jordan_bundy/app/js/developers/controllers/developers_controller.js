module.exports = function(app) {
  app.controller('DevelopersController', ['$scope', '$http', function($scope, $http) {
    $scope.greeting = 'Gang\'s all here';
    $scope.developers = [];
    $scope.newDeveloper = null;
    $scope.developer = {};
    $scope.hold = null;

    // create function to resuse same form
    $scope.editForm = function(developer) {
      $scope.newDeveloper = {
        _id: developer._id,
        name: developer.name,
        language: developer.language,
        edit: true,
        index: $scope.developers.indexOf(developer)
      };
    };

    $scope.processForm = function(developer) {
      developer.edit ? $scope.update(developer) : 
        $scope.create(developer);
    };

    $scope.cancel = function() {
      $scope.newDeveloper = null;
    };

    $scope.getAll = function() {
      $http.get('/drip/developers')
        .then(function(res) {
          console.log(res);
          $scope.developers = res.data;
        }, function(res) {
          console.log(res.data)
        });
    };

    $scope.create = function(developer) {
      $http.post('/drip/developer', developer)
        .then(function(res) {
          $scope.developers.push(res.data);
          $scope.newDeveloper = null;
        }, function(err) {
          console.log(err);
        });
    };

    $scope.update = function(developer) {
      $scope.developers[developer.index] = developer;
      $http.put('/drip/developer/' + developer._id, developer)
        .then(function(res) {
          console.log('is update');
          $scope.newDeveloper = null;
        }, function(err) {
          console.log(err)
        });
    };

    $scope.remove = function(developer) {
      $scope.developers.splice($scope.developers.indexOf(developer), 1);
      $http.delete('/drip/developer/' + developer._id)
        .then(function(res) {
          console.log('developer removed');
        }, function(err) {
          console.log(err);
          $scope.getAll();
        });
    };
  }]);
};

