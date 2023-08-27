import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ItemUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.item.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  quantityInput: ElementFinder = element(by.css('input#item-quantity'));

  totalPriceInput: ElementFinder = element(by.css('input#item-totalPrice'));

  productOrderSelect = element(by.css('select#item-productOrder'));
}
