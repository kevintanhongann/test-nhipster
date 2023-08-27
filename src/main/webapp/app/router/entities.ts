import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Buyer = () => import('@/entities/buyer/buyer.vue');
// prettier-ignore
const BuyerUpdate = () => import('@/entities/buyer/buyer-update.vue');
// prettier-ignore
const BuyerDetails = () => import('@/entities/buyer/buyer-details.vue');
// prettier-ignore
const Product = () => import('@/entities/product/product.vue');
// prettier-ignore
const ProductUpdate = () => import('@/entities/product/product-update.vue');
// prettier-ignore
const ProductDetails = () => import('@/entities/product/product-details.vue');
// prettier-ignore
const ProductImage = () => import('@/entities/product-image/product-image.vue');
// prettier-ignore
const ProductImageUpdate = () => import('@/entities/product-image/product-image-update.vue');
// prettier-ignore
const ProductImageDetails = () => import('@/entities/product-image/product-image-details.vue');
// prettier-ignore
const ProductTag = () => import('@/entities/product-tag/product-tag.vue');
// prettier-ignore
const ProductTagUpdate = () => import('@/entities/product-tag/product-tag-update.vue');
// prettier-ignore
const ProductTagDetails = () => import('@/entities/product-tag/product-tag-details.vue');
// prettier-ignore
const ProductCategory = () => import('@/entities/product-category/product-category.vue');
// prettier-ignore
const ProductCategoryUpdate = () => import('@/entities/product-category/product-category-update.vue');
// prettier-ignore
const ProductCategoryDetails = () => import('@/entities/product-category/product-category-details.vue');
// prettier-ignore
const ProductAttribute = () => import('@/entities/product-attribute/product-attribute.vue');
// prettier-ignore
const ProductAttributeUpdate = () => import('@/entities/product-attribute/product-attribute-update.vue');
// prettier-ignore
const ProductAttributeDetails = () => import('@/entities/product-attribute/product-attribute-details.vue');
// prettier-ignore
const ProductAttributeTerm = () => import('@/entities/product-attribute-term/product-attribute-term.vue');
// prettier-ignore
const ProductAttributeTermUpdate = () => import('@/entities/product-attribute-term/product-attribute-term-update.vue');
// prettier-ignore
const ProductAttributeTermDetails = () => import('@/entities/product-attribute-term/product-attribute-term-details.vue');
// prettier-ignore
const ProductReview = () => import('@/entities/product-review/product-review.vue');
// prettier-ignore
const ProductReviewUpdate = () => import('@/entities/product-review/product-review-update.vue');
// prettier-ignore
const ProductReviewDetails = () => import('@/entities/product-review/product-review-details.vue');
// prettier-ignore
const ProductVariation = () => import('@/entities/product-variation/product-variation.vue');
// prettier-ignore
const ProductVariationUpdate = () => import('@/entities/product-variation/product-variation-update.vue');
// prettier-ignore
const ProductVariationDetails = () => import('@/entities/product-variation/product-variation-details.vue');
// prettier-ignore
const ProductShippingClass = () => import('@/entities/product-shipping-class/product-shipping-class.vue');
// prettier-ignore
const ProductShippingClassUpdate = () => import('@/entities/product-shipping-class/product-shipping-class-update.vue');
// prettier-ignore
const ProductShippingClassDetails = () => import('@/entities/product-shipping-class/product-shipping-class-details.vue');
// prettier-ignore
const Coupon = () => import('@/entities/coupon/coupon.vue');
// prettier-ignore
const CouponUpdate = () => import('@/entities/coupon/coupon-update.vue');
// prettier-ignore
const CouponDetails = () => import('@/entities/coupon/coupon-details.vue');
// prettier-ignore
const Item = () => import('@/entities/item/item.vue');
// prettier-ignore
const ItemUpdate = () => import('@/entities/item/item-update.vue');
// prettier-ignore
const ItemDetails = () => import('@/entities/item/item-details.vue');
// prettier-ignore
const ProductOrder = () => import('@/entities/product-order/product-order.vue');
// prettier-ignore
const ProductOrderUpdate = () => import('@/entities/product-order/product-order-update.vue');
// prettier-ignore
const ProductOrderDetails = () => import('@/entities/product-order/product-order-details.vue');
// prettier-ignore
const Address = () => import('@/entities/address/address.vue');
// prettier-ignore
const AddressUpdate = () => import('@/entities/address/address-update.vue');
// prettier-ignore
const AddressDetails = () => import('@/entities/address/address-details.vue');
// prettier-ignore
const Notification = () => import('@/entities/notification/notification.vue');
// prettier-ignore
const NotificationUpdate = () => import('@/entities/notification/notification-update.vue');
// prettier-ignore
const NotificationDetails = () => import('@/entities/notification/notification-details.vue');
// prettier-ignore
const Invoice = () => import('@/entities/invoice/invoice.vue');
// prettier-ignore
const InvoiceUpdate = () => import('@/entities/invoice/invoice-update.vue');
// prettier-ignore
const InvoiceDetails = () => import('@/entities/invoice/invoice-details.vue');
// prettier-ignore
const Transaction = () => import('@/entities/transaction/transaction.vue');
// prettier-ignore
const TransactionUpdate = () => import('@/entities/transaction/transaction-update.vue');
// prettier-ignore
const TransactionDetails = () => import('@/entities/transaction/transaction-details.vue');
// prettier-ignore
const TaxRate = () => import('@/entities/tax-rate/tax-rate.vue');
// prettier-ignore
const TaxRateUpdate = () => import('@/entities/tax-rate/tax-rate-update.vue');
// prettier-ignore
const TaxRateDetails = () => import('@/entities/tax-rate/tax-rate-details.vue');
// prettier-ignore
const TaxClass = () => import('@/entities/tax-class/tax-class.vue');
// prettier-ignore
const TaxClassUpdate = () => import('@/entities/tax-class/tax-class-update.vue');
// prettier-ignore
const TaxClassDetails = () => import('@/entities/tax-class/tax-class-details.vue');
// prettier-ignore
const Refund = () => import('@/entities/refund/refund.vue');
// prettier-ignore
const RefundUpdate = () => import('@/entities/refund/refund-update.vue');
// prettier-ignore
const RefundDetails = () => import('@/entities/refund/refund-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/buyer',
    name: 'Buyer',
    component: Buyer,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/buyer/new',
    name: 'BuyerCreate',
    component: BuyerUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/buyer/:buyerId/edit',
    name: 'BuyerEdit',
    component: BuyerUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/buyer/:buyerId/view',
    name: 'BuyerView',
    component: BuyerDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/new',
    name: 'ProductCreate',
    component: ProductUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/:productId/edit',
    name: 'ProductEdit',
    component: ProductUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/:productId/view',
    name: 'ProductView',
    component: ProductDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-image',
    name: 'ProductImage',
    component: ProductImage,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-image/new',
    name: 'ProductImageCreate',
    component: ProductImageUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-image/:productImageId/edit',
    name: 'ProductImageEdit',
    component: ProductImageUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-image/:productImageId/view',
    name: 'ProductImageView',
    component: ProductImageDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-tag',
    name: 'ProductTag',
    component: ProductTag,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-tag/new',
    name: 'ProductTagCreate',
    component: ProductTagUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-tag/:productTagId/edit',
    name: 'ProductTagEdit',
    component: ProductTagUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-tag/:productTagId/view',
    name: 'ProductTagView',
    component: ProductTagDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-category',
    name: 'ProductCategory',
    component: ProductCategory,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-category/new',
    name: 'ProductCategoryCreate',
    component: ProductCategoryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-category/:productCategoryId/edit',
    name: 'ProductCategoryEdit',
    component: ProductCategoryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-category/:productCategoryId/view',
    name: 'ProductCategoryView',
    component: ProductCategoryDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-attribute',
    name: 'ProductAttribute',
    component: ProductAttribute,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-attribute/new',
    name: 'ProductAttributeCreate',
    component: ProductAttributeUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-attribute/:productAttributeId/edit',
    name: 'ProductAttributeEdit',
    component: ProductAttributeUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-attribute/:productAttributeId/view',
    name: 'ProductAttributeView',
    component: ProductAttributeDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-attribute-term',
    name: 'ProductAttributeTerm',
    component: ProductAttributeTerm,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-attribute-term/new',
    name: 'ProductAttributeTermCreate',
    component: ProductAttributeTermUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-attribute-term/:productAttributeTermId/edit',
    name: 'ProductAttributeTermEdit',
    component: ProductAttributeTermUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-attribute-term/:productAttributeTermId/view',
    name: 'ProductAttributeTermView',
    component: ProductAttributeTermDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-review',
    name: 'ProductReview',
    component: ProductReview,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-review/new',
    name: 'ProductReviewCreate',
    component: ProductReviewUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-review/:productReviewId/edit',
    name: 'ProductReviewEdit',
    component: ProductReviewUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-review/:productReviewId/view',
    name: 'ProductReviewView',
    component: ProductReviewDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-variation',
    name: 'ProductVariation',
    component: ProductVariation,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-variation/new',
    name: 'ProductVariationCreate',
    component: ProductVariationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-variation/:productVariationId/edit',
    name: 'ProductVariationEdit',
    component: ProductVariationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-variation/:productVariationId/view',
    name: 'ProductVariationView',
    component: ProductVariationDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-shipping-class',
    name: 'ProductShippingClass',
    component: ProductShippingClass,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-shipping-class/new',
    name: 'ProductShippingClassCreate',
    component: ProductShippingClassUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-shipping-class/:productShippingClassId/edit',
    name: 'ProductShippingClassEdit',
    component: ProductShippingClassUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-shipping-class/:productShippingClassId/view',
    name: 'ProductShippingClassView',
    component: ProductShippingClassDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/coupon',
    name: 'Coupon',
    component: Coupon,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/coupon/new',
    name: 'CouponCreate',
    component: CouponUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/coupon/:couponId/edit',
    name: 'CouponEdit',
    component: CouponUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/coupon/:couponId/view',
    name: 'CouponView',
    component: CouponDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/item',
    name: 'Item',
    component: Item,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/item/new',
    name: 'ItemCreate',
    component: ItemUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/item/:itemId/edit',
    name: 'ItemEdit',
    component: ItemUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/item/:itemId/view',
    name: 'ItemView',
    component: ItemDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-order',
    name: 'ProductOrder',
    component: ProductOrder,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-order/new',
    name: 'ProductOrderCreate',
    component: ProductOrderUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-order/:productOrderId/edit',
    name: 'ProductOrderEdit',
    component: ProductOrderUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product-order/:productOrderId/view',
    name: 'ProductOrderView',
    component: ProductOrderDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/address/new',
    name: 'AddressCreate',
    component: AddressUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/address/:addressId/edit',
    name: 'AddressEdit',
    component: AddressUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/address/:addressId/view',
    name: 'AddressView',
    component: AddressDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification',
    name: 'Notification',
    component: Notification,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification/new',
    name: 'NotificationCreate',
    component: NotificationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification/:notificationId/edit',
    name: 'NotificationEdit',
    component: NotificationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/notification/:notificationId/view',
    name: 'NotificationView',
    component: NotificationDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/invoice',
    name: 'Invoice',
    component: Invoice,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/invoice/new',
    name: 'InvoiceCreate',
    component: InvoiceUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/invoice/:invoiceId/edit',
    name: 'InvoiceEdit',
    component: InvoiceUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/invoice/:invoiceId/view',
    name: 'InvoiceView',
    component: InvoiceDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: Transaction,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/transaction/new',
    name: 'TransactionCreate',
    component: TransactionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/transaction/:transactionId/edit',
    name: 'TransactionEdit',
    component: TransactionUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/transaction/:transactionId/view',
    name: 'TransactionView',
    component: TransactionDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tax-rate',
    name: 'TaxRate',
    component: TaxRate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tax-rate/new',
    name: 'TaxRateCreate',
    component: TaxRateUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tax-rate/:taxRateId/edit',
    name: 'TaxRateEdit',
    component: TaxRateUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tax-rate/:taxRateId/view',
    name: 'TaxRateView',
    component: TaxRateDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tax-class',
    name: 'TaxClass',
    component: TaxClass,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tax-class/new',
    name: 'TaxClassCreate',
    component: TaxClassUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tax-class/:taxClassId/edit',
    name: 'TaxClassEdit',
    component: TaxClassUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tax-class/:taxClassId/view',
    name: 'TaxClassView',
    component: TaxClassDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/refund',
    name: 'Refund',
    component: Refund,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/refund/new',
    name: 'RefundCreate',
    component: RefundUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/refund/:refundId/edit',
    name: 'RefundEdit',
    component: RefundUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/refund/:refundId/view',
    name: 'RefundView',
    component: RefundDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
