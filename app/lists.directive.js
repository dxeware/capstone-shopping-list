angular.module('shoppingListApp')
  .directive('moveList', function() {
    return {
        template: '<div class="dropdown">\
                      <!-- trigger button -->\
                      <button>Move Selected</button>\
                      <!-- dropdown menu -->\
                      <ul class="dropdown-menu">\
                          <li value="{{store.storeArray[0]}}" ng-hide="store.storeArray[0] === store.storeName">{{store.storeArray[0]}}</li>\
                          <li value="{{store.storeArray[1]}}" ng-hide="store.storeArray[1] === store.storeName">{{store.storeArray[1]}}</li>\
                          <li value="{{store.storeArray[2]}}" ng-hide="store.storeArray[2] === store.storeName">{{store.storeArray[2]}}</li>\
                      </ul>\
                  </div>',
        restrict: 'E',
    };
} );
