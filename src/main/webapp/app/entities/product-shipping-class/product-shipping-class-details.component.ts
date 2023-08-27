import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProductShippingClass } from '@/shared/model/product-shipping-class.model';
import ProductShippingClassService from './product-shipping-class.service';

@Component
export default class ProductShippingClassDetails extends Vue {
  @Inject('productShippingClassService') private productShippingClassService: () => ProductShippingClassService;
  public productShippingClass: IProductShippingClass = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productShippingClassId) {
        vm.retrieveProductShippingClass(to.params.productShippingClassId);
      }
    });
  }

  public retrieveProductShippingClass(productShippingClassId) {
    this.productShippingClassService()
      .find(productShippingClassId)
      .then(res => {
        this.productShippingClass = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
