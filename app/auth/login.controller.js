"use strict";

LoginCtrl.$inject = ['userSession', '$location', '$http'];

function LoginCtrl(userSession, $location, $http) {
    var ctrl = this;
    var credentials = {};

    ctrl.loggedIn = userSession.loggedIn;
    console.log("ctrl.loggedIn = ", ctrl.loggedIn);

    ctrl.previousPage = $location.search().previous;
    console.log("Entering LoginCtlr");
    ctrl.login = function(username, password) {
      ctrl.loginFailed = false;
      credentials.username = username;
      credentials.password = password;
      $http.post('/user/', credentials).then(
        function (response) {
          if(true === response.data.authenticated) {
            userSession.loggedIn = true;
            $location.path(ctrl.previousPage || '/');
            console.log('username/password MATCHED!!');
          } else {
            console.log('username/password MIS-MATCH!!');
            ctrl.loginFailed = true;
          }
        },
        function(error) {
          console.log('ERROR: + ', error);
          ctrl.loginFailed = true;
        }
      );

    };
  }

  angular.module('shoppingListApp')
          .controller('LoginCtrl', LoginCtrl);
