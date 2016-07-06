'use strict';

function TrackService($q, Restangular) {
  'ngInject';

  var service = {};

  service.getAllActive = function() {
    var promise = $q.defer(),
      Track = Parse.Object.extend("Track"),
      query = new Parse.Query(Track);

    query.equalTo("active", true);
    query.descending("createdAt");

    query.find({
      success: function(response) {
        var tracks = [];
        for (var i = 0; i < response.length; i++) {
          tracks.push({
            'name'  : response[i].get('name'),
            'type'  : response[i].get('type'),
            'id'    : response[i].id
          });
        }
        promise.resolve(tracks);
      },
      error: function(result, error) {
        console.error("Error: " + error.code + " " + error.message);
        promise.reject(error);
      }
    });

    return promise;
  };

  service.getAllActiveViaAPI = function() {
    var promise = $q.defer();
    Restangular.all('tracks');
    

    return promise;
  };

  service.addViaAPI = function(newTrack) {
    var promise = $q.defer(),
      track = {
        user_id : 0,
        name : newTrack.name,
        type : newTrack.type,
        active : true
      };

    track.save(null, {
      success: function(result) {
        promise.resolve(result);
      },
      error: function(result, error) {
        console.error('Failed to create new object, with error code: ' + error.message);
        promise.resolve(error);
      }
    });

    return promise;
  };

  service.add = function(newTrack) {
    var promise = $q.defer(),
      Track = Parse.Object.extend("Track"),
      track = new Track();

    track.set("user", Parse.User.current());
    track.set("name", newTrack.name);
    track.set("type", newTrack.type);
    track.set("active", true);

    track.save(null, {
      success: function(result) {
        promise.resolve(result);
      },
      error: function(result, error) {
        console.error('Failed to create new object, with error code: ' + error.message);
        promise.resolve(error);
      }
    });

    return promise;
  };

  service.remove = function(id) {
    var promise = $q.defer(),
      Track = Parse.Object.extend("Track"),
      track = new Track();

    track.set("id", id);
    track.set("active", false);

    track.save(null, {
      success: function(result) {
        promise.resolve(result);
      },
      error: function(result, error) {
        console.error('Failed to delete object, with error code: ' + error.message);
      }
    });

    return promise;
  };

  return service;
}

export default {
  name: 'TrackService',
  fn: TrackService
};
