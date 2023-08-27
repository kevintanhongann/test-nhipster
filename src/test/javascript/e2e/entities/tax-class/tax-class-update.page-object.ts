import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class TaxClassUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.taxClass.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#tax-class-name'));

  slugInput: ElementFinder = element(by.css('input#tax-class-slug'));
}
