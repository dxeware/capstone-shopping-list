angular.module('shoppingListApp')
  .service( 'TraderJoesList', TraderJoesList)
  .service( 'GroceryList', GroceryList)
  .service( 'TargetList', TargetList);

function TraderJoesList() {

  return ListService();
}

function GroceryList() {

  return ListService();
}

function TargetList () {

  return ListService();
}

function ListService() {
  var shoppingList = [];

  var service = {
    list: shoppingList,
    addItem: addItem,
    deleteItem: deleteItem,
    deleteAllItems: deleteAllItems
  };


  function addItem( item ) {
    service.list.push( item );
  }

  function deleteItem( index ) {
    service.list.splice(index, 1);
  }

  function deleteAllItems() {
    service.list.length = 0;
  }

  return service;
}
