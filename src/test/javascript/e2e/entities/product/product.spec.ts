/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import ProductComponentsPage, { ProductDeleteDialog } from './product.page-object';
import ProductUpdatePage from './product-update.page-object';
import ProductDetailsPage from './product-details.page-object';

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

describe('Product e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: ProductUpdatePage;
  let detailsPage: ProductDetailsPage;
  let listPage: ProductComponentsPage;
  /*let deleteDialog: ProductDeleteDialog;*/
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

  it('should load Products', async () => {
    await navBarPage.getEntityPage('product');
    listPage = new ProductComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Product page', async () => {
      await listPage.createButton.click();
      updatePage = new ProductUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getText()).to.match(/Create or edit a Product/);
    });

    /* it('should create and save Products', async () => {

      await updatePage.nameInput.sendKeys('name');
      expect(await updatePage.nameInput.getAttribute('value')).to.match(/name/);


      await updatePage.slugInput.sendKeys('slug');
      expect(await updatePage.slugInput.getAttribute('value')).to.match(/slug/);


      await updatePage.skuNumberInput.sendKeys('skuNumber');
      expect(await updatePage.skuNumberInput.getAttribute('value')).to.match(/skuNumber/);


      await updatePage.descriptionInput.sendKeys('description');
      expect(await updatePage.descriptionInput.getAttribute('value')).to.match(/description/);


      await updatePage.shortDescriptionInput.sendKeys('shortDescription');
      expect(await updatePage.shortDescriptionInput.getAttribute('value')).to.match(/shortDescription/);


      await updatePage.regularPriceInput.sendKeys('5');
      expect(await updatePage.regularPriceInput.getAttribute('value')).to.eq('5');


      await updatePage.salePriceInput.sendKeys('5');
      expect(await updatePage.salePriceInput.getAttribute('value')).to.eq('5');


      const selectedPublished = await updatePage.publishedInput.isSelected();
      if (selectedPublished) {
        await updatePage.publishedInput.click();
        expect(await updatePage.publishedInput.isSelected()).to.be.false;
      } else {
        await updatePage.publishedInput.click();
        expect(await updatePage.publishedInput.isSelected()).to.be.true;
      }


      await updatePage.dateCreatedInput.sendKeys('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await updatePage.dateCreatedInput.getAttribute('value')).to.contain('2001-01-01T02:30');


      await updatePage.dateModifiedInput.sendKeys('2001-01-01');
      expect(await updatePage.dateModifiedInput.getAttribute('value')).to.eq('2001-01-01');


      const selectedFeatured = await updatePage.featuredInput.isSelected();
      if (selectedFeatured) {
        await updatePage.featuredInput.click();
        expect(await updatePage.featuredInput.isSelected()).to.be.false;
      } else {
        await updatePage.featuredInput.click();
        expect(await updatePage.featuredInput.isSelected()).to.be.true;
      }


      await selectLastOption(updatePage.taxStatusSelect);


      const selectedManageStock = await updatePage.manageStockInput.isSelected();
      if (selectedManageStock) {
        await updatePage.manageStockInput.click();
        expect(await updatePage.manageStockInput.isSelected()).to.be.false;
      } else {
        await updatePage.manageStockInput.click();
        expect(await updatePage.manageStockInput.isSelected()).to.be.true;
      }


      await selectLastOption(updatePage.stockStatusSelect);


      const selectedSoldIndividually = await updatePage.soldIndividuallyInput.isSelected();
      if (selectedSoldIndividually) {
        await updatePage.soldIndividuallyInput.click();
        expect(await updatePage.soldIndividuallyInput.isSelected()).to.be.false;
      } else {
        await updatePage.soldIndividuallyInput.click();
        expect(await updatePage.soldIndividuallyInput.isSelected()).to.be.true;
      }


      await selectLastOption(updatePage.backOrdersSelect);


      await updatePage.weightInput.sendKeys('5');
      expect(await updatePage.weightInput.getAttribute('value')).to.eq('5');


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


      await updatePage.downloadLimitInput.sendKeys('5');
      expect(await updatePage.downloadLimitInput.getAttribute('value')).to.eq('5');


      await updatePage.downloadExpiryInput.sendKeys('5');
      expect(await updatePage.downloadExpiryInput.getAttribute('value')).to.eq('5');


      const selectedShippingRequired = await updatePage.shippingRequiredInput.isSelected();
      if (selectedShippingRequired) {
        await updatePage.shippingRequiredInput.click();
        expect(await updatePage.shippingRequiredInput.isSelected()).to.be.false;
      } else {
        await updatePage.shippingRequiredInput.click();
        expect(await updatePage.shippingRequiredInput.isSelected()).to.be.true;
      }


      const selectedShippingTaxable = await updatePage.shippingTaxableInput.isSelected();
      if (selectedShippingTaxable) {
        await updatePage.shippingTaxableInput.click();
        expect(await updatePage.shippingTaxableInput.isSelected()).to.be.false;
      } else {
        await updatePage.shippingTaxableInput.click();
        expect(await updatePage.shippingTaxableInput.isSelected()).to.be.true;
      }


      await updatePage.parentIdInput.sendKeys('5');
      expect(await updatePage.parentIdInput.getAttribute('value')).to.eq('5');


      await updatePage.purchaseNoteInput.sendKeys('purchaseNote');
      expect(await updatePage.purchaseNoteInput.getAttribute('value')).to.match(/purchaseNote/);


      await selectLastOption(updatePage.catalogVisibilitySelect);

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

        deleteDialog = new ProductDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/nhipstertestApp.product.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Product page and fetch data', async () => {

        const detailsButton = listPage.getDetailsButton(listPage.records.first());
        await click(detailsButton);

        detailsPage = new ProductDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Product page, fetch data and update', async () => {

        const editButton = listPage.getEditButton(listPage.records.first());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

          await updatePage.nameInput.clear();
          await updatePage.nameInput.sendKeys('modified');
          expect(await updatePage.nameInput.getAttribute('value')).to.match(/modified/);

          await updatePage.slugInput.clear();
          await updatePage.slugInput.sendKeys('modified');
          expect(await updatePage.slugInput.getAttribute('value')).to.match(/modified/);

          await updatePage.skuNumberInput.clear();
          await updatePage.skuNumberInput.sendKeys('modified');
          expect(await updatePage.skuNumberInput.getAttribute('value')).to.match(/modified/);

          await updatePage.descriptionInput.clear();
          await updatePage.descriptionInput.sendKeys('modified');
          expect(await updatePage.descriptionInput.getAttribute('value')).to.match(/modified/);

          await updatePage.shortDescriptionInput.clear();
          await updatePage.shortDescriptionInput.sendKeys('modified');
          expect(await updatePage.shortDescriptionInput.getAttribute('value')).to.match(/modified/);

          await clear(updatePage.regularPriceInput);
          await updatePage.regularPriceInput.sendKeys('6');
          expect(await updatePage.regularPriceInput.getAttribute('value')).to.eq('6');

          await clear(updatePage.salePriceInput);
          await updatePage.salePriceInput.sendKeys('6');
          expect(await updatePage.salePriceInput.getAttribute('value')).to.eq('6');

          const selectedPublished = await updatePage.publishedInput.isSelected();
          if (selectedPublished) {
            await updatePage.publishedInput.click();
            expect(await updatePage.publishedInput.isSelected()).to.be.false;
          } else {
            await updatePage.publishedInput.click();
            expect(await updatePage.publishedInput.isSelected()).to.be.true;
          }

          await updatePage.dateCreatedInput.clear();
          await updatePage.dateCreatedInput.sendKeys('01/01/2019' + protractor.Key.TAB + '02:30AM');
          expect(await updatePage.dateCreatedInput.getAttribute('value')).to.contain('2019-01-01T02:30');

          await updatePage.dateModifiedInput.clear();
          await updatePage.dateModifiedInput.sendKeys('2019-01-01');
          expect(await updatePage.dateModifiedInput.getAttribute('value')).to.eq('2019-01-01');

          const selectedFeatured = await updatePage.featuredInput.isSelected();
          if (selectedFeatured) {
            await updatePage.featuredInput.click();
            expect(await updatePage.featuredInput.isSelected()).to.be.false;
          } else {
            await updatePage.featuredInput.click();
            expect(await updatePage.featuredInput.isSelected()).to.be.true;
          }

          const selectedManageStock = await updatePage.manageStockInput.isSelected();
          if (selectedManageStock) {
            await updatePage.manageStockInput.click();
            expect(await updatePage.manageStockInput.isSelected()).to.be.false;
          } else {
            await updatePage.manageStockInput.click();
            expect(await updatePage.manageStockInput.isSelected()).to.be.true;
          }

          const selectedSoldIndividually = await updatePage.soldIndividuallyInput.isSelected();
          if (selectedSoldIndividually) {
            await updatePage.soldIndividuallyInput.click();
            expect(await updatePage.soldIndividuallyInput.isSelected()).to.be.false;
          } else {
            await updatePage.soldIndividuallyInput.click();
            expect(await updatePage.soldIndividuallyInput.isSelected()).to.be.true;
          }

          await clear(updatePage.weightInput);
          await updatePage.weightInput.sendKeys('6');
          expect(await updatePage.weightInput.getAttribute('value')).to.eq('6');

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

          await clear(updatePage.downloadLimitInput);
          await updatePage.downloadLimitInput.sendKeys('6');
          expect(await updatePage.downloadLimitInput.getAttribute('value')).to.eq('6');

          await clear(updatePage.downloadExpiryInput);
          await updatePage.downloadExpiryInput.sendKeys('6');
          expect(await updatePage.downloadExpiryInput.getAttribute('value')).to.eq('6');

          const selectedShippingRequired = await updatePage.shippingRequiredInput.isSelected();
          if (selectedShippingRequired) {
            await updatePage.shippingRequiredInput.click();
            expect(await updatePage.shippingRequiredInput.isSelected()).to.be.false;
          } else {
            await updatePage.shippingRequiredInput.click();
            expect(await updatePage.shippingRequiredInput.isSelected()).to.be.true;
          }

          const selectedShippingTaxable = await updatePage.shippingTaxableInput.isSelected();
          if (selectedShippingTaxable) {
            await updatePage.shippingTaxableInput.click();
            expect(await updatePage.shippingTaxableInput.isSelected()).to.be.false;
          } else {
            await updatePage.shippingTaxableInput.click();
            expect(await updatePage.shippingTaxableInput.isSelected()).to.be.true;
          }

          await clear(updatePage.parentIdInput);
          await updatePage.parentIdInput.sendKeys('6');
          expect(await updatePage.parentIdInput.getAttribute('value')).to.eq('6');

          await updatePage.purchaseNoteInput.clear();
          await updatePage.purchaseNoteInput.sendKeys('modified');
          expect(await updatePage.purchaseNoteInput.getAttribute('value')).to.match(/modified/);


        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
    */
  });
});
