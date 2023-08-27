import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class BuyerUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.buyer.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#buyer-name'));

  phoneInput: ElementFinder = element(by.css('input#buyer-phone'));

  avatarUrlInput: ElementFinder = element(by.css('input#buyer-avatarUrl'));

  userSelect = element(by.css('select#buyer-user'));

  addressSelect = element(by.css('select#buyer-address'));
}
