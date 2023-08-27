import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import UserService from '@/admin/user-management/user-management.service';

import AddressService from '@/entities/address/address.service';
import { IAddress } from '@/shared/model/address.model';

import { IBuyer, Buyer } from '@/shared/model/buyer.model';
import BuyerService from './buyer.service';

const validations: any = {
  buyer: {
    name: {
      required,
    },
    phone: {
      required,
    },
    avatarUrl: {},
    user: {
      required,
    },
    address: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class BuyerUpdate extends Vue {
  @Inject('buyerService') private buyerService: () => BuyerService;
  public buyer: IBuyer = new Buyer();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];

  @Inject('addressService') private addressService: () => AddressService;

  public addresses: IAddress[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.buyerId) {
        vm.retrieveBuyer(to.params.buyerId);
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
    if (this.buyer.id) {
      this.buyerService()
        .update(this.buyer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Buyer is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.buyerService()
        .create(this.buyer)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Buyer is created with identifier ' + param.id;
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

  public retrieveBuyer(buyerId): void {
    this.buyerService()
      .find(buyerId)
      .then(res => {
        this.buyer = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
    this.addressService()
      .retrieve()
      .then(res => {
        this.addresses = res.data;
      });
  }
}
