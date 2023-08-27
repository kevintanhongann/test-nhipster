import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import ProductService from '@/entities/product/product.service';
import { IProduct } from '@/shared/model/product.model';

import { IProductShippingClass, ProductShippingClass } from '@/shared/model/product-shipping-class.model';
import ProductShippingClassService from './product-shipping-class.service';

const validations: any = {
  productShippingClass: {
    name: {
      required,
    },
    slug: {
      required,
    },
    description: {},
    count: {},
  },
};

@Component({
  validations,
})
export default class ProductShippingClassUpdate extends Vue {
  @Inject('productShippingClassService') private productShippingClassService: () => ProductShippingClassService;
  public productShippingClass: IProductShippingClass = new ProductShippingClass();

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productShippingClassId) {
        vm.retrieveProductShippingClass(to.params.productShippingClassId);
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
    if (this.productShippingClass.id) {
      this.productShippingClassService()
        .update(this.productShippingClass)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductShippingClass is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.productShippingClassService()
        .create(this.productShippingClass)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductShippingClass is created with identifier ' + param.id;
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

  public retrieveProductShippingClass(productShippingClassId): void {
    this.productShippingClassService()
      .find(productShippingClassId)
      .then(res => {
        this.productShippingClass = res;
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
