'use strict';

import angular from 'angular';

// angular modules
import 'angular-ui-router';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';
import './libraries/smart-table';

// create and bootstrap application
const requires = [
  'ui.router',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives',
  'smart-table'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', require('./constants'));

angular.module('app').config(require('./on_config'));

angular.module('app').run(require('./on_run'));

angular.bootstrap(document, ['app']);
