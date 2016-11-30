import angular from 'angular';
import 'angular-mocks'

describe('loginController', () => {
  let $controller, $scope, $rootScope, controller, userService;

  beforeEach(() => {
    angular.mock.module('todoApp');

    inject((_$rootScope_, _$controller_) => {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
    });

    $scope = $rootScope.$new();
    controller = $controller('loginController', {$scope: $scope});
  });

  describe('Controller initialized', () => {
    it('has a userService service', () => {
      expect(controller.userService).toBeDefined();
    });
  });
});