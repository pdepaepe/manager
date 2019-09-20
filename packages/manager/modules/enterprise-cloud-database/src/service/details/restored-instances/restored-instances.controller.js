export default class EnterpriseCloudDatabaseServiceDetailsRestoredInstancesCtrl {
  /* @ngInject */
  constructor(
    $scope,
    $state,
    CucCloudMessage,
    enterpriseCloudDatabaseService,
  ) {
    this.$scope = $scope;
    this.$state = $state;
    this.CucCloudMessage = CucCloudMessage;
    this.service = enterpriseCloudDatabaseService;
  }

  $onInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.CucCloudMessage.unSubscribe('enterprise-cloud-database.service.details.restored-instances');
    this.messageHandler = this.CucCloudMessage.subscribe('enterprise-cloud-database', { onMessage: () => this.refreshMessages() });
  }

  refreshMessages() {
    this.messages = this.messageHandler.getMessages();
  }
}