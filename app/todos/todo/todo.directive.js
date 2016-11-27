export default ngModule => {
  let componentName = 'todo';

  function todo() {
    return {
      templateUrl: 'app/todos/todo/todo.template.html',
      restrict: 'E',
      scope: {
        todo: '='
      },
      controller: 'todoController as vm',
      bindToController: true,
    }
  }

  ngModule.directive(componentName, todo);
};