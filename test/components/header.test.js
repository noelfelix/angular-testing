import angular from 'angular';
import 'angular-mocks';

describe('headerComponent', () => {
  let $controller, $rootScope, $scope, $compile, controller, headerElement, compiledHeader, title;

  title = "Test App";

  beforeEach(() => {
    angular.mock.module('todoApp');

    angular.mock.module('templates');

    angular.mock.module($provide => {
      $provide.service('userService', () => ({
        logout: angular.noop,
        currentUser: "User"
      }));
    });

    inject((_$compile_, _$controller_, _$rootScope_) => {
      $compile = _$compile_;
      $controller = _$controller_;
      $rootScope = _$rootScope_;
    });

    $scope = $rootScope.$new();
    controller = $controller('headerController', {$scope: $scope});

    headerElement = angular.element(`<todo-header title="${title}"></todo-header>`);
    compiledHeader = $compile(headerElement)($scope);
    angular.element(document.body).empty();
    angular.element(document.body).append(compiledHeader);

    $scope.$apply();
  });

  describe('Controller', () => {
    it('has proper dependencies', () => {
      expect(controller.userService).toBeDefined();
    });
  });

  describe('Template', () => {
    it('uses the title passed in to the html attribute', () => {
      expect(document.body.toString().includes(`Welcome to ${title}`))
    });

    it('logs user out on logout button click', () => {
      spyOn(controller.userService, 'logout');
      document.querySelector('#logout-button').click();
      $scope.$apply();
      expect(controller.userService.logout).toHaveBeenCalled();
    });
  });
});