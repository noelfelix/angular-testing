import angular from 'angular';
import angularStorage from 'angular-storage';
import uiRouter from 'angular-ui-router';
import httpAuthInterceptor from './config/httpAuthInterceptor';
import constants from './config/constants';

(() => {
  const ngModule = angular.module('todoApp', [uiRouter, angularStorage]);

  httpAuthInterceptor(ngModule);

  ngModule.constant('CONSTANTS', constants);

  ngModule.config(($stateProvider, $urlRouterProvider, $httpProvider, $http) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('todo', {
        url: '/todo',
        templateUrl: '/todo.template.html',
        controller: 'todoController as vm'
      });

    $httpProvider.interceptors.push('httpAuthInterceptor');
  });
})();