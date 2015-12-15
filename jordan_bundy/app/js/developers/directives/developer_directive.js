module.exports = function(app) {
  app.directive('developerDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/bear_directive_template.html',
      scope: {
        developer: '='
      }
    }
  });
};

