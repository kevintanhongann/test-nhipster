/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import ProductVariationComponentsPage, { ProductVariationDeleteDialog } from './product-variation.page-object';
import ProductVariationUpdatePage from './product-variation-update.page-object';
import ProductVariationDetailsPage from './product-variation-details.page-object';

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

describe('ProductVariation e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: ProductVariationUpdatePage;
  let detailsPage: ProductVariationDetailsPage;
  let listPage: ProductVariationComponentsPage;
  /*let deleteDialog: ProductVariationDeleteDialog;*/
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

  it('should load ProductVariations', async () => {
    await navBarPage.getEntityPage('product-variation');
    listPage = new ProductVariationComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create ProductVariation page', async () => {
      await listPage.createButton.click();
      updatePage = new ProductVariationUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getText()).to.match(/Create or edit a ProductVariation/);
    });

    /* it('should create and save ProductVariations', async () => {

      await updatePage.regularPriceInput.sendKeys('5');
      expect(await updatePage.regularPriceInput.getAttribute('value')).to.eq('5');


      await updatePage.salePriceInput.sendKeys('5');
      expect(await updatePage.salePriceInput.getAttribute('value')).to.eq('5');


      await updatePage.dateOnSaleFromInput.sendKeys('2001-01-01');
      expect(await updatePage.dateOnSaleFromInput.getAttribute('value')).to.eq('2001-01-01');


      await updatePage.dateOnSaleToInput.sendKeys('2001-01-01');
      expect(await updatePage.dateOnSaleToInput.getAttribute('value')).to.eq('2001-01-01');


      const selectedVirtual = await updatePage.virtualInput.isSelected();
      if (selectedVirtual) {
        await updatePage.virtualInput.click();
        expect(await updatePage.virtualInput.isSelected()).to.be.false;
      } else {
        await updatePage.virtualInput.click();
        expect(await updatePage.virtualInput.isSelected()).to.be.true;
      }


      const selectedDownloadable = await updatePage.downloadableInput.isSelected();
      if (selectedDownloadable) {
        await updatePage.downloadableInput.click();
        expect(await updatePage.downloadableInput.isSelected()).to.be.false;
      } else {
        await updatePage.downloadableInput.click();
        expect(await updatePage.downloadableInput.isSelected()).to.be.true;
      }

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

        deleteDialog = new ProductVariationDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/nhipstertestApp.productVariation.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details ProductVariation page and fetch data', async () => {

        const detailsButton = listPage.getDetailsButton(listPage.records.first());
        await click(detailsButton);

        detailsPage = new ProductVariationDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit ProductVariation page, fetch data and update', async () => {

        const editButton = listPage.getEditButton(listPage.records.first());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

          await clear(updatePage.regularPriceInput);
          await updatePage.regularPriceInput.sendKeys('6');
          expect(await updatePage.regularPriceInput.getAttribute('value')).to.eq('6');

          await clear(updatePage.salePriceInput);
          await updatePage.salePriceInput.sendKeys('6');
          expect(await updatePage.salePriceInput.getAttribute('value')).to.eq('6');

          await updatePage.dateOnSaleFromInput.clear();
          await updatePage.dateOnSaleFromInput.sendKeys('2019-01-01');
          expect(await updatePage.dateOnSaleFromInput.getAttribute('value')).to.eq('2019-01-01');

          await updatePage.dateOnSaleToInput.clear();
          await updatePage.dateOnSaleToInput.sendKeys('2019-01-01');
          expect(await updatePage.dateOnSaleToInput.getAttribute('value')).to.eq('2019-01-01');

          const selectedVirtual = await updatePage.virtualInput.isSelected();
          if (selectedVirtual) {
            await updatePage.virtualInput.click();
            expect(await updatePage.virtualInput.isSelected()).to.be.false;
          } else {
            await updatePage.virtualInput.click();
            expect(await updatePage.virtualInput.isSelected()).to.be.true;
          }

          const selectedDownloadable = await updatePage.downloadableInput.isSelected();
          if (selectedDownloadable) {
            await updatePage.downloadableInput.click();
            expect(await updatePage.downloadableInput.isSelected()).to.be.false;
          } else {
            await updatePage.downloadableInput.click();
            expect(await updatePage.downloadableInput.isSelected()).to.be.true;
          }


        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
    */
  });
});
