import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minValue, decimal } from 'vuelidate/lib/validators';

import ProductOrderService from '@/entities/product-order/product-order.service';
import { IProductOrder } from '@/shared/model/product-order.model';

import { IItem, Item } from '@/shared/model/item.model';
import ItemService from './item.service';

const validations: any = {
  item: {
    quantity: {
      required,
      numeric,
      min: minValue(0),
    },
    totalPrice: {
      required,
      decimal,
      min: minValue(0),
    },
  },
};

@Component({
  validations,
})
export default class ItemUpdate extends Vue {
  @Inject('itemService') private itemService: () => ItemService;
  public item: IItem = new Item();

  @Inject('productOrderService') private productOrderService: () => ProductOrderService;

  public productOrders: IProductOrder[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.itemId) {
        vm.retrieveItem(to.params.itemId);
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
    if (this.item.id) {
      this.itemService()
        .update(this.item)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Item is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.itemService()
        .create(this.item)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Item is created with identifier ' + param.id;
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

  public retrieveItem(itemId): void {
    this.itemService()
      .find(itemId)
      .then(res => {
        this.item = res;
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
  }
}
