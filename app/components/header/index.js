import headerEl from './header.directive';
import headerCtrl from './header.controller';

export default ngModule => {
  headerEl(ngModule);
  headerCtrl(ngModule);
};