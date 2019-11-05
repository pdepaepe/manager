import angular from 'angular';

import '@uirouter/angularjs';
import 'angular-translate';
import 'ovh-api-services';
import 'ovh-ui-angular';
import 'angular-ui-bootstrap';
import 'angular-chart.js';

import ovhManagerCore from '@ovh-ux/manager-core';
import ngUiRouterLayout from '@ovh-ux/ng-ui-router-layout';
import ngAtInternet from '@ovh-ux/ng-at-internet';
import ngOvhCloudUniverseComponents from '@ovh-ux/ng-ovh-cloud-universe-components';
import ngOvhDocUrl from '@ovh-ux/ng-ovh-doc-url';

import VpsActionService from './vps-action.service';
import VpsTaskService from './vps-task.service';
import VpsNotificationIpv6Service from './import/notification.service';
import VpsService from './import/vps.service';

import detailComponent from './detail/vps-detail.component';
import headerComponent from './header/vps-header.component';
import routing from './routing';

import ovhManagerVpsAdditionnalDisk from './additional-disk';
import ovhManagerVpsBackupStorage from './backup-storage';
import ovhManagerVpsCloudDatabase from './cloud-database';
import ovhManagerVpsDashboard from './dashboard';
import ovhManagerVpsModal from './modal';
import ovhManagerVpsMonitoring from './monitoring';
import ovhManagerVpsSecondaryDns from './secondary-dns';
import ovhManagerVpsSnapshot from './snapshot';
import ovhManagerVpsUpgrade from './upgrade';
import ovhManagerVpsVeeam from './veeam';
import ovhManagerVpsWindows from './windows';

import 'ovh-ui-kit/dist/oui.css';
import './vps.less';
import './vps.scss';

const moduleName = 'ovhManagerVps';

angular
  .module(moduleName, [
    'chart.js',
    ovhManagerCore,
    'pascalprecht.translate',
    'ui.router',
    'ovh-api-services',
    'oui',
    'ui.bootstrap',
    ngAtInternet,
    ngOvhDocUrl,
    ngOvhCloudUniverseComponents,
    ngUiRouterLayout,
    ovhManagerVpsAdditionnalDisk,
    ovhManagerVpsBackupStorage,
    ovhManagerVpsCloudDatabase,
    ovhManagerVpsDashboard,
    ovhManagerVpsMonitoring,
    ovhManagerVpsSecondaryDns,
    ovhManagerVpsSnapshot,
    ovhManagerVpsUpgrade,
    ovhManagerVpsModal,
    ovhManagerVpsVeeam,
    ovhManagerVpsWindows,
  ])
  .component(detailComponent.name, detailComponent)
  .component(headerComponent.name, headerComponent)
  .service('VpsActionService', VpsActionService)
  .service('VpsTaskService', VpsTaskService)
  .service('VpsNotificationIpv6', VpsNotificationIpv6Service)
  .service('VpsService', VpsService)
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
