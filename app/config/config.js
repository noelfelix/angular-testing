
import constants from './constants';

export default ngModule => {

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
  });
}