/* eslint-disable import/no-webpack-loader-syntax */
import 'script-loader!jquery';
import 'script-loader!moment/min/moment-with-locales.min';
import 'script-loader!jsurl/lib/jsurl';
/* eslint-enable import/no-webpack-loader-syntax */

import angular from 'angular';
import '@ovh-ux/manager-vps';

import { momentConfiguration } from './config';

import 'ovh-ui-kit-bs/dist/ovh-ui-kit-bs.css';

angular
  .module('vpsApp', [
    'ovhManagerVps',
  ])
  .config(momentConfiguration);
