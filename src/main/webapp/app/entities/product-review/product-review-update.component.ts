import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, numeric } from 'vuelidate/lib/validators';

import ProductService from '@/entities/product/product.service';
import { IProduct } from '@/shared/model/product.model';

import { IProductReview, ProductReview } from '@/shared/model/product-review.model';
import ProductReviewService from './product-review.service';

const validations: any = {
  productReview: {
    reviewerName: {
      required,
    },
    reviewerEmail: {
      required,
    },
    review: {
      required,
    },
    rating: {
      required,
      numeric,
    },
    status: {
      required,
    },
    product: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class ProductReviewUpdate extends Vue {
  @Inject('productReviewService') private productReviewService: () => ProductReviewService;
  public productReview: IProductReview = new ProductReview();

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productReviewId) {
        vm.retrieveProductReview(to.params.productReviewId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.productReview.id) {
      this.productReviewService()
        .update(this.productReview)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductReview is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.productReviewService()
        .create(this.productReview)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductReview is created with identifier ' + param.id;
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    }
  }

  public retrieveProductReview(productReviewId): void {
    this.productReviewService()
      .find(productReviewId)
      .then(res => {
        this.productReview = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.productService()
      .retrieve()
      .then(res => {
        this.products = res.data;
      });
  }
}
