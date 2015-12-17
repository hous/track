'use strict';

function LoginCtrl(UserService, $rootScope, $location) {
  'ngInject';

  const vm = this;

  vm.title = 'Today';

  vm.init = function () {

  };

  vm.init();
}

export default {
  name: 'LoginCtrl',
  fn: LoginCtrl
};
