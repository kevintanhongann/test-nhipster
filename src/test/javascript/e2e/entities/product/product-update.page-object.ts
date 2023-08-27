import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ProductUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.product.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#product-name'));

  slugInput: ElementFinder = element(by.css('input#product-slug'));

  skuNumberInput: ElementFinder = element(by.css('input#product-skuNumber'));

  descriptionInput: ElementFinder = element(by.css('input#product-description'));

  shortDescriptionInput: ElementFinder = element(by.css('input#product-shortDescription'));

  regularPriceInput: ElementFinder = element(by.css('input#product-regularPrice'));

  salePriceInput: ElementFinder = element(by.css('input#product-salePrice'));

  publishedInput: ElementFinder = element(by.css('input#product-published'));

  dateCreatedInput: ElementFinder = element(by.css('input#product-dateCreated'));

  dateModifiedInput: ElementFinder = element(by.css('input#product-dateModified'));

  featuredInput: ElementFinder = element(by.css('input#product-featured'));

  taxStatusSelect = element(by.css('select#product-taxStatus'));

  manageStockInput: ElementFinder = element(by.css('input#product-manageStock'));

  stockStatusSelect = element(by.css('select#product-stockStatus'));

  soldIndividuallyInput: ElementFinder = element(by.css('input#product-soldIndividually'));

  backOrdersSelect = element(by.css('select#product-backOrders'));

  weightInput: ElementFinder = element(by.css('input#product-weight'));

  virtualInput: ElementFinder = element(by.css('input#product-virtual'));

  downloadableInput: ElementFinder = element(by.css('input#product-downloadable'));

  downloadLimitInput: ElementFinder = element(by.css('input#product-downloadLimit'));

  downloadExpiryInput: ElementFinder = element(by.css('input#product-downloadExpiry'));

  shippingRequiredInput: ElementFinder = element(by.css('input#product-shippingRequired'));

  shippingTaxableInput: ElementFinder = element(by.css('input#product-shippingTaxable'));

  parentIdInput: ElementFinder = element(by.css('input#product-parentId'));

  purchaseNoteInput: ElementFinder = element(by.css('input#product-purchaseNote'));

  catalogVisibilitySelect = element(by.css('select#product-catalogVisibility'));
  taxClassSelect = element(by.css('select#product-taxClass'));
}
