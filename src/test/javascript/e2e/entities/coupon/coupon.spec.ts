/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import CouponComponentsPage, { CouponDeleteDialog } from './coupon.page-object';
import CouponUpdatePage from './coupon-update.page-object';
import CouponDetailsPage from './coupon-details.page-object';

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

describe('Coupon e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: CouponUpdatePage;
  let detailsPage: CouponDetailsPage;
  let listPage: CouponComponentsPage;
  let deleteDialog: CouponDeleteDialog;
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

  it('should load Coupons', async () => {
    await navBarPage.getEntityPage('coupon');
    listPage = new CouponComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Coupon page', async () => {
      await listPage.createButton.click();
      updatePage = new CouponUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getText()).to.match(/Create or edit a Coupon/);
    });

    it('should create and save Coupons', async () => {
      await updatePage.codeInput.sendKeys('code');
      expect(await updatePage.codeInput.getAttribute('value')).to.match(/code/);

      await updatePage.amountInput.sendKeys('5');
      expect(await updatePage.amountInput.getAttribute('value')).to.eq('5');

      await selectLastOption(updatePage.discountTypeSelect);

      await updatePage.descriptionInput.sendKeys('description');
      expect(await updatePage.descriptionInput.getAttribute('value')).to.match(/description/);

      await updatePage.expiryInput.sendKeys('2001-01-01');
      expect(await updatePage.expiryInput.getAttribute('value')).to.eq('2001-01-01');

      const selectedIndividualUse = await updatePage.individualUseInput.isSelected();
      if (selectedIndividualUse) {
        await updatePage.individualUseInput.click();
        expect(await updatePage.individualUseInput.isSelected()).to.be.false;
      } else {
        await updatePage.individualUseInput.click();
        expect(await updatePage.individualUseInput.isSelected()).to.be.true;
      }

      await updatePage.usageLimitInput.sendKeys('5');
      expect(await updatePage.usageLimitInput.getAttribute('value')).to.eq('5');

      await updatePage.usageLimitPerUserInput.sendKeys('5');
      expect(await updatePage.usageLimitPerUserInput.getAttribute('value')).to.eq('5');

      const selectedFreeShipping = await updatePage.freeShippingInput.isSelected();
      if (selectedFreeShipping) {
        await updatePage.freeShippingInput.click();
        expect(await updatePage.freeShippingInput.isSelected()).to.be.false;
      } else {
        await updatePage.freeShippingInput.click();
        expect(await updatePage.freeShippingInput.isSelected()).to.be.true;
      }

      await updatePage.minimumAmountInput.sendKeys('minimumAmount');
      expect(await updatePage.minimumAmountInput.getAttribute('value')).to.match(/minimumAmount/);

      await updatePage.maximumAmountInput.sendKeys('maximumAmount');
      expect(await updatePage.maximumAmountInput.getAttribute('value')).to.match(/maximumAmount/);

      expect(await updatePage.saveButton.isEnabled()).to.be.true;
      await updatePage.saveButton.click();

      await waitUntilHidden(updatePage.saveButton);
      expect(await isVisible(updatePage.saveButton)).to.be.false;

      await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      expect(await listPage.records.count()).to.eq(beforeRecordsCount + 1);
    });

    describe('Details, Update, Delete flow', () => {
      after(async () => {
        const deleteButton = listPage.getDeleteButton(listPage.records.first());
        await click(deleteButton);

        deleteDialog = new CouponDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/nhipstertestApp.coupon.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Coupon page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.first());
        await click(detailsButton);

        detailsPage = new CouponDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Coupon page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.first());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.codeInput.clear();
        await updatePage.codeInput.sendKeys('modified');
        expect(await updatePage.codeInput.getAttribute('value')).to.match(/modified/);

        await clear(updatePage.amountInput);
        await updatePage.amountInput.sendKeys('6');
        expect(await updatePage.amountInput.getAttribute('value')).to.eq('6');

        await updatePage.descriptionInput.clear();
        await updatePage.descriptionInput.sendKeys('modified');
        expect(await updatePage.descriptionInput.getAttribute('value')).to.match(/modified/);

        await updatePage.expiryInput.clear();
        await updatePage.expiryInput.sendKeys('2019-01-01');
        expect(await updatePage.expiryInput.getAttribute('value')).to.eq('2019-01-01');

        const selectedIndividualUse = await updatePage.individualUseInput.isSelected();
        if (selectedIndividualUse) {
          await updatePage.individualUseInput.click();
          expect(await updatePage.individualUseInput.isSelected()).to.be.false;
        } else {
          await updatePage.individualUseInput.click();
          expect(await updatePage.individualUseInput.isSelected()).to.be.true;
        }

        await clear(updatePage.usageLimitInput);
        await updatePage.usageLimitInput.sendKeys('6');
        expect(await updatePage.usageLimitInput.getAttribute('value')).to.eq('6');

        await clear(updatePage.usageLimitPerUserInput);
        await updatePage.usageLimitPerUserInput.sendKeys('6');
        expect(await updatePage.usageLimitPerUserInput.getAttribute('value')).to.eq('6');

        const selectedFreeShipping = await updatePage.freeShippingInput.isSelected();
        if (selectedFreeShipping) {
          await updatePage.freeShippingInput.click();
          expect(await updatePage.freeShippingInput.isSelected()).to.be.false;
        } else {
          await updatePage.freeShippingInput.click();
          expect(await updatePage.freeShippingInput.isSelected()).to.be.true;
        }

        await updatePage.minimumAmountInput.clear();
        await updatePage.minimumAmountInput.sendKeys('modified');
        expect(await updatePage.minimumAmountInput.getAttribute('value')).to.match(/modified/);

        await updatePage.maximumAmountInput.clear();
        await updatePage.maximumAmountInput.sendKeys('modified');
        expect(await updatePage.maximumAmountInput.getAttribute('value')).to.match(/modified/);

        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
  });
});
