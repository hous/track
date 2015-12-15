'use strict';

function TracksCtrl(UserService, $location, $scope) {
  'ngInject';

  // ViewModel
  const vm = this;

  $scope.$on("$routeChangeSuccess", function (scope, next, current) {
    vm.getTracks();
  });

  vm.title = 'Your Daily Tracks.';

  console.log($scope);
  console.log(vm);

  vm.trackData = {
    tracks : [],
    trackTypes : ['checkbox', 'number'],
    newTrack : {
      name : '',
      type : 'checkbox'
    }
  };

  vm.getTracks = function() {
    var Track = Parse.Object.extend("Track");
    var query = new Parse.Query(Track);
    query.equalTo("user", Parse.User.current());
    query.descending("createdAt");
    query.find({
      success: function(results) {
        console.log(results);
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          vm.trackData.tracks.push({
            'name'  : results[i].get('name'),
            'type'  : results[i].get('type'),
            'id'    : results[i].id
          });
          $scope.$apply();
        }

      },
      error: function(error) {
        console.error("Error: " + error.code + " " + error.message);
      }
    });
  };

  vm.addTrack = function() {
    console.log("Adding Track");
    console.log(vm.trackData.newTrack);
    var Track = Parse.Object.extend("Track");
    var track = new Track();

    track.set("user", Parse.User.current());
    track.set("name", vm.trackData.newTrack.name);
    track.set("type", vm.trackData.newTrack.type);

    track.save(null, {
      success: function(result) {
        // Execute any logic that should take place after the object is saved.
        console.log(result);
        vm.trackData.tracks.unshift({ 'name' : vm.trackData.newTrack.name, 'type' : vm.trackData.newTrack.type, 'id' : result.id });
        vm.addExpanded = false;
        $scope.$apply();
        vm.trackData.newTrack.name = '';
      },
      error: function(result, error) {
        console.error('Failed to create new object, with error code: ' + error.message);
      }
    });
  };

  vm.deleteTrack = function(id) {
    var Track = Parse.Object.extend("Track");
    var track = new Track();
    track.set("id", id);

    track.destroy({
      success: function(result) {
        console.log(result);
        var i = vm.trackData.tracks.length;
        // loop backwards since we're deleting items from the array.
        while ( i-- ) {
          console.log(i, vm.trackData.tracks[i].id);
          if (vm.trackData.tracks[i].id === id) {
            vm.trackData.tracks.splice(i, 1);
          }
        }
        $scope.$apply();
      },
      error: function(result, error) {
        console.error('Failed to delete object, with error code: ' + error.message);
      }
    });
  };

  vm.getTracks();
}

export default {
  name: 'TracksCtrl',
  fn: TracksCtrl
};
