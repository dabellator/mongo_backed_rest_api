require('angular/angular');
require('angular-route');
var angular = window.angular;

var caffeineApp = angular.module('CaffeineApp', ['ngRoute']);
require('./services/services')(caffeineApp);
require('./developers/developers')(caffeineApp);

caffeineApp.config(['$routeProvider', function($route) {
  $route
    .when('/developers', {
      templateUrl: '/templates/caffeine_view.html',
      controller: 'DevelopersController'
    })
    .otherwise({
      redirectTo: '/developers'
    })
}])
