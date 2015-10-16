angular.module('shoppingListApp')
  .controller('LoginController', function(userSession, $location, $http) {
    var ctrl = this;
    ctrl.previousPage = $location.search().previous;
    console.log("Entering LoginController");
    //ctrl.loginFailed = true;
    ctrl.login = function(username, password) {
      ctrl.loginFailed = false;
      $http.get('/user/').then(
        function (response) {
          if(username == response.data.username && password == response.data.password) {
            userSession.loggedIn = true;
            $location.path(ctrl.previousPage || '/');
            console.log('username/password MATCHED!!');
          } else {
            console.log('username/password MIS-MATCH!!');
            ctrl.loginFailed = true;
          }
        },
        function(error) {
          ctrl.loginFailed = true;
        }
      );

    };
  })
  .controller("LogoutController", function(userSession, $location){
    userSession.loggedIn=false;
    $location.path('/login');
  });
