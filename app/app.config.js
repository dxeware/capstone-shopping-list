"use strict";

config.$inject = ['$routeProvider', '$httpProvider', '$locationProvider'];

function config($routeProvider, $httpProvider, $locationProvider) {

  // add interceptor
  $httpProvider.interceptors.push('authenticationInterceptor');

  //$locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    templateUrl : './app/home.html',
    controller : 'HomeCtrl',
    //activetab: 'home'
  }).when('/grocery', {
    templateUrl : './app/lists/shopping-list.html',
    controller : 'StoreListCtrl',
    controllerAs: 'store'
  }).when('/trader-joes', {
    templateUrl : './app/lists/shopping-list.html',
    controller : 'StoreListCtrl',
    controllerAs: 'store'
  }).when('/target', {
    templateUrl : './app/lists/shopping-list.html',
    controller : 'StoreListCtrl',
    controllerAs: 'store'
  }).when('/login', {
    templateUrl: './app/auth/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'ctrl'
  })
  .when('/logout', {
    template: '',
    controller: 'LogoutCtrl'
  })
  .when('/error', {
    templateUrl : './app/home.html',
   })
  .otherwise('/error');
}
