import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import ProductService from '@/entities/product/product.service';
import { IProduct } from '@/shared/model/product.model';

import { IProductTag, ProductTag } from '@/shared/model/product-tag.model';
import ProductTagService from './product-tag.service';

const validations: any = {
  productTag: {
    name: {
      required,
    },
    slug: {
      required,
    },
    description: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class ProductTagUpdate extends Vue {
  @Inject('productTagService') private productTagService: () => ProductTagService;
  public productTag: IProductTag = new ProductTag();

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productTagId) {
        vm.retrieveProductTag(to.params.productTagId);
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
    if (this.productTag.id) {
      this.productTagService()
        .update(this.productTag)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductTag is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.productTagService()
        .create(this.productTag)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductTag is created with identifier ' + param.id;
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

  public retrieveProductTag(productTagId): void {
    this.productTagService()
      .find(productTagId)
      .then(res => {
        this.productTag = res;
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
