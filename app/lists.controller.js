function submitToList( list, newItem ) {
  // Add newItem to list, only if not empty
  if ( newItem !== '' ) {

    list.addItem( { item: newItem } );
  }

}

function refresh( $http, vm, url ) {
  //Clear any errors
  vm.errorPresent = false;

  $http.get(url).then( function (response) {
    console.log('I got the ' + url + ' data');
    console.log("response = " + response);
    vm.list = response.data;
  },
  function(err) {
    console.log("GOT A DB ERROR!");
    vm.errorPresent = true;
    vm.error = "ERROR: failed to read Database!";
  });
}

function submitItem( list, vm ) {
  console.log('Submit button pressed');

  // Add newItem to list
  if ( vm.newItem !== '' ) {
    list.addItem( { item: vm.newItem } );
  }

  // Clear the input
  vm.newItem = '';
}

angular.module( 'shoppingListApp', ['ngRoute', 'ngAnimate'] );

config.$inject = ['$routeProvider'];

function config($routeProvider) {
  $routeProvider.when('/', {
    templateUrl : './app/home.html',
    controller : 'HomeCtrl',
    activetab: 'home'
  }).when('/grocery', {
    templateUrl : './app/generic-list.html',
    controller : 'GroceryListCtrl',
    controllerAs: 'store'
  }).when('/trader-joes', {
    templateUrl : './app/generic-list.html',
    controller : 'TraderJoesListCtrl',
    controllerAs: 'store'
  }).when('/target', {
    templateUrl : './app/generic-list.html',
    controller : 'TargetListCtrl',
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

GroceryListCtrl.$inject = ['GroceryList', '$http'];

function GroceryListCtrl( GroceryList, $http ) {
  var vm = this;
  var url = '/grocerylist';

  vm.errorPresent = false;
  vm.error = '';

  vm.list = GroceryList.list;

  refresh($http, vm, url);

  vm.submit = function() {
    console.log('Grocery submit button pressed');

    // If input not empty, add newItem to list
    // and refresh the list
    if ( vm.newItem !== '' ) {
      GroceryList.addItem( { item: vm.newItem } );
      refresh($http, vm, url);
    }

    // Clear the input
    vm.newItem = '';
  };

  vm.delete = function( id ) {
    console.log('Grocery delete button pressed');
    GroceryList.deleteItem( id );
    refresh($http, vm, url);
  };

  vm.deleteAll = function() {
    console.log('Grocery delete ALL pressed');
    GroceryList.deleteAllItems();
    refresh($http, vm, url);
  };

}

TraderJoesListCtrl.$inject = ['TraderJoesList', '$http'];

function TraderJoesListCtrl( TraderJoesList, $http ) {
  var vm = this;
  var url = '/traderjoeslist';

  vm.errorPresent = false;
  vm.error = '';

  vm.list = TraderJoesList.list;

  refresh($http, vm, url);

  vm.submit = function() {
    console.log('Trader Joes submit button pressed');

    // If input not empty, add newItem to list
    // and refresh the list
    if ( vm.newItem !== '' ) {
      TraderJoesList.addItem( { item: vm.newItem } );
      refresh($http, vm, url);
    }

    // Clear the input
    vm.newItem = '';
  };

  vm.delete = function( id ) {
    console.log('TJs delete button pressed');
    TraderJoesList.deleteItem( id );
    refresh($http, vm, url);
  };

  vm.deleteAll = function() {
    console.log('Grocery delete ALL pressed');
    TraderJoesList.deleteAllItems();
    refresh($http, vm, url);
  };

}

TargetListCtrl.$inject = ['TargetList', '$http'];

function TargetListCtrl( TargetList, $http ) {
  var vm = this;
  var url = '/targetlist';

  vm.errorPresent = false;
  vm.error = '';

  vm.list = TargetList.list;

  refresh($http, vm, url);

  vm.submit = function() {
    console.log('Target submit button pressed');

    // If input not empty, add newItem to list
    // and refresh the list
    if ( vm.newItem !== '' ) {
      TargetList.addItem( { item: vm.newItem } );
      refresh($http, vm, url);
    }

    // Clear the input
    vm.newItem = '';
  };

  vm.delete = function( id ) {
    console.log('TJs delete button pressed');
    TargetList.deleteItem( id );
    refresh($http, vm, url);
  };

  vm.deleteAll = function() {
    console.log('Grocery delete ALL pressed');
    TargetList.deleteAllItems();
    refresh($http, vm, url);
  };

}

angular.module('shoppingListApp')
        .config(config)
        .controller( 'HomeCtrl', HomeCtrl )
        .controller( 'GroceryListCtrl', GroceryListCtrl )
        .controller( 'TraderJoesListCtrl', TraderJoesListCtrl )
        .controller( 'TargetListCtrl', TargetListCtrl );



/* $(document).ready(function() {

  // Remove list item if 'Delete' is clicked
  $( '#shopping-list' ).on('click', '.delete', function( event ) {
    //console.log( 'clicked DELETE' );
    $(this).closest('li').remove();
  });

  // Show 'Delete' div on mouseenter
  $( '#shopping-list' ).on('mouseenter', '.listitem', function( event ) {
    //console.log( 'MOUSE ENTER' );
    $(this).children('.delete-div').show();
    //$(this).addClass('text-strikethrough');
  })
  // Hide 'Delete' div on mouseleave
  .on( 'mouseleave', '.listitem', function( event ) {
    //console.log( 'MOUSE LEAVE' );
    $(this).children( '.delete-div' ).hide();
  });

  // Add item to list if the 'Submit' button is pressed
  // 1) use after() if list not EMPTY
  // 2) use append() if list EMPTY
  $( 'button' ).click( function() {
    var input = document.getElementById("item");
    var text = input.value;
    if ($.trim(text).length > 0) {
      var newItem = $('<li class="listitem"><input type="checkbox">' + text + '<div class="delete-div"><span class="delete">Delete</span></div>');
      $( 'ul' ).append(newItem);
    } else {
      alert('Please enter some text');
    }
    input.value = '';
  });

  $("#item").keyup(function(event){
    if(event.keyCode == 13){
        $("#add").click();
    }
  });

  // Bring input in focus on mouseenter, blue on mouseout
  $( '#item' ).on( 'mouseenter', function( event ) {
    //console.log( 'MOUSE ENTER INPUT' );
    $(this).focus();
  })
  .on( 'mouseout', function( event ) {
    //console.log( 'MOUSE OUT INPUT' );
    $(this).blur();
  });

  // Handle line-through when checkbox CHECKED or NOT
  $( '#shopping-list' ).on('click', '.listitem', function( event ) {
    if ($(this).children('input').is(':checked')) {
      console.log('Check box checked');
      $(this).closest('li').css('text-decoration', 'line-through');
    } else {
      console.log('Check box UNchecked');
      $(this).closest('li').css('text-decoration', 'none');
    }
  });

});
*/
