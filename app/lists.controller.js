function submitToList( list, newItem ) {
  // Add newItem to list, only if not empty
  if ( newItem !== '' ) {
    list.addItem( { item: newItem } );
  }

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

  // Only assign list if list contains items
  //if ( GroceryList.list ) {
    vm.list = GroceryList.list;
  //}

  $http.get('/grocerylist').success( function(response) {
    console.log("I got the grocery data");
    vm.list = response;
    /* for (var i = 0; i < response.length; i++) {
      submitToList( GroceryList, response[i].item );
    } */
  });

  vm.submit = function() {
    console.log('Grocery button pressed');

    // Add newItem to list
    submitToList( GroceryList, vm.newItem );
    vm.newItem = '';

  };

  vm.delete = function(index) {
    console.log('Grocery delete button pressed');
    GroceryList.deleteItem( index );
  };

  vm.deleteAll = function() {
    console.log('Grocery delete ALL pressed');
    GroceryList.deleteAllItems();
  };

}

TraderJoesListCtrl.$inject = ['TraderJoesList'];

function TraderJoesListCtrl( TraderJoesList ) {
  var vm = this;

  // Only assign list if list contains items
  //if ( TraderJoesList.list ) {
    vm.list = TraderJoesList.list;
  //}

  vm.submit = function() {
    console.log('TJs button pressed');

    // Add newItem to list
    submitToList( TraderJoesList, vm.newItem );
    vm.newItem = '';
  };

  vm.delete = function(index) {
    console.log('TJs delete button pressed');
    TraderJoesList.deleteItem( index );
  };

  vm.deleteAll = function() {
    console.log('Tjs delete ALL pressed');
    TraderJoesList.deleteAllItems();
  };
}

TargetListCtrl.$inject = ['TargetList'];

function TargetListCtrl( TargetList ) {
  var vm = this;

  // Only assign list if list contains items
  //if ( TargetList.list ) {
    vm.list = TargetList.list;
  //}

  vm.submit = function() {
    console.log('Target button pressed');

    // Add newItem to list
    submitToList( TargetList, vm.newItem );
    vm.newItem = '';
  };

  vm.delete = function(index) {
    console.log('Target delete button pressed');
    TargetList.deleteItem( index );
  };

  vm.deleteAll = function() {
    console.log('Target delete ALL pressed');
    TargetList.deleteAllItems();
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
