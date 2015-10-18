"use strict";

config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

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
