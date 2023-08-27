import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ProductShippingClassUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.productShippingClass.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#product-shipping-class-name'));

  slugInput: ElementFinder = element(by.css('input#product-shipping-class-slug'));

  descriptionInput: ElementFinder = element(by.css('input#product-shipping-class-description'));

  countInput: ElementFinder = element(by.css('input#product-shipping-class-count'));

  productSelect = element(by.css('select#product-shipping-class-product'));
}
