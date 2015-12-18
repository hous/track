'use strict';

function OnRun($rootScope, $location, AppSettings, UserService) {

  // Load the Parse API
  console.log('Initializing Parse JS framework.');

  Parse.initialize(AppSettings.parse.appId, AppSettings.parse.JSKey);

  // Check for Valid Session
  UserService.checkIfSessionIsValid().promise.then( function(response){
    console.log("Returning User.");
  }, function(response){
    // Invalid Session
    if (response.code === 209) {
      $rootScope.$broadcast('parse-invalid-session-error');
    }
  });

  // Any time user session is invalid, log out user and send to login page.
  $rootScope.$on('parse-invalid-session-error', (event) => {
    UserService.logOut();
    $location.path('/login');
  });

  // Log out event.
  $rootScope.$on('log-out', (event) => {
    UserService.logOut();
    $location.path('/login');
  });

  // Log in event.
  $rootScope.$on('log-in', function(event, args) {
    //TODO: route to previous place?
    $location.path('/');
  });

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';

    if ( toState.title ) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;
  });
}

export default OnRun;
