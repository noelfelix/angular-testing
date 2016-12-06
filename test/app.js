import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngStorage from 'angular-storage';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';

import components from '../app/components/index';
import interceptors from '../app/config/interceptors/index';
import login from '../app/login/index';
import todos from '../app/todos/index';
import todo from '../app/todos/todo/index';
import services from '../app/services/index';

import config from '../app/config/config'

(() => {
  const ngModule = angular.module('todoApp', [uiRouter, ngStorage, ngAnimate, ngAria, ngMaterial]);

  components(ngModule);
  interceptors(ngModule);
  services(ngModule);
  login(ngModule);
  todos(ngModule);
  todo(ngModule);

  config(ngModule);
})();