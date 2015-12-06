'use strict';

function UserService($q) {
  'ngInject';

  const service = {};

  service.get = function() {
    return Parse.User.current();
  };

  /**
   * Log in a user.
   */
  service.login = function(username, password) {
    var promise = $q.defer();

    Parse.User.logIn(username, password).then( function(response){
      promise.resolve(response);
    }, function(response){
      promise.reject(response);
    });

    return promise;
  };

  return service;

}

export default {
  name: 'UserService',
  fn: UserService
};
