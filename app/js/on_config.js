'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Landing', {
    url: '/',
    controller: 'LandingCtrl as page',
    templateUrl: 'landing.html',
    title: 'Landing'
  })
  .state('Tracks', {
    url: '/tracks',
    controller: 'TracksCtrl as page',
    templateUrl: 'tracks.html',
    title: 'Tracks'
  });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
