var grocery_url = '/grocerylist';
var traderjoes_url = '/traderjoeslist';
var target_url = '/targetlist';

function dbError( vm ) {
  console.log("GOT A DB ERROR!");
  vm.errorPresent = true;
  vm.error = "ERROR: Database failure!";
}

// Get's the list from DB and refreshes the VM list
function refresh( $http, vm, url ) {
  //Clear any errors
  vm.errorPresent = false;

  $http.get(url).then( function (response) {
    console.log('I got the ' + url + ' data');
    console.log("response = " + response);
    vm.list = response.data;
  },
  function(err) {
    dbError( vm );
  });
}

// Delete the items that have been checked
function deleteSelectedItems ( vm, service ) {

  // Walk through list, if item checked
  // then delete in database
  for (var i = 0; i < vm.list.length; i++) {
    if ( vm.list[i].checked === true ) {
      console.log ("select deleting id " + vm.list[i]._id);
      service.deleteItem( vm.list[i]._id );
    }
  }
}

// angular.module setter
angular.module( 'shoppingListApp', ['ngRoute', 'ngAnimate'] );

config.$inject = ['$routeProvider'];

function config($routeProvider) {
  $routeProvider.when('/', {
    templateUrl : './app/home.html',
    controller : 'HomeCtrl',
    activetab: 'home'
  }).when('/grocery', {
    templateUrl : './app/generic-list.html',
    controller : 'StoreListCtrl',
    controllerAs: 'store'
  }).when('/trader-joes', {
    templateUrl : './app/generic-list.html',
    controller : 'StoreListCtrl',
    controllerAs: 'store'
  }).when('/target', {
    templateUrl : './app/generic-list.html',
    controller : 'StoreListCtrl',
    controllerAs: 'store'
  }).when('/error', {
    templateUrl : './app/home.html',
   })
  .otherwise('/error');
}

HomeCtrl.$inject = ['$location'];

function HomeCtrl($location) {
  var vm = this;

  //$scope.pageClass = 'page-home';

  // Set active link
  vm.isActive = function(route) {
      return route === $location.path();
  };

}

StoreListCtrl.$inject = ['GroceryList', 'TraderJoesList', 'TargetList', '$http', '$location'];

function StoreListCtrl( GroceryList, TraderJoesList, TargetList, $http, $location ) {
  var vm = this;
  var url;
  var service;

  // Initialize error to false
  vm.errorPresent = false;
  vm.error = '';

  console.log("path = " + $location.path());

  // Map $location.path to Service and url
  // for current store database
  switch ( $location.path() ) {
    case '/grocery':
      service = GroceryList;
      url = grocery_url;
      break;
    case '/trader-joes':
      console.log('tjs....');
      service = TraderJoesList;
      url = traderjoes_url;
      break;
    case '/target':
      service = TargetList;
      url = target_url;
      break;
  }

  // Set the VM list to the service list
  //vm.list = GroceryList.list;
  vm.list = service.list;

  // Refresh the list
  refresh($http, vm, url);

  // Function called when input submit button OR
  // enter is pressed
  vm.submit = function() {
    console.log('Grocery submit button pressed');

    // If input not empty, add newItem to list
    // and refresh the list
    if ( vm.newItem !== '' ) {
      //GroceryList.addItem( { item: vm.newItem } );
      //if ( var temp = service.addItem( { item: vm.newItem } ) ) {
      service.addItem( { item: vm.newItem } )
        .then( function(response) {
                refresh($http, vm, url);
              })
        .catch(dbError( vm ));
    }

    // Clear the input
    vm.newItem = '';
  };

  // Function called when individual item
  // delete button is pressed
  vm.delete = function( id ) {
    console.log('Grocery delete button pressed');

    // delete item from DB via id and refresh the list
    //GroceryList.deleteItem( id );
    service.deleteItem( id );
    refresh($http, vm, url);
  };

  // Function called when individual item
  // delete button is pressed
  vm.deleteSelected = function() {
    console.log('Grocery delete SELECTED');

    // delete selected items from DB and refresh the list
    //deleteSelectedItems( vm, GroceryList);
    deleteSelectedItems( vm, service );
    refresh($http, vm, url);
  };

  // Function called when Delete All
  // button is pressed
  vm.deleteAll = function() {
    console.log('Grocery delete ALL pressed');

    // delete ALL items from DB and refresh the list
    //GroceryList.deleteAllItems();
    service.deleteAllItems();
    refresh($http, vm, url);
  };

}

angular.module('shoppingListApp')
        .config(config)
        .controller( 'HomeCtrl', HomeCtrl )
        .controller( 'StoreListCtrl', StoreListCtrl );
