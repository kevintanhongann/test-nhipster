import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class RefundUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.refund.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  amountInput: ElementFinder = element(by.css('input#refund-amount'));

  reasonInput: ElementFinder = element(by.css('input#refund-reason'));

  orderCodeInput: ElementFinder = element(by.css('input#refund-orderCode'));

  statusSelect = element(by.css('select#refund-status'));
  transactionSelect = element(by.css('select#refund-transaction'));

  userSelect = element(by.css('select#refund-user'));
}
