'use strict';

function UserStateDirective(UserService, $rootScope) {
  return {
    restrict: 'EA',
    templateUrl: 'directives/userState.html',
    link: (scope, element) => {


      function refreshUser() {
        scope.isLoggedIn = UserService.get();

        if (scope.isLoggedIn){
          scope.username = UserService.get().getUsername();
        }
      };

      scope.logIn = function() {
        console.log("LogIn");
        let result = UserService.logIn(scope.user.email, scope.user.password).promise
          .then(function (response) {
            console.log(response);
            scope.errorMessage = null;
            $rootScope.$broadcast('user-logged-in');
            refreshUser();
          })
          .catch(function (error) {
            console.log(error);
            scope.errorMessage = "The username or password is incorrect.";
          });
      };

      scope.logOut = function() {
        $rootScope.$broadcast('log-out');
      };

      scope.signUp = function() {
        console.log("SignUp");
        let result = UserService.signUp(scope.user.email, scope.user.password).promise
          .then(function (response) {
            console.log(response);
            scope.errorMessage = null;
            $rootScope.$broadcast('user-logged-in');
            refreshUser();
          })
          .catch(function (error) {
            console.log(error);
            scope.errorMessage = "There was an error creating your account.";
          });
      };

      refreshUser();

    }
  };
}

export default {
  name: 'userStateDirective',
  fn: UserStateDirective
};
