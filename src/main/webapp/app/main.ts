// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.common with an alias.
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import Vue2Filters from 'vue2-filters';
import { ToastPlugin } from 'bootstrap-vue';
import router from './router';
import * as config from './shared/config/config';
import * as bootstrapVueConfig from './shared/config/config-bootstrap-vue';
import JhiItemCountComponent from './shared/jhi-item-count.vue';
import JhiSortIndicatorComponent from './shared/sort/jhi-sort-indicator.vue';
import InfiniteLoading from 'vue-infinite-loading';
import HealthService from './admin/health/health.service';
import MetricsService from './admin/metrics/metrics.service';
import LogsService from './admin/logs/logs.service';
import ConfigurationService from '@/admin/configuration/configuration.service';
import ActivateService from './account/activate/activate.service';
import RegisterService from './account/register/register.service';
import UserManagementService from '@/admin/user-management/user-management.service';
import LoginService from './account/login.service';
import AccountService from './account/account.service';

import '../content/scss/vendor.scss';

import UserOAuth2Service from '@/entities/user/user.oauth2.service';
/* tslint:disable */

import BuyerService from '@/entities/buyer/buyer.service';
import ProductService from '@/entities/product/product.service';
import ProductImageService from '@/entities/product-image/product-image.service';
import ProductTagService from '@/entities/product-tag/product-tag.service';
import ProductCategoryService from '@/entities/product-category/product-category.service';
import ProductAttributeService from '@/entities/product-attribute/product-attribute.service';
import ProductAttributeTermService from '@/entities/product-attribute-term/product-attribute-term.service';
import ProductReviewService from '@/entities/product-review/product-review.service';
import ProductVariationService from '@/entities/product-variation/product-variation.service';
import ProductShippingClassService from '@/entities/product-shipping-class/product-shipping-class.service';
import CouponService from '@/entities/coupon/coupon.service';
import ItemService from '@/entities/item/item.service';
import ProductOrderService from '@/entities/product-order/product-order.service';
import AddressService from '@/entities/address/address.service';
import NotificationService from '@/entities/notification/notification.service';
import InvoiceService from '@/entities/invoice/invoice.service';
import TransactionService from '@/entities/transaction/transaction.service';
import TaxRateService from '@/entities/tax-rate/tax-rate.service';
import TaxClassService from '@/entities/tax-class/tax-class.service';
import RefundService from '@/entities/refund/refund.service';
// jhipster-needle-add-entity-service-to-main-import - JHipster will import entities services here

/* tslint:enable */
Vue.config.productionTip = false;
config.initVueApp(Vue);
config.initFortAwesome(Vue);
bootstrapVueConfig.initBootstrapVue(Vue);
Vue.use(Vue2Filters);
Vue.use(ToastPlugin);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('jhi-item-count', JhiItemCountComponent);
Vue.component('jhi-sort-indicator', JhiSortIndicatorComponent);
Vue.component('infinite-loading', InfiniteLoading);
const store = config.initVueXStore(Vue);

const loginService = new LoginService();
const accountService = new AccountService(store, router);

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/not-found');
  }

  if (to.meta && to.meta.authorities && to.meta.authorities.length > 0) {
    accountService.hasAnyAuthorityAndCheckAuth(to.meta.authorities).then(value => {
      if (!value) {
        sessionStorage.setItem('requested-url', to.fullPath);
        next('/forbidden');
      } else {
        next();
      }
    });
  } else {
    // no authorities, so just proceed
    next();
  }
});

/* tslint:disable */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  provide: {
    loginService: () => loginService,
    activateService: () => new ActivateService(),
    registerService: () => new RegisterService(),
    userService: () => new UserManagementService(),
    healthService: () => new HealthService(),
    configurationService: () => new ConfigurationService(),
    logsService: () => new LogsService(),
    metricsService: () => new MetricsService(),

    userOAuth2Service: () => new UserOAuth2Service(),
    buyerService: () => new BuyerService(),
    productService: () => new ProductService(),
    productImageService: () => new ProductImageService(),
    productTagService: () => new ProductTagService(),
    productCategoryService: () => new ProductCategoryService(),
    productAttributeService: () => new ProductAttributeService(),
    productAttributeTermService: () => new ProductAttributeTermService(),
    productReviewService: () => new ProductReviewService(),
    productVariationService: () => new ProductVariationService(),
    productShippingClassService: () => new ProductShippingClassService(),
    couponService: () => new CouponService(),
    itemService: () => new ItemService(),
    productOrderService: () => new ProductOrderService(),
    addressService: () => new AddressService(),
    notificationService: () => new NotificationService(),
    invoiceService: () => new InvoiceService(),
    transactionService: () => new TransactionService(),
    taxRateService: () => new TaxRateService(),
    taxClassService: () => new TaxClassService(),
    refundService: () => new RefundService(),
    // jhipster-needle-add-entity-service-to-main - JHipster will import entities services here
    accountService: () => accountService,
  },
  store,
});
