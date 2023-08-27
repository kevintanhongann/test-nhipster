import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITaxClass } from '@/shared/model/tax-class.model';
import TaxClassService from './tax-class.service';

@Component
export default class TaxClassDetails extends Vue {
  @Inject('taxClassService') private taxClassService: () => TaxClassService;
  public taxClass: ITaxClass = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.taxClassId) {
        vm.retrieveTaxClass(to.params.taxClassId);
      }
    });
  }

  public retrieveTaxClass(taxClassId) {
    this.taxClassService()
      .find(taxClassId)
      .then(res => {
        this.taxClass = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
