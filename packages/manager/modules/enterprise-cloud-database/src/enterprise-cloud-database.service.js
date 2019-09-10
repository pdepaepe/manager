import capitalize from 'lodash/capitalize';
import find from 'lodash/find';
import get from 'lodash/get';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import set from 'lodash/set';
import toUpper from 'lodash/toUpper';

import { ERROR_STATUS, PROCESSING_STATUS } from './enterprise-cloud-database.constants';

export default class EnterpriseCloudDatabaseService {
  /* @ngInject */
  constructor($q, mockData, OvhApiCloudDBEnterprise, OvhApiMe) {
    this.$q = $q;
    this.mockData = mockData;
    this.OvhApiCloudDBEnterpriseCluster = OvhApiCloudDBEnterprise.v6();
    this.OvhApiCloudDBEnterpriseBackup = OvhApiCloudDBEnterprise.Backup().v6();
    this.OvhApiCloudDBEnterpriseEndpoint = OvhApiCloudDBEnterprise.Endpoint().v6();
    this.OvhApiCloudDBEnterpriseHost = OvhApiCloudDBEnterprise.Host().v6();
    this.OvhApiCloudDBEnterpriseLogs = OvhApiCloudDBEnterprise.Logs().v6();
    this.OvhApiCloudDBEnterpriseMaintenance = OvhApiCloudDBEnterprise.Maintenance().v6();
    this.OvhApiCloudDBEnterpriseWindow = OvhApiCloudDBEnterprise.MaintenanceWindow().v6();
    this.OvhApiCloudDBEnterpriseRestore = OvhApiCloudDBEnterprise.Restore().v6();
    this.OvhApiCloudDBEnterpriseRule = OvhApiCloudDBEnterprise.SecurityGroup().Rule().v6();
    this.OvhApiCloudDBEnterpriseSecurityGroup = OvhApiCloudDBEnterprise.SecurityGroup().v6();
    this.OvhApiCloudDBEnterpriseServiceInfos = OvhApiCloudDBEnterprise.ServiceInfos().v6();
    this.OvhApiCloudDBEnterpriseUser = OvhApiCloudDBEnterprise.User().v6();
    this.OvhApiCloudDBEnterpriseOffers = OvhApiCloudDBEnterprise.Offers().v6();
    this.OvhApiMe = OvhApiMe;
  }

  getDefaultPaymentMethod() {
    return this.OvhApiMe.PaymentMean().v6().getDefaultPaymentMean();
  }

  getMe() {
    return this.OvhApiMe.v6().get().$promise;
  }

  createMaintenanceWindow(clusterId, windowData) {
    return this.OvhApiCloudDBEnterpriseWindow.create({ clusterId }, windowData).$promise;
  }

  createRule(clusterId, securityGroupId, source) {
    return this.OvhApiCloudDBEnterpriseRule.create({ clusterId, securityGroupId },
      { source }).$promise;
  }

  createSecurityGroup(clusterId, name) {
    return this.OvhApiCloudDBEnterpriseSecurityGroup.create({ clusterId },
      { clusterId, name }).$promise;
  }

  deleteRule(clusterId, securityGroupId, ruleId) {
    return this.OvhApiCloudDBEnterpriseRule
      .delete({ clusterId, securityGroupId, ruleId }).$promise;
  }

  deleteSecurityGroup(clusterId, securityGroupId) {
    return this.OvhApiCloudDBEnterpriseSecurityGroup
      .delete({ clusterId, securityGroupId }).$promise;
  }

  getOffers() {
    return this.OvhApiCloudDBEnterpriseOffers.query()
      .$promise
      .then(offers => this.$q.all(map(offers, offer => this.getOfferDetails(offer)
        .then((offerDetails) => {
          set(offerDetails, 'displayName', capitalize(offerDetails.name));
          return offerDetails;
        }))));
  }

  getOfferDetails(offerName) {
    return this.OvhApiCloudDBEnterpriseOffers.get({ name: offerName }).$promise;
  }

  getCatalog() {
    return this.mockData.getCatalog();
  }

  getClusterDetails(clusterId) {
    return this.OvhApiCloudDBEnterpriseCluster.get({ clusterId })
      .$promise
      .then((response) => {
        delete response.$promise;
        return response;
      });
  }

  getClusters() {
    return this.OvhApiCloudDBEnterpriseCluster.query().$promise;
  }

  getEndpointDetails(clusterId, endpointId) {
    return this.OvhApiCloudDBEnterpriseEndpoint.get({ clusterId, endpointId }).$promise;
  }

  getEndpoints(clusterId) {
    return this.OvhApiCloudDBEnterpriseEndpoint.query({ clusterId }).$promise;
  }

  getEndpointsWithDetails(clusterId) {
    return this.getEndpoints(clusterId)
      .then(endpoints => this.$q.all(
        map(endpoints, endpointId => this.getEndpointDetails(clusterId, endpointId)),
      ));
  }

  getHostsWithDetails(clusterId) {
    return this.getHosts(clusterId)
      .then(hosts => this.$q.all(
        map(hosts, hostId => this.getHostDetails(clusterId, hostId)),
      ));
  }

  getHostDetails(clusterId, hostId) {
    return this.OvhApiCloudDBEnterpriseHost.get({ clusterId, hostId }).$promise;
  }

  getHosts(clusterId) {
    return this.OvhApiCloudDBEnterpriseHost.query({ clusterId }).$promise;
  }

  getMaintenanceWindow(clusterId) {
    return this.OvhApiCloudDBEnterpriseWindow.get({ clusterId }).$promise;
  }

  getRuleDetails(clusterId, securityGroupId, ruleId) {
    return this.OvhApiCloudDBEnterpriseRule.get({ clusterId, securityGroupId, ruleId }).$promise;
  }

  getRulesList(clusterId, securityGroupId) {
    return this.getRules(clusterId, securityGroupId)
      .then(rules => this.$q.all(map(rules,
        ruleId => this.getRuleDetails(clusterId, securityGroupId, ruleId))));
  }

  getRules(clusterId, securityGroupId) {
    return this.OvhApiCloudDBEnterpriseRule.query({ clusterId, securityGroupId }).$promise;
  }

  getSecurityGroupDetails(clusterId, securityGroupId) {
    return this.OvhApiCloudDBEnterpriseSecurityGroup.get({ clusterId, securityGroupId }).$promise;
  }

  getSecurityGroupList(clusterId) {
    return this.getSecurityGroups(clusterId)
      .then(securityGroups => this.$q.all(map(securityGroups,
        securityGroupId => this.getSecurityGroupDetails(clusterId, securityGroupId))));
  }

  getSecurityGroups(clusterId) {
    return this.OvhApiCloudDBEnterpriseSecurityGroup.query({ clusterId }).$promise;
  }

  getServiceInfo(clusterId) {
    return this.OvhApiCloudDBEnterpriseServiceInfos.get({ clusterId }).$promise;
  }

  setClusterDetails(clusterId, clusterDetails) {
    return this.OvhApiCloudDBEnterpriseCluster.update({ clusterId }, clusterDetails).$promise;
  }

  setUserPassword(clusterId, password) {
    return this.OvhApiCloudDBEnterpriseUser.create({ clusterId }, { password }).$promise;
  }

  updateMaintenanceWindow(clusterId, windowData) {
    return this.OvhApiCloudDBEnterpriseWindow.update({ clusterId }, windowData).$promise;
  }

  getRestores(clusterId) {
    return this.OvhApiCloudDBEnterpriseRestore.query({ clusterId }).$promise;
  }

  getRestoreDetails(clusterId, restoreId) {
    return this.OvhApiCloudDBEnterpriseRestore.get({ clusterId, restoreId }).$promise;
  }

  getRestoreList(clusterId) {
    return this.getRestores(clusterId)
      .then(restores => this.$q.all(
        map(restores, restoreId => this.getRestoreDetails(clusterId, restoreId)),
      ));
  }

  createRestore(clusterId, backupId, timestamp) {
    const payLoad = backupId ? { backupId } : { timestamp };
    return this.OvhApiCloudDBEnterpriseRestore.create({ clusterId }, payLoad).$promise;
  }

  deleteRestoredInstance(clusterId, restoredInstanceId) {
    return this.OvhApiCloudDBEnterpriseRestore.delete(
      { clusterId, restoreId: restoredInstanceId },
    ).$promise;
  }

  createBackup(clusterId, name) {
    return this.OvhApiCloudDBEnterpriseBackup.create({ clusterId }, { clusterId, name }).$promise;
  }

  getBackups(clusterId) {
    return this.OvhApiCloudDBEnterpriseBackup.query({ clusterId }).$promise;
  }

  getBackupDetails(clusterId, backupId) {
    return this.OvhApiCloudDBEnterpriseBackup.get({ clusterId, backupId }).$promise;
  }

  deleteBackupInstance(clusterId, backupInstanceId) {
    return this.OvhApiCloudDBEnterpriseBackup.delete(
      { clusterId, backupId: backupInstanceId },
    ).$promise;
  }

  getLogs(clusterId) {
    return this.OvhApiCloudDBEnterpriseLogs.query({ clusterId })
      .$promise
      .then(ids => map(ids, id => ({ id })));
  }

  getLogDetails(clusterId, logsId) {
    return this.OvhApiCloudDBEnterpriseLogs.get({ clusterId, logsId })
      .$promise;
  }

  grantAccessToLdpAccount(clusterId, log) {
    return this.OvhApiCloudDBEnterpriseLogs.grantAccess({ clusterId }, log)
      .$promise;
  }

  revokeAccessToLdpAccount(clusterId, logsId) {
    return this.OvhApiCloudDBEnterpriseLogs.revokeAccess({ clusterId, logsId })
      .$promise;
  }

  resetSecurityGroupDetailsCache() {
    this.OvhApiCloudDBEnterpriseSecurityGroup.resetCache();
  }

  updateSecurityGroup(clusterId, securityGroupId, name) {
    return this.OvhApiCloudDBEnterpriseSecurityGroup.update(
      { clusterId, securityGroupId },
      { name },
    ).$promise;
  }

  static getCapabilities(catalog, offers) {
    const capabilities = offers;
    map(capabilities, (capability) => {
      const plans = get(catalog, 'plans', []);
      const plan = find(plans, p => p.planCode === capability.name);
      if (!isEmpty(plan)) {
        // populate cpu, memory, storage
        EnterpriseCloudDatabaseService.populateComputation(capability, plan);
        // populate storage details
        EnterpriseCloudDatabaseService.populateStorage(capability, plan);
        // populate pricing
        EnterpriseCloudDatabaseService.populatePricing(capability, plan);
      }
    });
    return capabilities;
  }

  static populatePricing(capability, plan) {
    const priceDetails = head(plan.pricings);
    set(capability, 'pricings', priceDetails);
    const price = get(priceDetails, 'price', 0);
    const tax = get(priceDetails, 'tax', 0);
    const priceTotal = (price + tax) / 100000000;
    const priceObj = {
      totalLabel: `$${priceTotal}`,
      total: priceTotal,
      price,
      tax,
    };
    set(capability, 'price', priceObj);
  }

  static populateComputation(capability, plan) {
    set(capability, 'cpu', get(plan, 'blobs.technical.cpu'));
    set(capability, 'memory', get(plan, 'blobs.technical.memory'));
  }

  static populateStorage(capability, plan) {
    const storages = get(plan, 'blobs.technical.storage');
    const storage = {
      size: get(head(storages.disks), 'capacity', 0),
      type: toUpper(get(head(storages.disks), 'technology', null)),
      count: get(head(storages.disks), 'number', 0),
    };
    set(capability, 'storage', storage);
  }

  static isProcessing(status) {
    return PROCESSING_STATUS.includes(status);
  }

  static isError(status) {
    return ERROR_STATUS.includes(status);
  }
}
