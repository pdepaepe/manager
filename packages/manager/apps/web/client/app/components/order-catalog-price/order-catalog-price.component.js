import controller from './order-catalog-price.controller';
import template from './order-catalog-price.html';

const component = {
  bindings: {
    block: '<',
    price: '<',
    tax: '<',
    user: '<',
  },
  controller,
  template,
};

export default component;
