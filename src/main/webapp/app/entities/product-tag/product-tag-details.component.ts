import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProductTag } from '@/shared/model/product-tag.model';
import ProductTagService from './product-tag.service';

@Component
export default class ProductTagDetails extends Vue {
  @Inject('productTagService') private productTagService: () => ProductTagService;
  public productTag: IProductTag = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productTagId) {
        vm.retrieveProductTag(to.params.productTagId);
      }
    });
  }

  public retrieveProductTag(productTagId) {
    this.productTagService()
      .find(productTagId)
      .then(res => {
        this.productTag = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
