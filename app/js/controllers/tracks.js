'use strict';

function TracksCtrl(UserService, $location) {
  'ngInject';

  function init() {
    console.log("TODO: move user checking to rootScope?");
    var currentUser = UserService.get();
    if (!currentUser) {
      console.log("Anonymous user cannot access tracks.");
      $location.path( "/" );
    }

    vm.getTracks();
  }

  // ViewModel
  const vm = this;

  vm.title = 'Define your tracks.';
  vm.tracks = [];
  vm.trackTypes = ['checkbox', 'number'];
  vm.newTrack = {};

  vm.getTracks = function() {
    var Track = Parse.Object.extend("Track");
    var query = new Parse.Query(Track);
    query.equalTo("user", Parse.User.current());
    query.find({
      success: function(results) {
        console.log(results);
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          vm.tracks.push({
            'name' : results[i].get('name'),
            'type' : results[i].get('type')
          });
        }
      },
      error: function(error) {
        console.error("Error: " + error.code + " " + error.message);
      }
    });
  };

  vm.addTrack = function() {
    console.log("Adding Track");
    console.log(vm.newTrack);
    var Track = Parse.Object.extend("Track");
    var track = new Track();

    track.set("user", Parse.User.current());
    track.set("name", vm.newTrack.name);
    track.set("type", vm.newTrack.type);

    track.save(null, {
      success: function(result) {
        // Execute any logic that should take place after the object is saved.
        console.log("Successfully added Track record in parse.");
        console.log("FIX THIS");
        vm.tracks.push({
          'name' : result.name,
          'type' : result.type
        });
      },
      error: function(result, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        console.error('Failed to create new object, with error code: ' + error.message);
      }
    });
  };

  init();
}

export default {
  name: 'TracksCtrl',
  fn: TracksCtrl
};
