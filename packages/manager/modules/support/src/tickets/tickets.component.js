import template from './tickets.html';

export default {
  bindings: {
    goToNew: '<',
    goToTicket: '<',
    gridColumnLastMessageFromTypeOptions: '<',
    gridColumnStateTypeOptions: '<',
    reload: '<',
    tickets: '<',
  },
  name: 'supportTickets',
  template,
};
