require('angular/angular');
var angular = window.angular;

var caffeineApp = angular.module('CaffeineApp', []);
require('./developers/developers')(caffeineApp);

