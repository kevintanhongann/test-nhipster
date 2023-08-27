/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import TaxRateComponentsPage, { TaxRateDeleteDialog } from './tax-rate.page-object';
import TaxRateUpdatePage from './tax-rate-update.page-object';
import TaxRateDetailsPage from './tax-rate-details.page-object';

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

describe('TaxRate e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: TaxRateUpdatePage;
  let detailsPage: TaxRateDetailsPage;
  let listPage: TaxRateComponentsPage;
  /*let deleteDialog: TaxRateDeleteDialog;*/
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

  it('should load TaxRates', async () => {
    await navBarPage.getEntityPage('tax-rate');
    listPage = new TaxRateComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create TaxRate page', async () => {
      await listPage.createButton.click();
      updatePage = new TaxRateUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getText()).to.match(/Create or edit a TaxRate/);
    });

    /* it('should create and save TaxRates', async () => {

      await updatePage.countryInput.sendKeys('country');
      expect(await updatePage.countryInput.getAttribute('value')).to.match(/country/);


      await updatePage.stateInput.sendKeys('state');
      expect(await updatePage.stateInput.getAttribute('value')).to.match(/state/);


      await updatePage.postcodeInput.sendKeys('postcode');
      expect(await updatePage.postcodeInput.getAttribute('value')).to.match(/postcode/);


      await updatePage.cityInput.sendKeys('city');
      expect(await updatePage.cityInput.getAttribute('value')).to.match(/city/);


      await updatePage.rateInput.sendKeys('rate');
      expect(await updatePage.rateInput.getAttribute('value')).to.match(/rate/);


      await updatePage.nameInput.sendKeys('name');
      expect(await updatePage.nameInput.getAttribute('value')).to.match(/name/);


      const selectedShipping = await updatePage.shippingInput.isSelected();
      if (selectedShipping) {
        await updatePage.shippingInput.click();
        expect(await updatePage.shippingInput.isSelected()).to.be.false;
      } else {
        await updatePage.shippingInput.click();
        expect(await updatePage.shippingInput.isSelected()).to.be.true;
      }


      const selectedCompound = await updatePage.compoundInput.isSelected();
      if (selectedCompound) {
        await updatePage.compoundInput.click();
        expect(await updatePage.compoundInput.isSelected()).to.be.false;
      } else {
        await updatePage.compoundInput.click();
        expect(await updatePage.compoundInput.isSelected()).to.be.true;
      }


      await updatePage.priorityInput.sendKeys('5');
      expect(await updatePage.priorityInput.getAttribute('value')).to.eq('5');

      // await selectLastOption(updatePage.taxClassSelect);

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

        deleteDialog = new TaxRateDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/nhipstertestApp.taxRate.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details TaxRate page and fetch data', async () => {

        const detailsButton = listPage.getDetailsButton(listPage.records.first());
        await click(detailsButton);

        detailsPage = new TaxRateDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit TaxRate page, fetch data and update', async () => {

        const editButton = listPage.getEditButton(listPage.records.first());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

          await updatePage.countryInput.clear();
          await updatePage.countryInput.sendKeys('modified');
          expect(await updatePage.countryInput.getAttribute('value')).to.match(/modified/);

          await updatePage.stateInput.clear();
          await updatePage.stateInput.sendKeys('modified');
          expect(await updatePage.stateInput.getAttribute('value')).to.match(/modified/);

          await updatePage.postcodeInput.clear();
          await updatePage.postcodeInput.sendKeys('modified');
          expect(await updatePage.postcodeInput.getAttribute('value')).to.match(/modified/);

          await updatePage.cityInput.clear();
          await updatePage.cityInput.sendKeys('modified');
          expect(await updatePage.cityInput.getAttribute('value')).to.match(/modified/);

          await updatePage.rateInput.clear();
          await updatePage.rateInput.sendKeys('modified');
          expect(await updatePage.rateInput.getAttribute('value')).to.match(/modified/);

          await updatePage.nameInput.clear();
          await updatePage.nameInput.sendKeys('modified');
          expect(await updatePage.nameInput.getAttribute('value')).to.match(/modified/);

          const selectedShipping = await updatePage.shippingInput.isSelected();
          if (selectedShipping) {
            await updatePage.shippingInput.click();
            expect(await updatePage.shippingInput.isSelected()).to.be.false;
          } else {
            await updatePage.shippingInput.click();
            expect(await updatePage.shippingInput.isSelected()).to.be.true;
          }

          const selectedCompound = await updatePage.compoundInput.isSelected();
          if (selectedCompound) {
            await updatePage.compoundInput.click();
            expect(await updatePage.compoundInput.isSelected()).to.be.false;
          } else {
            await updatePage.compoundInput.click();
            expect(await updatePage.compoundInput.isSelected()).to.be.true;
          }

          await clear(updatePage.priorityInput);
          await updatePage.priorityInput.sendKeys('6');
          expect(await updatePage.priorityInput.getAttribute('value')).to.eq('6');


        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
    */
  });
});
