/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import ProductReviewComponentsPage, { ProductReviewDeleteDialog } from './product-review.page-object';
import ProductReviewUpdatePage from './product-review-update.page-object';
import ProductReviewDetailsPage from './product-review-details.page-object';

import {
  clear,
  click,
  getRecordsCount,
  isVisible,
  selectLastOption,
  waitUntilAllDisplayed,
  waitUntilAnyDisplayed,
  waitUntilCount,
  waitUntilDisplayed,
  waitUntilHidden,
} from '../../util/utils';

const expect = chai.expect;

describe('ProductReview e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: ProductReviewUpdatePage;
  let detailsPage: ProductReviewDetailsPage;
  let listPage: ProductReviewComponentsPage;
  /*let deleteDialog: ProductReviewDeleteDialog;*/
  let beforeRecordsCount = 0;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    await navBarPage.login(username, password);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });

  it('should load ProductReviews', async () => {
    await navBarPage.getEntityPage('product-review');
    listPage = new ProductReviewComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create ProductReview page', async () => {
      await listPage.createButton.click();
      updatePage = new ProductReviewUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getText()).to.match(/Create or edit a ProductReview/);
    });

    /* it('should create and save ProductReviews', async () => {

      await updatePage.reviewerNameInput.sendKeys('reviewerName');
      expect(await updatePage.reviewerNameInput.getAttribute('value')).to.match(/reviewerName/);


      await updatePage.reviewerEmailInput.sendKeys('reviewerEmail');
      expect(await updatePage.reviewerEmailInput.getAttribute('value')).to.match(/reviewerEmail/);


      await updatePage.reviewInput.sendKeys('review');
      expect(await updatePage.reviewInput.getAttribute('value')).to.match(/review/);


      await updatePage.ratingInput.sendKeys('5');
      expect(await updatePage.ratingInput.getAttribute('value')).to.eq('5');


      await selectLastOption(updatePage.statusSelect);

      // await selectLastOption(updatePage.productSelect);

      expect(await updatePage.saveButton.isEnabled()).to.be.true;
      await updatePage.saveButton.click();

      await waitUntilHidden(updatePage.saveButton);
      expect(await isVisible(updatePage.saveButton)).to.be.false;

      await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      expect(await listPage.records.count()).to.eq(beforeRecordsCount + 1);
    });*/

    /*
    describe('Details, Update, Delete flow', () => {

      after(async () => {

        const deleteButton = listPage.getDeleteButton(listPage.records.first());
        await click(deleteButton);

        deleteDialog = new ProductReviewDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/nhipstertestApp.productReview.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details ProductReview page and fetch data', async () => {

        const detailsButton = listPage.getDetailsButton(listPage.records.first());
        await click(detailsButton);

        detailsPage = new ProductReviewDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit ProductReview page, fetch data and update', async () => {

        const editButton = listPage.getEditButton(listPage.records.first());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

          await updatePage.reviewerNameInput.clear();
          await updatePage.reviewerNameInput.sendKeys('modified');
          expect(await updatePage.reviewerNameInput.getAttribute('value')).to.match(/modified/);

          await updatePage.reviewerEmailInput.clear();
          await updatePage.reviewerEmailInput.sendKeys('modified');
          expect(await updatePage.reviewerEmailInput.getAttribute('value')).to.match(/modified/);

          await updatePage.reviewInput.clear();
          await updatePage.reviewInput.sendKeys('modified');
          expect(await updatePage.reviewInput.getAttribute('value')).to.match(/modified/);

          await clear(updatePage.ratingInput);
          await updatePage.ratingInput.sendKeys('6');
          expect(await updatePage.ratingInput.getAttribute('value')).to.eq('6');


        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
    */
  });
});
