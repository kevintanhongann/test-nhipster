import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ProductCategoryUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.productCategory.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#product-category-name'));

  slugInput: ElementFinder = element(by.css('input#product-category-slug'));

  descriptionInput: ElementFinder = element(by.css('input#product-category-description'));

  productSelect = element(by.css('select#product-category-product'));
}
