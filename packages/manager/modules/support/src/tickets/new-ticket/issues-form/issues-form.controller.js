import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

export default class SupportNewIssuesFormController {
  /* @ngInject */
  constructor(
    $q,
    $translate,
    atInternet,
    OvhApiService,
    OvhApiSupport,
    SupportNewTicketService,
  ) {
    this.$q = $q;
    this.$translate = $translate;
    this.atInternet = atInternet;
    this.OvhApiService = OvhApiService;
    this.OvhApiSupport = OvhApiSupport;
    this.SupportNewTicketService = SupportNewTicketService;
  }

  $onInit() {
    this.props = {
      categoryName: this.propsCategoryName,
      serviceName: this.propsServiceName,
      serviceTypeName: this.propsServiceTypeName,
    };

    this.bindings = {
      category: {
        isAvailable: false,
      },
      serviceType: {
        exists: false,
        isAvailable: false,
      },
    };

    return this.getInitialData();
  }

  getInitialData() {
    return this.$q
      .all({
        categories: this.getCategories(),
        serviceTypes: this.props.serviceTypeName ? this.getServiceTypes() : undefined,
      })
      . then(({ serviceTypes }) => {
        this.bindings.serviceType.value = serviceTypes
          .find(serviceType => [serviceType.name, serviceType.label]
            .includes(this.props.serviceTypeName));

        if (isObject(this.bindings.serviceType.value)) {
          this.bindings.serviceType.exists = true;
        }
      });
  }

  getCategories() {
    this.bindings.category.isAvailable = false;

    return this.SupportNewTicketService
      .getCategories()
      .then((categories) => {
        this.bindings.category.isAvailable = true;
        this.bindings.category.values = categories;

        return this.bindings.category.values;
      });
  }

  getServiceTypes() {
    this.bindings.serviceType.isAvailable = false;

    return this.OvhApiSupport.v6()
      .getServiceTypes().$promise
      .then((serviceTypes) => {
        this.bindings.serviceType.isAvailable = true;
        this.bindings.serviceType.values = [...serviceTypes]
          .map(serviceType => ({
            ...serviceType,
            label: this.$translate.instant(`ovhManagerSupport_new_serviceType_${serviceType.name}`),
          }))
          .sort((a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }));

        return this.bindings.serviceType.values;
      });
  }

  onCategoryChange() {
    this.bindings.serviceType.exists = isObject(this.bindings.category.value);

    if (!isArray(this.bindings.serviceType.values)) {
      return this.getServiceTypes();
    }

    return this.$q.when();
  }
}
