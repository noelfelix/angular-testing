import controller from "./login.controller";
import service from "../services/user.service";

export default ngModule => {
  controller(ngModule);
  service(ngModule);
};