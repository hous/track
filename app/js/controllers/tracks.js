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
  vm.tracks = {};
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
          var object = results[i];
          console.log(object);
        }
      },
      error: function(error) {
        console.error("Error: " + error.code + " " + error.message);
      }
    });
  };

  vm.addTrack = function() {
    console.log("Adding Track");
    var Track = Parse.Object.extend("Track");
    var track = new Track();

    track.set("user", Parse.User.current());
    track.set("name", vm.newTrack.name);
    track.set("type", vm.newTrack.type);
    track.setACL(new Parse.ACL(Parse.User.current()));

    track.save(null, {
      success: function(gameScore) {
        // Execute any logic that should take place after the object is saved.
        console.log("Successfully added to parse, time to save to model.");

      },
      error: function(gameScore, error) {
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
