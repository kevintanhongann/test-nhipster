import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProductReview } from '@/shared/model/product-review.model';
import ProductReviewService from './product-review.service';

@Component
export default class ProductReviewDetails extends Vue {
  @Inject('productReviewService') private productReviewService: () => ProductReviewService;
  public productReview: IProductReview = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productReviewId) {
        vm.retrieveProductReview(to.params.productReviewId);
      }
    });
  }

  public retrieveProductReview(productReviewId) {
    this.productReviewService()
      .find(productReviewId)
      .then(res => {
        this.productReview = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
