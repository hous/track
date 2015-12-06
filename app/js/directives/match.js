'use strict';
/**
 * https://github.com/TheSharpieOne/angular-validation-match/blob/master/src/angular-validation-match.js
 */
function MatchDirective($parse) {
  'ngInject';

  console.log("MatchDirective");
  return {
    require: '?ngModel',
    restrict: 'A',
    link: function(scope, elem, attrs, ctrl) {
      if(!ctrl) {
        if(console && console.warn){
          console.warn('Match validation requires ngModel to be on the element');
        }
        return;
      }

      var matchGetter = $parse(attrs.match);
      var caselessGetter = $parse(attrs.matchCaseless);
      var noMatchGetter = $parse(attrs.notMatch);

      scope.$watch(getMatchValue, function(){
        ctrl.$$parseAndValidate();
      });

      ctrl.$validators.match = function(){
        var match = getMatchValue();
        var notMatch = noMatchGetter(scope);
        var value;

        if(caselessGetter(scope)){
          value = $.lowercase(ctrl.$viewValue) === $.lowercase(match);
        }else{
          value = ctrl.$viewValue === match;
        }
        value ^= notMatch;
        return !!value;
      };

      function getMatchValue(){
        var match = matchGetter(scope);
        if($.isObject(match) && match.hasOwnProperty('$viewValue')){
          match = match.$viewValue;
        }
        return match;
      }
    }
  };
}

export default {
  name: 'matchDirective',
  fn: MatchDirective
};
