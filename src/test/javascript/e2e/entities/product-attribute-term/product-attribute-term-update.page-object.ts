import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ProductAttributeTermUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.productAttributeTerm.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#product-attribute-term-name'));

  slugInput: ElementFinder = element(by.css('input#product-attribute-term-slug'));

  descriptionInput: ElementFinder = element(by.css('input#product-attribute-term-description'));

  menuOrderInput: ElementFinder = element(by.css('input#product-attribute-term-menuOrder'));

  productAttributeSelect = element(by.css('select#product-attribute-term-productAttribute'));
}
