"use strict";

angular.module('shoppingListApp')
  .directive('moveList', function() {
    return {
        templateUrl: './app/components/move.directive.html',
        restrict: 'E',
    };
} );
