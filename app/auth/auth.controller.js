angular.module('shoppingListApp')
  .controller('LoginController', function(userSession, $location) {
    var ctrl = this;
    ctrl.previousPage = $location.search().previous;
    ctrl.login = function(username, password) {
      this.loginFailed = null;
      if(username == 'user' && password == 'password') {
        userSession.loggedIn = true;
        $location.path(ctrl.previousPage || '/');
      } else {
        this.loginFailed = true;
      }
    };
  })
  .controller("LogoutController", function(userSession, $location){
    userSession.loggedIn=false;
    $location.path('/login');
  });
