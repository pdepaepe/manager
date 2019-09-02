import ngTranslateAsyncLoader from '@ovh-ux/ng-translate-async-loader';
import uiRouter from '@uirouter/angularjs';
import angular from 'angular';
import angularTranslate from 'angular-translate';
import 'ovh-ui-angular';

import component from './new.component';
import { state } from './new.routing';

import 'ovh-ui-kit/dist/oui.css';

const moduleName = 'ovhManagerSupportTicketsNew';

angular
  .module(moduleName, [
    angularTranslate,
    ngTranslateAsyncLoader,
    'oui',
    uiRouter,
  ])
  .component('supportTicketsNew', component)
  .config(/* @ngInject */ ($stateProvider) => {
    $stateProvider.state('support.tickets.new', state);
  });

export default moduleName;
