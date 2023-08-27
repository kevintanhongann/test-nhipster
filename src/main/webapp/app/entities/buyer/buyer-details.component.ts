import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBuyer } from '@/shared/model/buyer.model';
import BuyerService from './buyer.service';

@Component
export default class BuyerDetails extends Vue {
  @Inject('buyerService') private buyerService: () => BuyerService;
  public buyer: IBuyer = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.buyerId) {
        vm.retrieveBuyer(to.params.buyerId);
      }
    });
  }

  public retrieveBuyer(buyerId) {
    this.buyerService()
      .find(buyerId)
      .then(res => {
        this.buyer = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
