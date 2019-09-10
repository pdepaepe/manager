import controller from './tickets.controller';
import template from './tickets.html';

export default {
  bindings: {
    filters: '<',
    goToTicket: '<',
    gridColumnLastMessageFromTypeOptions: '<',
    gridColumnStateTypeOptions: '<',
    onGridParamsChange: '<',
    pageNumber: '<',
    pageSize: '<',
    reload: '<',
    sortBy: '<',
    sortOrder: '<',
    tickets: '<',
  },
  controller,
  name: 'supportTickets',
  template,
};
