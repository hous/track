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
      scope.logIn = function() {
        console.log(scope);
        console.log(scope.user.email);
    //    if(vm.user.email)
        let result = UserService.login(scope.user.email, scope.user.password).promise
          .then(function (response) {
            console.log(response);
            scope.errorMessage = null;
          })
          .catch(function (error) {
            console.log(error);
            scope.errorMessage = "The username or password is incorrect.";
          });
      };
    }
  };
}

export default {
  name: 'loginDirective',
  fn: LoginDirective
};
