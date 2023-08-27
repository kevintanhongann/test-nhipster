import { Component, Vue, Inject } from 'vue-property-decorator';

import { IItem } from '@/shared/model/item.model';
import ItemService from './item.service';

@Component
export default class ItemDetails extends Vue {
  @Inject('itemService') private itemService: () => ItemService;
  public item: IItem = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.itemId) {
        vm.retrieveItem(to.params.itemId);
      }
    });
  }

  public retrieveItem(itemId) {
    this.itemService()
      .find(itemId)
      .then(res => {
        this.item = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
