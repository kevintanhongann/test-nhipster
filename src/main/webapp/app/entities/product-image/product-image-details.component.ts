import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProductImage } from '@/shared/model/product-image.model';
import ProductImageService from './product-image.service';

@Component
export default class ProductImageDetails extends Vue {
  @Inject('productImageService') private productImageService: () => ProductImageService;
  public productImage: IProductImage = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productImageId) {
        vm.retrieveProductImage(to.params.productImageId);
      }
    });
  }

  public retrieveProductImage(productImageId) {
    this.productImageService()
      .find(productImageId)
      .then(res => {
        this.productImage = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
