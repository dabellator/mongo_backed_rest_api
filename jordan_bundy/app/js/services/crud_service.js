var handleSuccess = function(cb) {
  return function(res) {
    cb(null, res.data);
  };
};

var handleFail = function(cb) {
  return function(res) {
    cb(res.data);
  }
};

module.exports = function(app) {
  app.factory('crudService', ['$http', function($http) {
    return function(resourceName) {
      var resource = {};
      resource.getAll = function(cb) {
        $http.get('/drip/' + resourceName)
          .then(handleSuccess(cb), handleFail(cb));
      };

      resource.create = function(data, cb) {
        $http.post('/drip/' + resourceName, data)
          .then(handleSuccess(cb), handleFail(cb));
      };
      return resource;
    };
  }]);
};

