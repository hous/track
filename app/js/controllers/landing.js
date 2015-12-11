'use strict';

function LandingCtrl(UserService, $location) {
  'ngInject';

  const vm = this;

  vm.title = 'Home Page';
  vm.user = {};

   var init = function () {
    //If user has session, route appropriately, else display sign-up / about page.
    if (!UserService.get()) {
      $location.path('/login');
    }
  };

  init();
}

export default {
  name: 'LandingCtrl',
  fn: LandingCtrl
};
