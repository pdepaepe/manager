import component from './domain-webhosting-order.component';

const resolve = {
  alertCheckoutError: /* @ngInject */ (
    $translate,
    Alerter,
  ) => translationId => Alerter.error($translate.instant(translationId), 'webhosting-order-alert'),
  assignCart: /* @ngInject */ (
    cartId,
    OrderService,
  ) => OrderService.assignCart(cartId),
  availableModules: /* @ngInject */
    (cartId, WebHostingOrder) => WebHostingOrder
      .getAvailableModules(cartId),
  availableOffers: /* @ngInject */ (
    cartId,
    user,
    WebHostingOrder,
  ) => WebHostingOrder.getAvailableOffers(cartId, user.ovhSubsidiary),
  cartId: /* @ngInject */ (
    user,
    OrderService,
  ) => OrderService.createNewCart(user.ovhSubsidiary)
    .then(({ cartId }) => cartId),
  defaultPaymentMean: /* @ngInject */
    ovhPaymentMethod => ovhPaymentMethod.getDefaultPaymentMethod(),
  displayPayCheckoutSuccessMessage: /* @ngInject */ (
    $translate,
    Alerter,
  ) => (
    accountId,
    billUrl,
    price,
    renewDate,
  ) => Alerter.success($translate.instant('domain_webhosting_order_payment_success_message', {
    accountId,
    billUrl,
    price,
    renewDate,
  }), 'webhosting-order-alert'),
  openBill: /* @ngInject */ $window => billUrl => $window.open(billUrl, '_blank'),
  prepareCheckout: /* @ngInject */
    WebHostingOrder => (cartId, cartOption, domainName) => WebHostingOrder
      .prepareCheckout(cartId, cartOption, domainName),
  validateCheckout: /* @ngInject */ (
    alertCheckoutError,
    defaultPaymentMean,
    displayPayCheckoutSuccessMessage,
    domain,
    goBackToDashboard,
    openBill,
    WebHostingOrder,
  ) => (cartId, checkoutToPay) => WebHostingOrder
    .validateCheckout(cartId, checkoutToPay)
    .catch(() => { alertCheckoutError('domain_webhosting_order_payment_checkout_error'); })
    .then(checkout => goBackToDashboard(true)
      .then(() => (checkoutToPay.autoPayWithPreferredPaymentMethod
        ? displayPayCheckoutSuccessMessage(
          defaultPaymentMean.label,
          checkout.url,
          checkout.prices.withTax.text,
          moment(domain.expiration).add(1, 'days').format('DD/MM/YYYY'),
        ) : openBill(checkout.url)))),
};

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider
    .state('app.domain.product.webhosting.order', {
      url: '/order',
      views: {
        'webhostingView@app.domain.product.webhosting': {
          component: component.name,
        },
      },
      resolve: Object.assign(
        resolve,
        { goBackToDashboard: /* @ngInject */ $state => reload => $state.go('app.domain.product.information', null, { reload: reload || false }) },
      ),
    })
    .state('app.domain.alldom.webhosting.order', {
      url: '/order',
      views: {
        'webhostingView@app.domain.alldom.webhosting': {
          component: component.name,
        },
      },
      resolve: Object.assign(
        resolve,
        { goBackToDashboard: /* @ngInject */ $state => reload => $state.go('app.domain.alldom.information', null, { reload: reload || false }) },
      ),
    });
};
