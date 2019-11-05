export const DEBT_STATUS = ['PENDING_DEBT', 'UN_PAID'];

export const CAPACITIES_BY_FEATURE_TYPES = {
  default: {
    canAnticipateRenew: true,
  },
  EXCHANGE: {
    canAnticipateRenew: false,
  },
};

export default {
  CAPACITIES_BY_FEATURE_TYPES,
  DEBT_STATUS,
};
