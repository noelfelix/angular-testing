import controller from "./login.controller";
import service from "./login.service";

export default ngModule => {
  controller(ngModule);
  service(ngModule);
};