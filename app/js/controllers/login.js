'use strict';

function LoginCtrl(UserService, $rootScope, $location) {
  'ngInject';

  const vm = this;

  vm.title = 'Log In / Sign Up';
  vm.user = {};

  vm.init = function () {

  };

  vm.init();
}

export default {
  name: 'LoginCtrl',
  fn: LoginCtrl
};
