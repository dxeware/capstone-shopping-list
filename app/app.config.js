"use strict";

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

/*function config($routeProvider, $httpProvider, $locationProvider) {

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
} */

function config($stateProvider, $urlRouterProvider, $httpProvider) {

  // add interceptor
  $httpProvider.interceptors.push('authenticationInterceptor');

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    // STATES ========================================
    .state('home', {
      url: '/home',
      templateUrl: './app/home/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'home'
    })

    .state('grocery', {
      url: '/grocery',
      templateUrl: './app/lists/shopping-list.html',
      controller: 'StoreListCtrl',
      controllerAs: 'store'
    })

    .state('trader-joes', {
      url: '/trader-joes',
      templateUrl: './app/lists/shopping-list.html',
      controller: 'StoreListCtrl',
      controllerAs: 'store'
    })

    .state('target', {
      url: '/target',
      templateUrl: './app/lists/shopping-list.html',
      controller: 'StoreListCtrl',
      controllerAs: 'store'
    })

    .state('login', {
      url: '/login',
      templateUrl: './app/auth/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'ctrl'
    })

    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    });

}
