'use strict';

function UserService($q) {
  'ngInject';

  const service = {};

  service.get = function() {
    return Parse.User.current();
  };

  service.logIn = function(email, password) {
    var promise = $q.defer();

    Parse.User.logIn(email, password).then( function(response){
      console.log("TODO: error checking / response.");
      console.log("TODO: cache user ID?");
      promise.resolve(response);
    }, function(response){
      promise.reject(response);
    });

    return promise;
  };

  service.logOut = function() {
    // logOut returns 209 if session is invalid already, so we don't need to know if the request was successful.
    Parse.User.logOut();
  };

  service.checkIfSessionIsValid= function() {
    var promise = $q.defer();

    Parse.Session.current().then( function(response){

      promise.resolve(response);
    }, function(response){
      promise.reject(response);
    });

    return promise;
  };

  service.signUp = function(email, password) {
    var promise = $q.defer(),
      user = new Parse.User();

    user.set("username", email);
    user.set("email", email);
    user.set("password", password);

    user.signUp(null).then( function(response){
      console.log("TODO: error checking / response.");
      console.log("TODO: cache user ID?");
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
