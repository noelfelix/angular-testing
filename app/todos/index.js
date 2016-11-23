import controller from "./todos.controller";
import service from "./todos.service";

export default ngModule => {
  controller(ngModule);
  service(ngModule);
};