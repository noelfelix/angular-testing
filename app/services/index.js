import user from "./user.service";
import session from "./session.service";

export default ngModule => {
  user(ngModule);
  session(ngModule);
};