var angular = window.angular;
module.exports = function(app) {
  app.controller('DevelopersController', ['$scope', '$http', 'crudService', '$timeout', function($scope, $http, crudService, $timeout) {
    $scope.errors = [];
    $scope.developers = [];
    $scope.defaults = {language: 'javascript'};
    $scope.newDeveloper = angular.copy($scope.defaults);
    $scope.developer = {};
    var developersResource = crudService('developers');
   
    $scope.stopTimer = function() {
      $scope.$broadcase('timer-stop', $scope.timer);
      $scope.timer = 100;
      $timeout.cancel(mytimeout);
    };

    $scope.$on('timer-stopped', function(event, remaining) {
      if(remaining === 0) {
        console.log('outta time');
      }
    });
    
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
      console.log(developer);
      developer.edit ? $scope.update(developer) : 
        $scope.create(developer);
    };

    $scope.cancel = function() {
      $scope.newDeveloper = null;
    };

    $scope.getAll = function() {
      developersResource.getAll(function(err, data) {
        if (err) return err;
        $scope.developers = data;
      });
    };

    $scope.create = function(developer) {
      developersResource.create(developer, function(err, data) {
        if (err) return err;
        $scope.developers.push(res.data);
        $scope.newDeveloper = angular.copy($scope.defaults);      
      });
    };

    $scope.update = function(developer) {
      $scope.developers[developer.index] = developer;
      $http.put('/drip/developer/' + developer._id, developer)
        .then(function(res) {
          console.log('is update');
          $scope.newDeveloper = angular.copy($scope.defaults);
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

    $scope.onTimeout = function(developer) {
      if(developer.caffeine === 0) {
        $scope.$broadcast('timer-stop', 0);
        $timeout.cancel(developer.mytimeout);
        return;
      }
      developer.caffeine--;
      mytimeout = $timeout($scope.onTimeout, 1000, true, developer);
    };
 
    $scope.addCaffeine = function(developer) {
      var rootDeveloper = $scope.developers[$scope.developers.indexOf(developer)];      
      rootDeveloper.caffeine = (rootDeveloper.caffeine || 0) + 10;
      developer.timeout = $timeout($scope.onTimeout, 1000, true, developer)
    };

    $scope.countDown = function (developer) {
      console.log(developer.caffeine);
      developer.caffeine -= 1;
    };
  }]);
};

