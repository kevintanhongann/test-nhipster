import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import TaxRateService from '@/entities/tax-rate/tax-rate.service';
import { ITaxRate } from '@/shared/model/tax-rate.model';

import ProductService from '@/entities/product/product.service';
import { IProduct } from '@/shared/model/product.model';

import { ITaxClass, TaxClass } from '@/shared/model/tax-class.model';
import TaxClassService from './tax-class.service';

const validations: any = {
  taxClass: {
    name: {
      required,
    },
    slug: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class TaxClassUpdate extends Vue {
  @Inject('taxClassService') private taxClassService: () => TaxClassService;
  public taxClass: ITaxClass = new TaxClass();

  @Inject('taxRateService') private taxRateService: () => TaxRateService;

  public taxRates: ITaxRate[] = [];

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.taxClassId) {
        vm.retrieveTaxClass(to.params.taxClassId);
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
    if (this.taxClass.id) {
      this.taxClassService()
        .update(this.taxClass)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TaxClass is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.taxClassService()
        .create(this.taxClass)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TaxClass is created with identifier ' + param.id;
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

  public retrieveTaxClass(taxClassId): void {
    this.taxClassService()
      .find(taxClassId)
      .then(res => {
        this.taxClass = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.taxRateService()
      .retrieve()
      .then(res => {
        this.taxRates = res.data;
      });
    this.productService()
      .retrieve()
      .then(res => {
        this.products = res.data;
      });
  }
}
