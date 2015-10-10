angular.module('shoppingListApp')
  .directive('moveList', function() {
    return {
        template: '<div class="dropdown">\
                      <!-- trigger button -->\
                      <button>Move Selected</button>\
                      <!-- dropdown menu -->\
                      <ul class="dropdown-menu">\
                          <li value="Grocery">Grocery</li>\
                          <li value="Trader Joe\'s">Trader Joe\'s</li>\
                          <li value="Target">Target</li>\
                      </ul>\
                  </div>',
        restrict: 'E',
    };
} );
