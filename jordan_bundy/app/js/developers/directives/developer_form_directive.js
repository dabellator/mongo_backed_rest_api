module.exports = function(app) {
  app.directive('developerFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: 'templates/developer_form_template.html',
      transclude: true,
      scope: {
        buttonText: '@',
        headingText: '@',
        formName: '@',
        developer: '=',
        save: '&'
      }
    }
  });
};

