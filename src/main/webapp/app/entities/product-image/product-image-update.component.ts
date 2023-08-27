import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import ProductService from '@/entities/product/product.service';
import { IProduct } from '@/shared/model/product.model';

import { IProductImage, ProductImage } from '@/shared/model/product-image.model';
import ProductImageService from './product-image.service';

const validations: any = {
  productImage: {
    filename: {
      required,
    },
    url: {
      required,
    },
    mimeType: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class ProductImageUpdate extends Vue {
  @Inject('productImageService') private productImageService: () => ProductImageService;
  public productImage: IProductImage = new ProductImage();

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productImageId) {
        vm.retrieveProductImage(to.params.productImageId);
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
    if (this.productImage.id) {
      this.productImageService()
        .update(this.productImage)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductImage is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.productImageService()
        .create(this.productImage)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductImage is created with identifier ' + param.id;
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

  public retrieveProductImage(productImageId): void {
    this.productImageService()
      .find(productImageId)
      .then(res => {
        this.productImage = res;
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
