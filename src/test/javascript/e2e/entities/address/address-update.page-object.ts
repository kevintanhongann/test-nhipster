import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class AddressUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.address.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  address1Input: ElementFinder = element(by.css('input#address-address1'));

  address2Input: ElementFinder = element(by.css('input#address-address2'));

  cityInput: ElementFinder = element(by.css('input#address-city'));

  stateInput: ElementFinder = element(by.css('input#address-state'));

  countryInput: ElementFinder = element(by.css('input#address-country'));
}
