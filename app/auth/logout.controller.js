"use strict";

LogoutCtrl.$inject = ['userSession', '$location'];

function LogoutCtrl(userSession, $location){
  userSession.loggedIn = false;
  $location.path('/login');
}

angular.module('shoppingListApp')
        .controller("LogoutCtrl", LogoutCtrl);
