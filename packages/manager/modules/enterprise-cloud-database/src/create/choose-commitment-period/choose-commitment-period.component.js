import controller from './choose-commitment-period.controller';
import template from './choose-commitment-period.html';

export default {
  bindings: {
    enterpriceDb: '<',
    commitmentPeriods: '<',
    user: '<',
  },
  controller,
  template,
};
