'use strict';

function TracksCtrl(UserService, TrackService, $location, $scope) {
  'ngInject';

  // ViewModel
  const vm = this;

  $scope.$on("$routeChangeSuccess", function (scope, next, current) {
    vm.getTracks();
  });

  vm.title = 'Your Daily Tracks.';

  console.log($scope);
  console.log(vm);

  vm.today = new Date();

  vm.trackData = {
    tracks : [],
    trackTypes : ['checkbox', 'number'],
    newTrack : {
      name : '',
      type : 'checkbox'
    }
  };

  vm.getTracks = function() {
    console.log("Getting all Tracks");

    TrackService.getAll().promise
      .then(function (response) {
        console.log(response);
        for (var i = 0; i < response.length; i++) {
          vm.trackData.tracks.push({
            'name'  : response[i].name,
            'type'  : response[i].type,
            'id'    : response[i].id
          });
        }
      })
      .catch(function (error) {
        console.error("Error: " + error.code + " " + error.message);
      });
  };

  vm.addTrack = function() {
    console.log("Adding Track");
    console.log(vm.trackData.newTrack);

    TrackService.add(vm.trackData.newTrack).promise
      .then(function (result) {
        console.log(result);
        vm.trackData.tracks.unshift({ 'name' : vm.trackData.newTrack.name, 'type' : vm.trackData.newTrack.type, 'id' : result.id });
        vm.addExpanded = false;
        vm.trackData.newTrack.name = '';
      })
      .catch(function (error) {
        console.log(error);
        console.error('Failed to create new object, with error code: ' + error.message);
      });
  };

  vm.cancelAdd = function() {
    vm.trackData.newTrack.name = '';
    vm.addExpanded = false;
  };

  vm.deleteTrack = function(id) {
    console.log("Deleting Track with ID", id);

    TrackService.remove(id).promise
      .then(function (result) {
        console.log(result);
        var i = vm.trackData.tracks.length;
        // loop backwards since we're deleting items from the array.
        while ( i-- ) {
          if (vm.trackData.tracks[i].id === id) {
            vm.trackData.tracks.splice(i, 1);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        console.error('Failed to delete object, with error code: ' + error.message);
      });
  };

  vm.getTracks();

}

export default {
  name: 'TracksCtrl',
  fn: TracksCtrl
};
