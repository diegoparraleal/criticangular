import { browser, by, element, protractor } from 'protractor';
import { DEFAULT_CRITIC_SLEEP_TIME } from './critic.protactor.defaults';

export class CriticUsersPage {

  async clearFilter() {
    return element(by.css('#crt-text-filter button')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async confirmDeleteUser() {
    return element(by.cssContainingText('mat-dialog-actions button span', 'Yes')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async deleteFirstUser() {
    return element(by.cssContainingText('user-card:first-child .crt-user-card-links mat-button', 'Delete')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async confirmEditUser() {
    return element(by.cssContainingText('mat-dialog-actions button span', 'Edit')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async changeRole(value: string) {
    await element(by.css('user-editable #crt-user-editable-role mat-select')).click();
    return element(by.cssContainingText('.mat-select-panel-wrap mat-option span', value)).click();
  }

  async editFirstUser() {
    return element(by.cssContainingText('user-card:first-child .crt-user-card-links mat-button a', 'Edit')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async getFirstUserRole(): Promise<any> {
    return element(by.tagName('user-card:first-child h4')).getText();
  }

  async getFirstUserEmail(): Promise<any> {
    return element(by.tagName('user-card:first-child h3')).getText();
  }

  async getFirstUserName(): Promise<any>{
    return element(by.tagName('user-card:first-child h2')).getText();
  }

  async setFilter(value: string) {
    element(by.css('#crt-text-filter input')).sendKeys(value);
    return element(by.css('#crt-text-filter input')).sendKeys(protractor.Key.ENTER)
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }
  async getNumbersOfUsers(): Promise<any> {
    return element.all(by.tagName('user-card')).count();
  }

}
