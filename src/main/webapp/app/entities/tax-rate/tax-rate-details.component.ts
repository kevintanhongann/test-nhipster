import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITaxRate } from '@/shared/model/tax-rate.model';
import TaxRateService from './tax-rate.service';

@Component
export default class TaxRateDetails extends Vue {
  @Inject('taxRateService') private taxRateService: () => TaxRateService;
  public taxRate: ITaxRate = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.taxRateId) {
        vm.retrieveTaxRate(to.params.taxRateId);
      }
    });
  }

  public retrieveTaxRate(taxRateId) {
    this.taxRateService()
      .find(taxRateId)
      .then(res => {
        this.taxRate = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
