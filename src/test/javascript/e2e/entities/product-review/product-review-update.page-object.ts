import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ProductReviewUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('nhipstertestApp.productReview.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  reviewerNameInput: ElementFinder = element(by.css('input#product-review-reviewerName'));

  reviewerEmailInput: ElementFinder = element(by.css('input#product-review-reviewerEmail'));

  reviewInput: ElementFinder = element(by.css('input#product-review-review'));

  ratingInput: ElementFinder = element(by.css('input#product-review-rating'));

  statusSelect = element(by.css('select#product-review-status'));
  productSelect = element(by.css('select#product-review-product'));
}
