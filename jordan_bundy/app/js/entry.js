require('angular/angular');
var angular = window.angular;

var bearApp = angular.module('bearstream', []);
bearApp.controller('GreetingController', ['$scope', function($scope) {
  $scope.greeting = 'Hello Developer, you want cofee?';
}]);

