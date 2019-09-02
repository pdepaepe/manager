export const state = {
  resolve: {
    goToTickets: /* @ngInject */ $state => () => $state
      .go('support.tickets'),
  },
  url: '/new',
  views: {
    'support@support': 'supportTicketsNew',
  },
};

export default {
  state,
};
