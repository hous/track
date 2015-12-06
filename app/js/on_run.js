'use strict';

function OnRun($rootScope, AppSettings) {

  // Load the Parse API
  console.log('Initializing Parse JS framework.');
  Parse.initialize(AppSettings.parse.appId, AppSettings.parse.JSKey);

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
