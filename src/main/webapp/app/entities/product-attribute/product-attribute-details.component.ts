import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProductAttribute } from '@/shared/model/product-attribute.model';
import ProductAttributeService from './product-attribute.service';

@Component
export default class ProductAttributeDetails extends Vue {
  @Inject('productAttributeService') private productAttributeService: () => ProductAttributeService;
  public productAttribute: IProductAttribute = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productAttributeId) {
        vm.retrieveProductAttribute(to.params.productAttributeId);
      }
    });
  }

  public retrieveProductAttribute(productAttributeId) {
    this.productAttributeService()
      .find(productAttributeId)
      .then(res => {
        this.productAttribute = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
