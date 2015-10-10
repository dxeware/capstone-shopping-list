var storelist_url = '/storelist';
//var traderjoes_url = '/traderjoeslist';
//var target_url = '/targetlist';

function dbError( vm ) {
  console.log("GOT A DB ERROR!");
  vm.errorPresent = true;
  vm.error = "ERROR: Database failure!";
}

// Get's the list from DB and refreshes the VM list
function refresh( $http, vm) {

  //Clear any errors
  vm.errorPresent = false;

  // Set store empty flag to true
  vm.storeEmpty = true;

  $http.get(storelist_url).then(
    function (response) {
      console.log('I got the ' + storelist_url + ' data');
      console.log("response = " + response);
      vm.list = response.data;

      // Walk through list, if item checked
      // then delete in database
      for (var i = 0; i < vm.list.length; i++) {
        if ( vm.list[i].name === vm.storeName ) {
          vm.storeEmpty = false;
        }
      }
    },
    function(error) {
      console.log("Refresh DB error");
      dbError( vm );
    }
  );

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

StoreListCtrl.$inject = ['StoreListService', '$http', '$location'];

function StoreListCtrl( StoreListService, $http, $location ) {
  var vm = this;
  var service = StoreListService;


  // Initialize error to false
  vm.errorPresent = false;
  vm.error = '';

  //Initialize store names
  vm.storeArray = ['Grocery', 'Trader Joe\'s', 'Target'];
  vm.storeName = '';

  console.log("path = " + $location.path());

  // Map $location.path to Service and url
  // for current store database
  switch ( $location.path() ) {
    case '/grocery':
      vm.storeName = vm.storeArray[0];
      break;
    case '/trader-joes':
      vm.storeName = vm.storeArray[1];
      break;
    case '/target':
      vm.storeName = vm.storeArray[2];
      break;
  }

  // Set the VM list to the service list
  //vm.list = GroceryList.list;
  vm.list = service.list;

  // Refresh the list
  refresh($http, vm);

  // Function called when input submit button OR
  // enter is pressed
  vm.submit = function() {
    console.log('Grocery submit button pressed');

    // If input not empty, add newItem to list
    // and refresh the list
    if ( vm.newItem !== '' ) {
      //GroceryList.addItem( { item: vm.newItem } );
      //if ( var temp = service.addItem( { item: vm.newItem } ) ) {
      service.addItem( { name: vm.storeName, item: vm.newItem } )
        .then( function(response) {
                refresh($http, vm);
              })
        .catch( function() {
                dbError( vm );
              });
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
    service.deleteItem( id )
      .then( function(response) {
              refresh($http, vm);
            })
      .catch(function() {
                dbError( vm );
              });
  };

  // Function called when individual item
  // delete button is pressed
  vm.deleteSelected = function() {
    console.log('Grocery delete SELECTED');

    // Walk through list, if item checked
    // then delete in database
    for (var i = 0; i < vm.list.length; i++) {
      if ( vm.list[i].checked === true ) {
        console.log ("select deleting id " + vm.list[i]._id);
        service.deleteItem( vm.list[i]._id )
          .then( function(response) {
                  refresh($http, vm);
                })
          .catch(function() {
                dbError( vm );
              });
      }
    }

  };

  // Function called when Delete All
  // button is pressed
  vm.deleteAll = function() {
    console.log('Grocery delete ALL pressed');

    // delete ALL items from DB and refresh the list
    //GroceryList.deleteAllItems();
    /*service.deleteAllItems()
    .then( function(response) {
            refresh($http, vm);
          })
    .catch(function() {
                dbError( vm );
              }); */
    // Walk through list, if item checked
    // then delete in database
    for (var i = 0; i < vm.list.length; i++) {
      if ( vm.list[i].name === vm.storeName ) {
        console.log ("Deleting ALL id " + vm.list[i]._id);
        service.deleteItem( vm.list[i]._id )
          .then( function(response) {
                  refresh($http, vm);
                })
          .catch(function() {
                dbError( vm );
              });
      }
    }

  };

  // Function called when Move Selected
  // store is selected
  vm.moveSelected = function(obj) {

    var store;

    console.log('MOVE SELECTED pressed');

    //Only process if value is defined
    if ( obj.target.attributes.value ) {

      // Get store name from clicked object attributes
      store = obj.target.attributes.value.nodeValue;
      console.log('MOVE SELECTED pressed - value = ' + obj.target.attributes.value.nodeValue);

      // Walk through list, if item checked
      // then update in database
      for (var i = 0; i < vm.list.length; i++) {
        if ( vm.list[i].checked === true ) {
          console.log ("Moving id " + vm.list[i]._id);
          service.updateItem( vm.list[i]._id, { name: store } )
            .then( function(response) {
                    refresh($http, vm);
                  })
            .catch(function() {
                  dbError( vm );
                });
        }
      }
    }

  };

}

angular.module('shoppingListApp')
        .config(config)
        .controller( 'HomeCtrl', HomeCtrl )
        .controller( 'StoreListCtrl', StoreListCtrl );
