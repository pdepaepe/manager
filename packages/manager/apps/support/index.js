import managerSupport from '@ovh-ux/manager-support';
import uiRouterAngularJs from '@uirouter/angularjs';
import angular from 'angular';

/* eslint-disable import/no-webpack-loader-syntax, import/extensions */
import 'script-loader!jquery';
/* eslint-enable import/no-webpack-loader-syntax, import/extensions */

import { state } from './index.routing';

angular
  .module('supportApp', [
    managerSupport,
    uiRouterAngularJs,
  ])
  .config(/* @ngInject */ ($stateProvider) => {
    $stateProvider.state(state.name, state);
  });
