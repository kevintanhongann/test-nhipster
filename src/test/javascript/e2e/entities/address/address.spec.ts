/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import AddressComponentsPage, { AddressDeleteDialog } from './address.page-object';
import AddressUpdatePage from './address-update.page-object';
import AddressDetailsPage from './address-details.page-object';

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

describe('Address e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: AddressUpdatePage;
  let detailsPage: AddressDetailsPage;
  let listPage: AddressComponentsPage;
  let deleteDialog: AddressDeleteDialog;
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

  it('should load Addresses', async () => {
    await navBarPage.getEntityPage('address');
    listPage = new AddressComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Address page', async () => {
      await listPage.createButton.click();
      updatePage = new AddressUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getText()).to.match(/Create or edit a Address/);
    });

    it('should create and save Addresses', async () => {
      await updatePage.address1Input.sendKeys('address1');
      expect(await updatePage.address1Input.getAttribute('value')).to.match(/address1/);

      await updatePage.address2Input.sendKeys('address2');
      expect(await updatePage.address2Input.getAttribute('value')).to.match(/address2/);

      await updatePage.cityInput.sendKeys('city');
      expect(await updatePage.cityInput.getAttribute('value')).to.match(/city/);

      await updatePage.stateInput.sendKeys('state');
      expect(await updatePage.stateInput.getAttribute('value')).to.match(/state/);

      await updatePage.countryInput.sendKeys('country');
      expect(await updatePage.countryInput.getAttribute('value')).to.match(/country/);

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

        deleteDialog = new AddressDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/nhipstertestApp.address.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Address page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.first());
        await click(detailsButton);

        detailsPage = new AddressDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Address page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.first());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.address1Input.clear();
        await updatePage.address1Input.sendKeys('modified');
        expect(await updatePage.address1Input.getAttribute('value')).to.match(/modified/);

        await updatePage.address2Input.clear();
        await updatePage.address2Input.sendKeys('modified');
        expect(await updatePage.address2Input.getAttribute('value')).to.match(/modified/);

        await updatePage.cityInput.clear();
        await updatePage.cityInput.sendKeys('modified');
        expect(await updatePage.cityInput.getAttribute('value')).to.match(/modified/);

        await updatePage.stateInput.clear();
        await updatePage.stateInput.sendKeys('modified');
        expect(await updatePage.stateInput.getAttribute('value')).to.match(/modified/);

        await updatePage.countryInput.clear();
        await updatePage.countryInput.sendKeys('modified');
        expect(await updatePage.countryInput.getAttribute('value')).to.match(/modified/);

        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
  });
});
