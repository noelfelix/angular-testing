import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngStorage from 'angular-storage';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';

import config from './config/config'

(() => {
  const ngModule = angular.module('todoApp', [uiRouter, ngStorage, ngAnimate, ngAria, ngMaterial]);
  config(ngModule);
})();