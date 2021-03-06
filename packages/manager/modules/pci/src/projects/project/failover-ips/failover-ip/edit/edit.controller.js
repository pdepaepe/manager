import find from 'lodash/find';

const MESSAGES_CONTAINER_NAME = 'pci.projects.project.failover-ips';

export default class FailoverIpEditController {
  /* @ngInject */
  constructor(
    $q,
    $state,
    $translate,
    CucCloudMessage,
    OvhApiCloudProject,
    OvhApiCloudProjectIpFailover,
  ) {
    this.$q = $q;
    this.$state = $state;
    this.$translate = $translate;
    this.CucCloudMessage = CucCloudMessage;
    this.OvhApiCloudProject = OvhApiCloudProject;
    this.OvhApiCloudProjectIpFailover = OvhApiCloudProjectIpFailover;

    this.isLoading = false;
  }

  $onInit() {
    this.isLoading = true;
    this.instance = this.ip ? this.ip.instance : undefined;

    return this.OvhApiCloudProject.Instance().v6().query({
      serviceName: this.projectId,
    }).$promise.then((instances) => {
      this.instances = instances;
    }).catch(({ data }) => {
      this.CucCloudMessage.error(
        this.$translate.instant('pci_projects_project_failover-ip_error', { error: data.message }),
        MESSAGES_CONTAINER_NAME,
      );
      this.goBack();
    }).finally(() => {
      if (!this.instance && this.ip && this.ip.routedTo) {
        this.instance = find(this.instances, { id: this.ip.routedTo });
      }
      this.isLoading = false;
    });
  }

  goBack() {
    this.$state.go('^');
  }

  edit() {
    this.isLoading = true;

    return this.OvhApiCloudProjectIpFailover.v6().attach({
      serviceName: this.projectId,
      id: this.ip.id,
    }, {
      instanceId: this.instance.id,
    }).$promise.then(() => {
      this.ip.routedTo = this.instance.id;
      this.ip.instance = this.instance;
      this.CucCloudMessage.success(
        this.$translate.instant('pci_projects_project_failover-ip_edit', { ip: this.ip.ip }),
        MESSAGES_CONTAINER_NAME,
      );
    }).catch(({ data }) => {
      this.CucCloudMessage.error(
        this.$translate.instant('pci_projects_project_failover-ip_edit_error', { error: data.message }),
        MESSAGES_CONTAINER_NAME,
      );
    }).finally(() => {
      this.goBack();
      this.isLoading = false;
    });
  }
}
