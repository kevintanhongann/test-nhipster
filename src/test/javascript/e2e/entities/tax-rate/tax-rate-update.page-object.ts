import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class TaxRateUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.taxRate.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  countryInput: ElementFinder = element(by.css('input#tax-rate-country'));

  stateInput: ElementFinder = element(by.css('input#tax-rate-state'));

  postcodeInput: ElementFinder = element(by.css('input#tax-rate-postcode'));

  cityInput: ElementFinder = element(by.css('input#tax-rate-city'));

  rateInput: ElementFinder = element(by.css('input#tax-rate-rate'));

  nameInput: ElementFinder = element(by.css('input#tax-rate-name'));

  shippingInput: ElementFinder = element(by.css('input#tax-rate-shipping'));

  compoundInput: ElementFinder = element(by.css('input#tax-rate-compound'));

  priorityInput: ElementFinder = element(by.css('input#tax-rate-priority'));

  taxClassSelect = element(by.css('select#tax-rate-taxClass'));
}
