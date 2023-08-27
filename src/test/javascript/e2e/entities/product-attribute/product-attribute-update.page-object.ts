import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ProductAttributeUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.productAttribute.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#product-attribute-name'));

  slugInput: ElementFinder = element(by.css('input#product-attribute-slug'));

  typeInput: ElementFinder = element(by.css('input#product-attribute-type'));

  productSelect = element(by.css('select#product-attribute-product'));
}
