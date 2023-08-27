import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class CouponUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.coupon.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  codeInput: ElementFinder = element(by.css('input#coupon-code'));

  amountInput: ElementFinder = element(by.css('input#coupon-amount'));

  discountTypeSelect = element(by.css('select#coupon-discountType'));

  descriptionInput: ElementFinder = element(by.css('input#coupon-description'));

  expiryInput: ElementFinder = element(by.css('input#coupon-expiry'));

  individualUseInput: ElementFinder = element(by.css('input#coupon-individualUse'));

  usageLimitInput: ElementFinder = element(by.css('input#coupon-usageLimit'));

  usageLimitPerUserInput: ElementFinder = element(by.css('input#coupon-usageLimitPerUser'));

  freeShippingInput: ElementFinder = element(by.css('input#coupon-freeShipping'));

  minimumAmountInput: ElementFinder = element(by.css('input#coupon-minimumAmount'));

  maximumAmountInput: ElementFinder = element(by.css('input#coupon-maximumAmount'));
}
