import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import '@uirouter/angularjs';
import 'angular-translate';
import 'ovh-ui-angular';
import 'ovh-api-services';

import component from './snapshot.component';
import routing from './snapshot.routing';

const moduleName = 'ovhManagerPciStoragesBlocksBlockSnapshot';

angular
  .module(moduleName, [
    'ui.router',
    'oui',
    'ovh-api-services',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .config(routing)
  .component('pciProjectStorageBlocksBlockSnapshot', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
