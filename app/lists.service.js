angular.module('shoppingListApp')
  .service( 'TraderJoesList', TraderJoesList)
  .service( 'GroceryList', GroceryList)
  .service( 'TargetList', TargetList);

//GroceryList service
function GroceryList( $http ) {

  return ListService( $http, grocery_url);
}

//TraderJoesList service
function TraderJoesList( $http ) {

  return ListService( $http, traderjoes_url);
}

//TargetList service
function TargetList ( $http ) {

  return ListService( $http, target_url);
}

// Generic ListService that contains store
// list and methods for adding, removing, etc.
function ListService( $http, url ) {
  var shoppingList = [];

  var service = {
    list: shoppingList,
    addItem: addItem,
    deleteItem: deleteItem,
    deleteAllItems: deleteAllItems
  };

  // Add an item to the store's list
  function addItem( item ) {
    //service.list.push( item );
    $http.post( url, item ).then( function(response) {
        console.log(response);
      },
      function(err) {
        return -1;
      }
    );
  }

  // Delete an item from the store's list via id
  function deleteItem( id ) {
    //service.list.splice(index, 1);
    $http.delete( url + '/' + id ).then( function(response) {
      console.log(response);
    },
      function(err) {
        return -1;
      }
    );
  }

  // Delete ALL items from the store's list
  // -1 is used to represent an INVALID mongodb _id
  // which initiates DELETE ALL
  function deleteAllItems() {
    //service.list.length = 0;
    $http.delete( url + '/' + '-1').then( function(response) {
      console.log(response);
    },
      function(err) {
        return -1;
      }
    );
  }

  return service;
}
