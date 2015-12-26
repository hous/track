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

  return service;
}

export default {
  name: 'DayService',
  fn: DayService
};
