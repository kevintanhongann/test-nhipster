import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import TransactionService from '@/entities/transaction/transaction.service';
import { ITransaction } from '@/shared/model/transaction.model';

import ItemService from '@/entities/item/item.service';
import { IItem } from '@/shared/model/item.model';

import UserService from '@/admin/user-management/user-management.service';

import { IProductOrder, ProductOrder } from '@/shared/model/product-order.model';
import ProductOrderService from './product-order.service';

const validations: any = {
  productOrder: {
    placedDate: {
      required,
    },
    status: {
      required,
    },
    code: {
      required,
    },
    invoiceId: {},
    deliveryOption: {
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
export default class ProductOrderUpdate extends Vue {
  @Inject('productOrderService') private productOrderService: () => ProductOrderService;
  public productOrder: IProductOrder = new ProductOrder();

  @Inject('transactionService') private transactionService: () => TransactionService;

  public transactions: ITransaction[] = [];

  @Inject('itemService') private itemService: () => ItemService;

  public items: IItem[] = [];

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productOrderId) {
        vm.retrieveProductOrder(to.params.productOrderId);
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
    if (this.productOrder.id) {
      this.productOrderService()
        .update(this.productOrder)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductOrder is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.productOrderService()
        .create(this.productOrder)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A ProductOrder is created with identifier ' + param.id;
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

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.productOrder[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.productOrder[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.productOrder[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.productOrder[field] = null;
    }
  }

  public retrieveProductOrder(productOrderId): void {
    this.productOrderService()
      .find(productOrderId)
      .then(res => {
        res.placedDate = new Date(res.placedDate);
        this.productOrder = res;
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
    this.itemService()
      .retrieve()
      .then(res => {
        this.items = res.data;
      });
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }
}
