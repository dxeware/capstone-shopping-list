angular.module('shoppingListApp')
  //.service( 'TraderJoesList', TraderJoesList)
  .service( 'StoreListService', StoreListService);
  //.service( 'TargetList', TargetList);

//GroceryList service
/*function GroceryList( $http, $q ) {

  return ListService( $http, $q, grocery_url);
}

//TraderJoesList service
function TraderJoesList( $http, $q ) {

  return ListService( $http, $q, traderjoes_url);
}

//TargetList service
function TargetList ( $http, $q ) {

  return ListService( $http, $q, target_url);
} */

// Generic ListService that contains store
// list and methods for adding, removing, etc.
function StoreListService( $http, $q) {
  var shoppingList = [];
  var deferred = $q.defer();

  var service = {
    list: shoppingList,
    addItem: addItem,
    deleteItem: deleteItem,
  };

  // Add an item to the store's list
  function addItem( item ) {
    $http.post( storelist_url, item ).then(
      function(response) {
        console.log("POST success");
        console.log(response);
        deferred.resolve(response);
      },
      function(error) {
        console.log("POST error");
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }

  // Delete an item from the store's list via id
  function deleteItem( id ) {
    $http.delete( storelist_url + '/' + id ).then(
      function(response) {
        console.log(response);
        deferred.resolve(response);
      },
      function(error) {
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }

  // Delete ALL items from the store's list
  // -1 is used to represent an INVALID mongodb _id
  // which initiates DELETE ALL
  /*function deleteAllItems() {
    //service.list.length = 0;
    $http.delete( storelist_url + '/' + '-1').then(
      function(response) {
        console.log(response);
        deferred.resolve(response);
      },
      function(error) {
        deferred.reject(error);
      }
    );
    return deferred.promise;
  } */

  return service;

}
