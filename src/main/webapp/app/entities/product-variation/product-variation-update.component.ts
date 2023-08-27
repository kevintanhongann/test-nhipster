import { Component, Vue, Inject } from 'vue-property-decorator';

import { decimal, required } from 'vuelidate/lib/validators';

import ProductService from '@/entities/product/product.service';
import { IProduct } from '@/shared/model/product.model';

import { IProductVariation, ProductVariation } from '@/shared/model/product-variation.model';
import ProductVariationService from './product-variation.service';

const validations: any = {
  productVariation: {
    regularPrice: {
      required,
      decimal,
    },
    salePrice: {
      required,
      decimal,
    },
    dateOnSaleFrom: {
      required,
    },
    dateOnSaleTo: {
      required,
    },
    virtual: {
      required,
    },
    downloadable: {
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
export default class ProductVariationUpdate extends Vue {
  @Inject('productVariationService') private productVariationService: () => ProductVariationService;
  public productVariation: IProductVariation = new ProductVariation();

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productVariationId) {
        vm.retrieveProductVariation(to.params.productVariationId);
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
    if (this.productVariation.id) {
      this.productVariationService()
        .update(this.productVariation)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductVariation is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.productVariationService()
        .create(this.productVariation)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductVariation is created with identifier ' + param.id;
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

  public retrieveProductVariation(productVariationId): void {
    this.productVariationService()
      .find(productVariationId)
      .then(res => {
        this.productVariation = res;
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
