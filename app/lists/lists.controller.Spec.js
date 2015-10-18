describe("shoppingListApp", function() {

  beforeEach(module('shoppingListApp'));

  // Initialize the controller and a mock scope
  describe('StoreListCtrl', function() {

    var vm, service, location, http;
    var ctrl, scope, location;

    beforeEach(inject(function(){
      console.log("==================================");
      console.log("=====lists.controller.Spec.js=====");
      console.log("==================================");
    }));



    beforeEach(inject(function($controller){

      //service = StoreListService;
      //location = $location;
      //http = $http;
      //scope = $rootScope.$new();
      ctrl = $controller('StoreListCtrl');
    }));

    // Check some defaults
    it('should have some variables defined', function(){
      //Check if they are defined
      expect(ctrl.errorPresent).toBeDefined();
      expect(ctrl.error).toBeDefined();

    });

    /*it('should have some variables with default values', function(){
      // Check if the default values are correct
      //expect(vm.errorPresent).toBeFalsy();

    }); */
  });

});
