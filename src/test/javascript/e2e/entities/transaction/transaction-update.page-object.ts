import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class TransactionUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.transaction.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  codeInput: ElementFinder = element(by.css('input#transaction-code'));

  amountInput: ElementFinder = element(by.css('input#transaction-amount'));

  statusSelect = element(by.css('select#transaction-status'));
}
