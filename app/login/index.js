import controller from "./login.controller";
import service from "../services/login.service";

export default ngModule => {
  controller(ngModule);
  service(ngModule);
};