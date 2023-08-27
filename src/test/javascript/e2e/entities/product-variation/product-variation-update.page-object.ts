import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ProductVariationUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.productVariation.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  regularPriceInput: ElementFinder = element(by.css('input#product-variation-regularPrice'));

  salePriceInput: ElementFinder = element(by.css('input#product-variation-salePrice'));

  dateOnSaleFromInput: ElementFinder = element(by.css('input#product-variation-dateOnSaleFrom'));

  dateOnSaleToInput: ElementFinder = element(by.css('input#product-variation-dateOnSaleTo'));

  virtualInput: ElementFinder = element(by.css('input#product-variation-virtual'));

  downloadableInput: ElementFinder = element(by.css('input#product-variation-downloadable'));
  productSelect = element(by.css('select#product-variation-product'));
}
