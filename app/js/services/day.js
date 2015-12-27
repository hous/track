'use strict';

function DayService($q) {
  'ngInject';

  var service = {};

  //TODO: Enforce uniqueness on DATE
  service.save = function(today) {
    var promise = $q.defer(),
      Day = Parse.Object.extend("Day"),
      day = new Day();

    day.set("user", Parse.User.current());
    day.set("date", today.date);
    day.set("tracks", today.tracks);

    day.save(null, {
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

  service.get = function(date) {
    var promise = $q.defer(),
      Day = Parse.Object.extend("Day"),
      query = new Parse.Query(Day);

    query.equalTo("date", date);

    query.find({
      success: function(response) {
        // If the day has been logged already, return the map of track id/values. Otherwise return an empty map.
        if ( response.length ) {
          promise.resolve(response[0].get('tracks'));
        } else {
          promise.resolve({});
        }
      },
      error: function(result, error) {
        console.error("Error: " + error.code + " " + error.message);
        promise.reject(error);
      }
    });

    return promise;
  };

  return service;
}

export default {
  name: 'DayService',
  fn: DayService
};
