"use strict";

HomeCtrl.$inject = ['userSession'];

function HomeCtrl( userSession ) {
  var vm = this;

  vm.loggedInFlag = userSession.loggedIn;
  console.log('home.loggedInFlag = ', vm.loggedInFlag);

}

angular.module('shoppingListApp')
        .controller( 'HomeCtrl', HomeCtrl );
