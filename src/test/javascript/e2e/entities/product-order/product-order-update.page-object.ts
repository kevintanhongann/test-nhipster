import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ProductOrderUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.productOrder.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  placedDateInput: ElementFinder = element(by.css('input#product-order-placedDate'));

  statusSelect = element(by.css('select#product-order-status'));

  codeInput: ElementFinder = element(by.css('input#product-order-code'));

  invoiceIdInput: ElementFinder = element(by.css('input#product-order-invoiceId'));

  deliveryOptionSelect = element(by.css('select#product-order-deliveryOption'));
  transactionSelect = element(by.css('select#product-order-transaction'));

  userSelect = element(by.css('select#product-order-user'));
}
