import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import ProductAttributeTermService from '@/entities/product-attribute-term/product-attribute-term.service';
import { IProductAttributeTerm } from '@/shared/model/product-attribute-term.model';

import ProductService from '@/entities/product/product.service';
import { IProduct } from '@/shared/model/product.model';

import { IProductAttribute, ProductAttribute } from '@/shared/model/product-attribute.model';
import ProductAttributeService from './product-attribute.service';

const validations: any = {
  productAttribute: {
    name: {
      required,
    },
    slug: {
      required,
    },
    type: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class ProductAttributeUpdate extends Vue {
  @Inject('productAttributeService') private productAttributeService: () => ProductAttributeService;
  public productAttribute: IProductAttribute = new ProductAttribute();

  @Inject('productAttributeTermService') private productAttributeTermService: () => ProductAttributeTermService;

  public productAttributeTerms: IProductAttributeTerm[] = [];

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productAttributeId) {
        vm.retrieveProductAttribute(to.params.productAttributeId);
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
    if (this.productAttribute.id) {
      this.productAttributeService()
        .update(this.productAttribute)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductAttribute is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.productAttributeService()
        .create(this.productAttribute)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductAttribute is created with identifier ' + param.id;
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

  public retrieveProductAttribute(productAttributeId): void {
    this.productAttributeService()
      .find(productAttributeId)
      .then(res => {
        this.productAttribute = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.productAttributeTermService()
      .retrieve()
      .then(res => {
        this.productAttributeTerms = res.data;
      });
    this.productService()
      .retrieve()
      .then(res => {
        this.products = res.data;
      });
  }
}
