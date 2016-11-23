import httpAuthInterceptor from './interceptors/httpAuthInterceptor';
import constants from './constants';

import login from '../login/index';
import todos from '../todos/index';
import todo from '../todos/todo/index';
import services from '../services/index';

export default ngModule => {
  httpAuthInterceptor(ngModule);
  services(ngModule);

  ngModule.constant('CONSTANTS', constants);

  ngModule.config(($stateProvider, $urlRouterProvider, $httpProvider) => {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'loginController as vm'
      })
      .state('todos', {
        url: '/todos',
        templateUrl: 'app/todos/todos.html',
        controller: 'todosController as vm'
      });

    $httpProvider.interceptors.push('httpAuthInterceptor');

    login(ngModule);
    todos(ngModule);
    todo(ngModule);
  });
}