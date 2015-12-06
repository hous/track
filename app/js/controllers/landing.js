'use strict';

function LandingCtrl(UserService) {
  'ngInject';

  const vm = this;

  vm.title = 'Home Page';
  vm.user = {};

  vm.init = function () {
    //If user has session, route appropriately, else display sign-up / about page.
    let currentUser = UserService.get();

    vm.isLoggedIn = currentUser ? true : false;
  };

  vm.init();
}

export default {
  name: 'LandingCtrl',
  fn: LandingCtrl
};
