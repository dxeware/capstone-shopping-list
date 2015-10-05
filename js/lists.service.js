angular.module('shoppingListApp')
  .service( 'TraderJoesList', TraderJoesList)
  .service( 'GroceryList', GroceryList)
  .service( 'TargetList', TargetList);

function TraderJoesList() {

  return ListService('juicy chicken');
}

function GroceryList() {

  return ListService('milk');
}

function TargetList () {

  return ListService('TP');
}

function ListService(origItem) {
  var shoppingList = [ { item: origItem } ];

  var service = {
    list: shoppingList,
    addItem: addItem,
    deleteItem: deleteItem
  };


  function addItem( item ) {
    service.list.push( item );
  }

  function deleteItem( index ) {
    service.list.splice(index, 1);
  }

  return service;
}
