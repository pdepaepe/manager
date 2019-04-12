import angular from 'angular';
import 'ovh-ui-angular';

import blocks from './blocks';
import cloudArchive from './cloud-archives';
import objects from './objects';
import snapshots from './snapshots';
import routing from './storages.routing';

const moduleName = 'ovhManagerPciStorages';

angular
  .module(moduleName, [
    blocks,
    cloudArchive,
    'oui',
    objects,
    snapshots,
    'ui.router',
  ])
  .config(routing);

export default moduleName;
