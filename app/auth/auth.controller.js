angular.module('shoppingListApp')
  .controller('LoginController', function(userSession, $location, $http) {
    var ctrl = this;
    ctrl.previousPage = $location.search().previous;
    ctrl.login = function(username, password) {
      this.loginFailed = null;
      $http.get('/user/').then(
        function (response) {
          console.log('username/password MATCHED!!');
          if(username == response.data.username && password == response.data.password) {
            userSession.loggedIn = true;
            $location.path(ctrl.previousPage || '/');
          } else {
            console.log('username/password MIS-MATCH!!');
            this.loginFailed = true;
          }
        },
        function(error) {
          this.loginFailed = true;
        }
      );

    };
  })
  .controller("LogoutController", function(userSession, $location){
    userSession.loggedIn=false;
    $location.path('/login');
  });
