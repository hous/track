'use strict';

function LoginDirective(UserService) {
  console.log('LoginDirective');
  return {
    restrict: 'EA',
    templateUrl: 'directives/login.html',
    scope: {
      user: '='
    },
    link: (scope, element) => {

      scope.user = {
        hasAccount : true
      };

      scope.logIn = function() {
        console.log("LogIn");
        let result = UserService.logIn(scope.user.email, scope.user.password).promise
          .then(function (response) {
            console.log(response);
            scope.errorMessage = null;
          })
          .catch(function (error) {
            console.log(error);
            scope.errorMessage = "The username or password is incorrect.";
          });
      };

      scope.signUp = function() {
        console.log("SignUp");
        let result = UserService.signUp(scope.user.email, scope.user.password).promise
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
            scope.errorMessage = "There was an error creating your account.";
          });
      };

    }
  };
}

export default {
  name: 'loginDirective',
  fn: LoginDirective
};
