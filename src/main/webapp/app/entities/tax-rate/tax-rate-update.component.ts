import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, numeric } from 'vuelidate/lib/validators';

import TaxClassService from '@/entities/tax-class/tax-class.service';
import { ITaxClass } from '@/shared/model/tax-class.model';

import { ITaxRate, TaxRate } from '@/shared/model/tax-rate.model';
import TaxRateService from './tax-rate.service';

const validations: any = {
  taxRate: {
    country: {
      required,
    },
    state: {
      required,
    },
    postcode: {
      required,
    },
    city: {
      required,
    },
    rate: {
      required,
    },
    name: {
      required,
    },
    shipping: {
      required,
    },
    compound: {
      required,
    },
    priority: {
      required,
      numeric,
    },
    taxClass: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class TaxRateUpdate extends Vue {
  @Inject('taxRateService') private taxRateService: () => TaxRateService;
  public taxRate: ITaxRate = new TaxRate();

  @Inject('taxClassService') private taxClassService: () => TaxClassService;

  public taxClasses: ITaxClass[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.taxRateId) {
        vm.retrieveTaxRate(to.params.taxRateId);
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
    if (this.taxRate.id) {
      this.taxRateService()
        .update(this.taxRate)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TaxRate is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.taxRateService()
        .create(this.taxRate)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A TaxRate is created with identifier ' + param.id;
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

  public retrieveTaxRate(taxRateId): void {
    this.taxRateService()
      .find(taxRateId)
      .then(res => {
        this.taxRate = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.taxClassService()
      .retrieve()
      .then(res => {
        this.taxClasses = res.data;
      });
  }
}
