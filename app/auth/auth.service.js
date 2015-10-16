"use strict";

angular.module('shoppingListApp')
  .factory('userSession', function() {
    return {
      loggedIn: false
    };
  })
  .factory('authenticationInterceptor', function(userSession, $location) {
    return {
      request: function(request) {
        if(request.url.match(/storelist/) && !userSession.loggedIn) {
          console.log('Entering /login page');
          var previousPage = $location.path();
          $location.path('/login').search({
            previous: previousPage
          });
        }
        return request;
      }
    };
  });
