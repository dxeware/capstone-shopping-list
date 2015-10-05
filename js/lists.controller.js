angular.module( "shoppingListApp", ['ngRoute'] );

config.$inject = ['$routeProvider'];

function config($routeProvider) {
  $routeProvider.when('/', {
    templateUrl : 'home.html',
    controller : 'HomeCtrl',
    activetab: 'home'
  }).when('/grocery', {
    templateUrl : 'grocery.html',
    controller : 'GroceryListCtrl',
    controllerAs: 'list'
  })/*.when('/trader-joes', {
    templateUrl : 'trader-joes.html',
    controller : 'TraderJoesListCtrl',
  }).when('/target', {
    templateUrl : 'target.html',
    controller : 'TargetListCtrl',
  }) */
  .when('/error', {
    templateUrl : 'home.html',
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

GroceryListCtrl.$inject = ['GroceryList'];

function GroceryListCtrl( GroceryList ) {
  var vm = this;

  vm.groceryList = GroceryList.list;

  console.log("vm.groceryList = " + vm.groceryList[0].item);

  vm.click = function( list ) {
        console.log("Grocery button pressed");
        GroceryList.addItem( { item: vm.groceryItem } );

    // $('#item').empty(); ...not working
  };

}
/*
TraderJoesListCtrl.$inject = ['TraderJoesList'];

function TraderJoesListCtrl( TraderJoesList ) {
  var vm = this;

  vm.traderJoesList = TraderJoesList.list;

  console.log("vm.traderJoesList = " + vm.traderJoesList[0].item);

  vm.click = function( list ) {
        console.log("TJs button pressed");
        TraderJoesList.addItem( { item: vm.traderJoesItem } );

    // $('#item').empty(); ...not working
  };

}

TargetListCtrl.$inject = ['TargetList'];

function TargetListCtrl( TargetList ) {
  var vm = this;

  vm.targetList = TargetList.list;

  console.log("vm.targetList = " + vm.targetList[0].item);

  vm.click = function( list ) {
        console.log("Target button pressed");
        TargetList.addItem( { item: vm.targetItem } );

    // $('#item').empty(); ...not working
  };

}
*/
angular.module('shoppingListApp')
        .config(config)
        .controller( "HomeCtrl", HomeCtrl )
        .controller( "GroceryListCtrl", GroceryListCtrl );
/*
        .config(config)
        .controller( "HomeCtrl", HomeCtrl )
        .controller( "GroceryListCtrl", GroceryListCtrl )
        .controller( "TraderJoesListCtrl", TraderJoesListCtrl )
        .controller( "TargetListCtrl", TargetListCtrl );



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
