export default ngModule => {
  let componentName = 'todoHeader';

  function header() {
    return {
      templateUrl: 'app/components/header/header.template.html',
      resctrict: 'E',
      scope: {
        'title': '@'
      },
      controller: 'headerController as vm'
    }
  }

  ngModule.directive(componentName, header);
};