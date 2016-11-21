(() => {
  const ngModule = angular.module('todoApp', ['ui.router']);

  ngModule.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('todo', {
        url: '/todo',
        templateUrl: '/todo.template.html',
        controller: 'todoController as vm'
      });
  });
})();