'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Tracks', {
    url: '/',
    controller: 'TracksCtrl as vm',
    templateUrl: 'tracks.html',
    title: 'Tracks'
  })
  .state('Login', {
    url: '/login',
    controller: 'LoginCtrl as vm',
    templateUrl: 'login.html',
    title: 'Login'
  })
  .state('Account', {
    url: '/account',
    controller: 'AccountCtrl as vm',
    templateUrl: 'account.html',
    title: 'Account'
  });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
