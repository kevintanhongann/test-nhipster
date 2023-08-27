import { Component, Vue, Inject } from 'vue-property-decorator';

import { decimal, required } from 'vuelidate/lib/validators';

import TransactionService from '@/entities/transaction/transaction.service';
import { ITransaction } from '@/shared/model/transaction.model';

import UserService from '@/admin/user-management/user-management.service';

import { IRefund, Refund } from '@/shared/model/refund.model';
import RefundService from './refund.service';

const validations: any = {
  refund: {
    amount: {
      required,
      decimal,
    },
    reason: {
      required,
    },
    orderCode: {
      required,
    },
    status: {
      required,
    },
    transaction: {
      required,
    },
    user: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class RefundUpdate extends Vue {
  @Inject('refundService') private refundService: () => RefundService;
  public refund: IRefund = new Refund();

  @Inject('transactionService') private transactionService: () => TransactionService;

  public transactions: ITransaction[] = [];

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.refundId) {
        vm.retrieveRefund(to.params.refundId);
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
    if (this.refund.id) {
      this.refundService()
        .update(this.refund)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Refund is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.refundService()
        .create(this.refund)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Refund is created with identifier ' + param.id;
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

  public retrieveRefund(refundId): void {
    this.refundService()
      .find(refundId)
      .then(res => {
        this.refund = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.transactionService()
      .retrieve()
      .then(res => {
        this.transactions = res.data;
      });
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }
}
