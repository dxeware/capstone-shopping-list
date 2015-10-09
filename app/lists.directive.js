angular.module('shoppingListApp')
  .directive('moveList', function() {
    return {
        template: '<div class="dropdown">\
                      <!-- trigger button -->\
                      <button class="shadow">Move Selected</button>\
                      <!-- dropdown menu -->\
                      <ul class="dropdown-menu">\
                          <li value="grocery">Grocery</li>\
                          <li value="traderJoes">Trader Joes</li>\
                          <li value="target">Target</li>\
                      </ul>\
                  </div>',
        restrict: 'E',
    };
} );
