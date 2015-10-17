"use strict";

LoginCtrl.$inject = ['userSession', '$location', '$http'];

function LoginCtrl(userSession, $location, $http) {
    var ctrl = this;

    ctrl.loggedIn = userSession.loggedIn;
    console.log("ctrl.loggedIn = ", ctrl.loggedIn);

    ctrl.previousPage = $location.search().previous;
    console.log("Entering LoginCtlr");
    ctrl.login = function(username, password) {
      ctrl.loginFailed = false;
      $http.get('/user/').then(
        function (response) {
          if(username === response.data.username && password === response.data.password) {
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
