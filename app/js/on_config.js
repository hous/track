'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Landing', {
    url: '/',
    controller: 'LandingCtrl as vm',
    templateUrl: 'landing.html',
    title: 'Landing'
  })
  .state('Login', {
    url: '/login',
    controller: 'LoginCtrl as vm',
    templateUrl: 'login.html',
    title: 'Login'
  })
  .state('Tracks', {
    url: '/tracks',
    controller: 'TracksCtrl as vm',
    templateUrl: 'tracks.html',
    title: 'Tracks'
  });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
