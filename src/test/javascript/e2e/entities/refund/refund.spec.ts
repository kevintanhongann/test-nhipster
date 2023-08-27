/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import RefundComponentsPage, { RefundDeleteDialog } from './refund.page-object';
import RefundUpdatePage from './refund-update.page-object';
import RefundDetailsPage from './refund-details.page-object';

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

describe('Refund e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: RefundUpdatePage;
  let detailsPage: RefundDetailsPage;
  let listPage: RefundComponentsPage;
  /*let deleteDialog: RefundDeleteDialog;*/
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

  it('should load Refunds', async () => {
    await navBarPage.getEntityPage('refund');
    listPage = new RefundComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Refund page', async () => {
      await listPage.createButton.click();
      updatePage = new RefundUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getText()).to.match(/Create or edit a Refund/);
    });

    /* it('should create and save Refunds', async () => {

      await updatePage.amountInput.sendKeys('5');
      expect(await updatePage.amountInput.getAttribute('value')).to.eq('5');


      await updatePage.reasonInput.sendKeys('reason');
      expect(await updatePage.reasonInput.getAttribute('value')).to.match(/reason/);


      await updatePage.orderCodeInput.sendKeys('orderCode');
      expect(await updatePage.orderCodeInput.getAttribute('value')).to.match(/orderCode/);


      await selectLastOption(updatePage.statusSelect);

      // await selectLastOption(updatePage.transactionSelect);
      // await selectLastOption(updatePage.userSelect);

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

        deleteDialog = new RefundDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/nhipstertestApp.refund.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Refund page and fetch data', async () => {

        const detailsButton = listPage.getDetailsButton(listPage.records.first());
        await click(detailsButton);

        detailsPage = new RefundDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Refund page, fetch data and update', async () => {

        const editButton = listPage.getEditButton(listPage.records.first());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

          await clear(updatePage.amountInput);
          await updatePage.amountInput.sendKeys('6');
          expect(await updatePage.amountInput.getAttribute('value')).to.eq('6');

          await updatePage.reasonInput.clear();
          await updatePage.reasonInput.sendKeys('modified');
          expect(await updatePage.reasonInput.getAttribute('value')).to.match(/modified/);

          await updatePage.orderCodeInput.clear();
          await updatePage.orderCodeInput.sendKeys('modified');
          expect(await updatePage.orderCodeInput.getAttribute('value')).to.match(/modified/);


        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
    */
  });
});
