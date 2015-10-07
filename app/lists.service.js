angular.module('shoppingListApp')
  .service( 'TraderJoesList', TraderJoesList)
  .service( 'GroceryList', GroceryList)
  .service( 'TargetList', TargetList);

function GroceryList( $http ) {

  return ListService( $http, '/grocerylist');
}

function TraderJoesList( $http ) {

  return ListService( $http, '/traderjoeslist');
}

function TargetList ( $http ) {

  return ListService( $http, '/targetlist');
}

function ListService( $http, url ) {
  var shoppingList = [];

  var service = {
    list: shoppingList,
    addItem: addItem,
    deleteItem: deleteItem,
    deleteAllItems: deleteAllItems
  };


  function addItem( item ) {
    //service.list.push( item );
    $http.post( url, item ).success( function(response) {
      console.log(response);
    });
  }

  function deleteItem( id ) {
    //service.list.splice(index, 1);
    $http.delete( url + '/' + id ).success( function(response) {
      console.log(response);
    });
  }

  function deleteAllItems() {
    //service.list.length = 0;
    $http.delete( url + '/' + '-1').success( function(response) {
      console.log(response);
    });
  }

  return service;
}
