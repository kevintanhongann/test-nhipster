import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, decimal } from 'vuelidate/lib/validators';

import ProductOrderService from '@/entities/product-order/product-order.service';
import { IProductOrder } from '@/shared/model/product-order.model';

import RefundService from '@/entities/refund/refund.service';
import { IRefund } from '@/shared/model/refund.model';

import { ITransaction, Transaction } from '@/shared/model/transaction.model';
import TransactionService from './transaction.service';

const validations: any = {
  transaction: {
    code: {
      required,
    },
    amount: {
      required,
      decimal,
    },
    status: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class TransactionUpdate extends Vue {
  @Inject('transactionService') private transactionService: () => TransactionService;
  public transaction: ITransaction = new Transaction();

  @Inject('productOrderService') private productOrderService: () => ProductOrderService;

  public productOrders: IProductOrder[] = [];

  @Inject('refundService') private refundService: () => RefundService;

  public refunds: IRefund[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.transactionId) {
        vm.retrieveTransaction(to.params.transactionId);
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
    if (this.transaction.id) {
      this.transactionService()
        .update(this.transaction)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Transaction is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.transactionService()
        .create(this.transaction)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Transaction is created with identifier ' + param.id;
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

  public retrieveTransaction(transactionId): void {
    this.transactionService()
      .find(transactionId)
      .then(res => {
        this.transaction = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.productOrderService()
      .retrieve()
      .then(res => {
        this.productOrders = res.data;
      });
    this.refundService()
      .retrieve()
      .then(res => {
        this.refunds = res.data;
      });
  }
}
