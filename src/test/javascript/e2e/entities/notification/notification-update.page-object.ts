import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class NotificationUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.notification.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  detailsInput: ElementFinder = element(by.css('input#notification-details'));

  sentDateInput: ElementFinder = element(by.css('input#notification-sentDate'));

  formatSelect = element(by.css('select#notification-format'));

  googleNotificationIdInput: ElementFinder = element(by.css('input#notification-googleNotificationId'));

  productIdInput: ElementFinder = element(by.css('input#notification-productId'));

  readInput: ElementFinder = element(by.css('input#notification-read'));
  userSelect = element(by.css('select#notification-user'));
}
