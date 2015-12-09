'use strict';

function LoginCtrl(UserService, $rootScope, $location) {
  'ngInject';

  const vm = this;

  vm.title = 'Log In / Sign Up';
  vm.user = {};

  vm.init = function () {

  };

  $rootScope.$on('user-logged-in', function(event, args) {
    //TODO: route to previous place?
    $location.path('/');
  });

  vm.init();
}

export default {
  name: 'LoginCtrl',
  fn: LoginCtrl
};
