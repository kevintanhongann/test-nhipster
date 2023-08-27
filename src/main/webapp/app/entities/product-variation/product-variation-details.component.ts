import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProductVariation } from '@/shared/model/product-variation.model';
import ProductVariationService from './product-variation.service';

@Component
export default class ProductVariationDetails extends Vue {
  @Inject('productVariationService') private productVariationService: () => ProductVariationService;
  public productVariation: IProductVariation = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productVariationId) {
        vm.retrieveProductVariation(to.params.productVariationId);
      }
    });
  }

  public retrieveProductVariation(productVariationId) {
    this.productVariationService()
      .find(productVariationId)
      .then(res => {
        this.productVariation = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
