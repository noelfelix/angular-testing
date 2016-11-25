import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngStorage from 'angular-storage';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';

import interceptors from './config/interceptors/index';
import login from './login/index';
import todos from './todos/index';
import todo from './todos/todo/index';
import services from './services/index';

import config from './config/config'

(() => {
  const ngModule = angular.module('todoApp', [uiRouter, ngStorage, ngAnimate, ngAria, ngMaterial]);

  interceptors(ngModule);
  services(ngModule);
  login(ngModule);
  todos(ngModule);
  todo(ngModule);

  config(ngModule);
})();