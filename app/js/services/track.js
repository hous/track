'use strict';

function TrackService($q, angularParse) {
  'ngInject';

  const service = {};

  service.get = function() {
    console.log("TODO");
  };

  service.set = function(data) {
    if (!data.trackName) {
      console.error("Need to provide 'name'.");
      return;
    }
    console.log("TODO");
  };

  service.add = function() {
  };

  return service;

}

export default {
  name: 'TrackService',
  fn: TrackService
};
