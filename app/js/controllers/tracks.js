'use strict';

function TracksCtrl(UserService, $location) {
  'ngInject';

  console.log("TracksCtrl JS firing");
  var currentUser = UserService.get();

  if (!currentUser) {
    console.log("Anonymous user cannot access tracks.");
    $location.path( "/" );
  }

  // ViewModel
  const vm = this;

  vm.title = 'Define your tracks.';

}

export default {
  name: 'TracksCtrl',
  fn: TracksCtrl
};
