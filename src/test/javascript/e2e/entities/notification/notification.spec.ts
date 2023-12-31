/* tslint:disable no-unused-expression */
import { browser, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import NotificationComponentsPage, { NotificationDeleteDialog } from './notification.page-object';
import NotificationUpdatePage from './notification-update.page-object';
import NotificationDetailsPage from './notification-details.page-object';

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

describe('Notification e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: NotificationUpdatePage;
  let detailsPage: NotificationDetailsPage;
  let listPage: NotificationComponentsPage;
  /*let deleteDialog: NotificationDeleteDialog;*/
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

  it('should load Notifications', async () => {
    await navBarPage.getEntityPage('notification');
    listPage = new NotificationComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Notification page', async () => {
      await listPage.createButton.click();
      updatePage = new NotificationUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getText()).to.match(/Create or edit a Notification/);
    });

    /* it('should create and save Notifications', async () => {

      await updatePage.detailsInput.sendKeys('details');
      expect(await updatePage.detailsInput.getAttribute('value')).to.match(/details/);


      await updatePage.sentDateInput.sendKeys('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await updatePage.sentDateInput.getAttribute('value')).to.contain('2001-01-01T02:30');


      await selectLastOption(updatePage.formatSelect);


      await updatePage.googleNotificationIdInput.sendKeys('googleNotificationId');
      expect(await updatePage.googleNotificationIdInput.getAttribute('value')).to.match(/googleNotificationId/);


      await updatePage.productIdInput.sendKeys('5');
      expect(await updatePage.productIdInput.getAttribute('value')).to.eq('5');


      const selectedRead = await updatePage.readInput.isSelected();
      if (selectedRead) {
        await updatePage.readInput.click();
        expect(await updatePage.readInput.isSelected()).to.be.false;
      } else {
        await updatePage.readInput.click();
        expect(await updatePage.readInput.isSelected()).to.be.true;
      }

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

        const deleteButton = listPage.getDeleteButton(listPage.records.last());
        await click(deleteButton);

        deleteDialog = new NotificationDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/nhipstertestApp.notification.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Notification page and fetch data', async () => {

        const detailsButton = listPage.getDetailsButton(listPage.records.last());
        await click(detailsButton);

        detailsPage = new NotificationDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Notification page, fetch data and update', async () => {

        const editButton = listPage.getEditButton(listPage.records.last());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

          await updatePage.detailsInput.clear();
          await updatePage.detailsInput.sendKeys('modified');
          expect(await updatePage.detailsInput.getAttribute('value')).to.match(/modified/);

          await updatePage.sentDateInput.clear();
          await updatePage.sentDateInput.sendKeys('01/01/2019' + protractor.Key.TAB + '02:30AM');
          expect(await updatePage.sentDateInput.getAttribute('value')).to.contain('2019-01-01T02:30');

          await updatePage.googleNotificationIdInput.clear();
          await updatePage.googleNotificationIdInput.sendKeys('modified');
          expect(await updatePage.googleNotificationIdInput.getAttribute('value')).to.match(/modified/);

          await clear(updatePage.productIdInput);
          await updatePage.productIdInput.sendKeys('6');
          expect(await updatePage.productIdInput.getAttribute('value')).to.eq('6');

          const selectedRead = await updatePage.readInput.isSelected();
          if (selectedRead) {
            await updatePage.readInput.click();
            expect(await updatePage.readInput.isSelected()).to.be.false;
          } else {
            await updatePage.readInput.click();
            expect(await updatePage.readInput.isSelected()).to.be.true;
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
