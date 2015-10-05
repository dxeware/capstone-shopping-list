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
    addItem: addItem
  };


  function addItem( item ) {
      service.list.push( item );
  }

  return service;
}
