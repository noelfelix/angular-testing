export default ngModule => {
  let componentName = 'todoHeader';

  function header() {
    return {
      templateUrl: 'app/components/header/header.template.html',
      restrict: 'E',
      scope: {
        title: '@'
      },
      controller: 'headerController as vm',
      bindToController: true
    }
  }

  ngModule.directive(componentName, header);
};