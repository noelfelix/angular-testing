import angular from 'angular';
import 'angular-mocks'

describe('loginController', () => {
  let $controller, $scope, $rootScope, controller;

  beforeEach(() => {
    //Create a mock version of our Angular application to be used for testing
    angular.mock.module('todoApp');

    /*
    * Inject any dependencies we need a reference to within our tests or for creating our test env
    * Standard is to bookend dependencies with underscores
    * Will always inject $rootScope and $controller when doing controller testing
    */
    inject((_$rootScope_, _$controller_) => {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
    });

    //Create a new $scope and instantiate the controller we want to test with that scope
    $scope = $rootScope.$new();
    controller = $controller('loginController', {$scope: $scope});

    /*
     Above controller function takes optional third argument which is an object that extends scope.
     Used for easily mocking values.

     controller = $controller('loginController', {$scope: $scope}, {
       currentInspection: someInspection,
       shipmentDetails: someShipmentDetails
     });

     controller.$scope.currentInspection === someInspection //True

     The above example could be used as an alternative to mocking service requests.
     */
  });

  describe('Controller initialized', () => {
    it('initializes with expected dependencies', () => {
      expect(controller.userService).toBeDefined();
    });
  });
});