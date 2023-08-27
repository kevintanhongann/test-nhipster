/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import ProductImageComponentsPage, { ProductImageDeleteDialog } from './product-image.page-object';
import ProductImageUpdatePage from './product-image-update.page-object';
import ProductImageDetailsPage from './product-image-details.page-object';

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

describe('ProductImage e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: ProductImageUpdatePage;
  let detailsPage: ProductImageDetailsPage;
  let listPage: ProductImageComponentsPage;
  let deleteDialog: ProductImageDeleteDialog;
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

  it('should load ProductImages', async () => {
    await navBarPage.getEntityPage('product-image');
    listPage = new ProductImageComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create ProductImage page', async () => {
      await listPage.createButton.click();
      updatePage = new ProductImageUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getText()).to.match(/Create or edit a ProductImage/);
    });

    it('should create and save ProductImages', async () => {
      await updatePage.filenameInput.sendKeys('filename');
      expect(await updatePage.filenameInput.getAttribute('value')).to.match(/filename/);

      await updatePage.urlInput.sendKeys('url');
      expect(await updatePage.urlInput.getAttribute('value')).to.match(/url/);

      await updatePage.mimeTypeInput.sendKeys('mimeType');
      expect(await updatePage.mimeTypeInput.getAttribute('value')).to.match(/mimeType/);

      // await selectLastOption(updatePage.productSelect);

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

        deleteDialog = new ProductImageDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/nhipstertestApp.productImage.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details ProductImage page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.first());
        await click(detailsButton);

        detailsPage = new ProductImageDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit ProductImage page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.first());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.filenameInput.clear();
        await updatePage.filenameInput.sendKeys('modified');
        expect(await updatePage.filenameInput.getAttribute('value')).to.match(/modified/);

        await updatePage.urlInput.clear();
        await updatePage.urlInput.sendKeys('modified');
        expect(await updatePage.urlInput.getAttribute('value')).to.match(/modified/);

        await updatePage.mimeTypeInput.clear();
        await updatePage.mimeTypeInput.sendKeys('modified');
        expect(await updatePage.mimeTypeInput.getAttribute('value')).to.match(/modified/);

        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
  });
});
