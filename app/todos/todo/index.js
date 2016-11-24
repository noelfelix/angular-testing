import controller from "./todo.controller";
import directive from "./todo.directive";

export default ngModule => {
  controller(ngModule);
  directive(ngModule);
};