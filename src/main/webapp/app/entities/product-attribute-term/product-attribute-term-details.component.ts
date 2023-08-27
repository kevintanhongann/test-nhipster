import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProductAttributeTerm } from '@/shared/model/product-attribute-term.model';
import ProductAttributeTermService from './product-attribute-term.service';

@Component
export default class ProductAttributeTermDetails extends Vue {
  @Inject('productAttributeTermService') private productAttributeTermService: () => ProductAttributeTermService;
  public productAttributeTerm: IProductAttributeTerm = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productAttributeTermId) {
        vm.retrieveProductAttributeTerm(to.params.productAttributeTermId);
      }
    });
  }

  public retrieveProductAttributeTerm(productAttributeTermId) {
    this.productAttributeTermService()
      .find(productAttributeTermId)
      .then(res => {
        this.productAttributeTerm = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
