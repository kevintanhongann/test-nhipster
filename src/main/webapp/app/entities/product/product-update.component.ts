import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, decimal } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import ProductImageService from '@/entities/product-image/product-image.service';
import { IProductImage } from '@/shared/model/product-image.model';

import ProductAttributeService from '@/entities/product-attribute/product-attribute.service';
import { IProductAttribute } from '@/shared/model/product-attribute.model';

import ProductVariationService from '@/entities/product-variation/product-variation.service';
import { IProductVariation } from '@/shared/model/product-variation.model';

import ProductTagService from '@/entities/product-tag/product-tag.service';
import { IProductTag } from '@/shared/model/product-tag.model';

import ProductCategoryService from '@/entities/product-category/product-category.service';
import { IProductCategory } from '@/shared/model/product-category.model';

import ProductReviewService from '@/entities/product-review/product-review.service';
import { IProductReview } from '@/shared/model/product-review.model';

import ProductShippingClassService from '@/entities/product-shipping-class/product-shipping-class.service';
import { IProductShippingClass } from '@/shared/model/product-shipping-class.model';

import TaxClassService from '@/entities/tax-class/tax-class.service';
import { ITaxClass } from '@/shared/model/tax-class.model';

import { IProduct, Product } from '@/shared/model/product.model';
import ProductService from './product.service';

const validations: any = {
  product: {
    name: {
      required,
    },
    slug: {
      required,
    },
    skuNumber: {},
    description: {
      required,
    },
    shortDescription: {
      required,
    },
    regularPrice: {
      required,
      decimal,
    },
    salePrice: {
      required,
      decimal,
    },
    published: {
      required,
    },
    dateCreated: {
      required,
    },
    dateModified: {
      required,
    },
    featured: {
      required,
    },
    taxStatus: {
      required,
    },
    manageStock: {
      required,
    },
    stockStatus: {
      required,
    },
    soldIndividually: {
      required,
    },
    backOrders: {
      required,
    },
    weight: {
      required,
      decimal,
    },
    virtual: {
      required,
    },
    downloadable: {
      required,
    },
    downloadLimit: {},
    downloadExpiry: {},
    shippingRequired: {
      required,
    },
    shippingTaxable: {
      required,
    },
    parentId: {},
    purchaseNote: {
      required,
    },
    catalogVisibility: {
      required,
    },
    productShippingClass: {
      required,
    },
    taxClass: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class ProductUpdate extends Vue {
  @Inject('productService') private productService: () => ProductService;
  public product: IProduct = new Product();

  @Inject('productImageService') private productImageService: () => ProductImageService;

  public productImages: IProductImage[] = [];

  @Inject('productAttributeService') private productAttributeService: () => ProductAttributeService;

  public productAttributes: IProductAttribute[] = [];

  @Inject('productVariationService') private productVariationService: () => ProductVariationService;

  public productVariations: IProductVariation[] = [];

  @Inject('productTagService') private productTagService: () => ProductTagService;

  public productTags: IProductTag[] = [];

  @Inject('productCategoryService') private productCategoryService: () => ProductCategoryService;

  public productCategories: IProductCategory[] = [];

  @Inject('productReviewService') private productReviewService: () => ProductReviewService;

  public productReviews: IProductReview[] = [];

  @Inject('productShippingClassService') private productShippingClassService: () => ProductShippingClassService;

  public productShippingClasses: IProductShippingClass[] = [];

  @Inject('taxClassService') private taxClassService: () => TaxClassService;

  public taxClasses: ITaxClass[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productId) {
        vm.retrieveProduct(to.params.productId);
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
    if (this.product.id) {
      this.productService()
        .update(this.product)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Product is updated with identifier ' + param.id;
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.productService()
        .create(this.product)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = 'A Product is created with identifier ' + param.id;
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
      this.product[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.product[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.product[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.product[field] = null;
    }
  }

  public retrieveProduct(productId): void {
    this.productService()
      .find(productId)
      .then(res => {
        res.dateCreated = new Date(res.dateCreated);
        this.product = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.productImageService()
      .retrieve()
      .then(res => {
        this.productImages = res.data;
      });
    this.productAttributeService()
      .retrieve()
      .then(res => {
        this.productAttributes = res.data;
      });
    this.productVariationService()
      .retrieve()
      .then(res => {
        this.productVariations = res.data;
      });
    this.productTagService()
      .retrieve()
      .then(res => {
        this.productTags = res.data;
      });
    this.productCategoryService()
      .retrieve()
      .then(res => {
        this.productCategories = res.data;
      });
    this.productReviewService()
      .retrieve()
      .then(res => {
        this.productReviews = res.data;
      });
    this.productShippingClassService()
      .retrieve()
      .then(res => {
        this.productShippingClasses = res.data;
      });
    this.taxClassService()
      .retrieve()
      .then(res => {
        this.taxClasses = res.data;
      });
  }
}
