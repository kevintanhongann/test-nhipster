import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, numeric } from 'vuelidate/lib/validators';

import ProductAttributeService from '@/entities/product-attribute/product-attribute.service';
import { IProductAttribute } from '@/shared/model/product-attribute.model';

import { IProductAttributeTerm, ProductAttributeTerm } from '@/shared/model/product-attribute-term.model';
import ProductAttributeTermService from './product-attribute-term.service';

const validations: any = {
  productAttributeTerm: {
    name: {
      required,
    },
    slug: {
      required,
    },
    description: {
      required,
    },
    menuOrder: {
      required,
      numeric,
    },
    productAttribute: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class ProductAttributeTermUpdate extends Vue {
  @Inject('productAttributeTermService') private productAttributeTermService: () => ProductAttributeTermService;
  public productAttributeTerm: IProductAttributeTerm = new ProductAttributeTerm();

  @Inject('productAttributeService') private productAttributeService: () => ProductAttributeService;

  public productAttributes: IProductAttribute[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productAttributeTermId) {
        vm.retrieveProductAttributeTerm(to.params.productAttributeTermId);
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
    if (this.productAttributeTerm.id) {
      this.productAttributeTermService()
        .update(this.productAttributeTerm)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductAttributeTerm is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.productAttributeTermService()
        .create(this.productAttributeTerm)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductAttributeTerm is created with identifier ' + param.id;
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

  public retrieveProductAttributeTerm(productAttributeTermId): void {
    this.productAttributeTermService()
      .find(productAttributeTermId)
      .then(res => {
        this.productAttributeTerm = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.productAttributeService()
      .retrieve()
      .then(res => {
        this.productAttributes = res.data;
      });
  }
}
