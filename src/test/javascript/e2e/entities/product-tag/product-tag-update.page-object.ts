import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ProductTagUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.productTag.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#product-tag-name'));

  slugInput: ElementFinder = element(by.css('input#product-tag-slug'));

  descriptionInput: ElementFinder = element(by.css('input#product-tag-description'));

  productSelect = element(by.css('select#product-tag-product'));
}
