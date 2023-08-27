import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ProductImageUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.productImage.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  filenameInput: ElementFinder = element(by.css('input#product-image-filename'));

  urlInput: ElementFinder = element(by.css('input#product-image-url'));

  mimeTypeInput: ElementFinder = element(by.css('input#product-image-mimeType'));

  productSelect = element(by.css('select#product-image-product'));
}
