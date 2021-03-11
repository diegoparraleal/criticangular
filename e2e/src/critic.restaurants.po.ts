import { browser, by, element, protractor } from 'protractor';
import { DEFAULT_CRITIC_SLEEP_TIME } from './critic.protactor.defaults';

export class CriticRestaurantsPage {

  async getNumberOfRestaurants(): Promise<any> {
    return element.all(by.tagName('restaurant-card')).count();
  }

  async getFirstRestaurantName(): Promise<any> {
    return element(by.tagName('restaurant-card:first-child h2')).getText();
  }

  async getLastRestaurantName(): Promise<any> {
    return element(by.tagName('restaurant-card:last-child h2')).getText();
  }

  async setTextFilter(value:string): Promise<any> {
    element(by.css('#crt-text-filter input')).sendKeys(value);
    return element(by.css('#crt-text-filter input')).sendKeys(protractor.Key.ENTER)
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async setRating(value:number): Promise<any> {
    return element(by.css(`#crt-rating-filter #star_${value-1}`)).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async clearTextFilter(): Promise<any> {
    return element(by.css('#crt-text-filter button')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async loadMore(): Promise<any> {
    return element(by.css('#crt-restaurants-loadmore button')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async isLoadMorePresent(): Promise<any> {
    return element(by.css('#crt-restaurants-loadmore button')).isPresent();
  }

  async navigateToFirstRestaurantDetails(): Promise<any> {
    return element(by.cssContainingText('restaurant-card:first-child .crt-restaurant-card-links mat-button', 'Reviews')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async isAddRestaurantPresent(): Promise<any> {
    return element(by.css('#crt-restaurant-owner-header button')).isPresent();
  }

  async addRestaurant(): Promise<any> {
    return element(by.css('#crt-restaurant-owner-header button')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async simulateAddRestaurantFields(): Promise<any> {
    await element(by.css('#crt-restaurant-editable form #crt-restaurant-editable-name input')).sendKeys("THIS IS A NEW RESTAURANT");
    await element(by.css('#crt-restaurant-editable form #crt-restaurant-editable-description textarea')).sendKeys("THIS IS A DESCRIPTION FOR A NEW RESTAURANT");
    await element(by.css('#crt-restaurant-editable form #crt-restaurant-editable-city input')).sendKeys("New York");
    await this.selectFirstAutocompleteItem();
    await element(by.css('#crt-restaurant-editable form #crt-restaurant-editable-address input')).sendKeys("123 Fake Lane");
    await this.selectFirstAutocompleteItem();
    await element(by.css('#crt-restaurant-editable form #crt-restaurant-editable-prices input')).sendKeys("25");
    return element(by.css('#crt-restaurant-editable form #crt-restaurant-editable-image input')).sendKeys("https://assets.entrepreneur.com/content/3x2/2000/20180627140307-restaurante.jpeg?width=700&crop=2:1");
  }

  async selectFirstAutocompleteItem(){
    await browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.switchTo().defaultContent();
  }

  async confirmAddRestaurant(): Promise<any> {
    return element(by.cssContainingText('mat-dialog-actions button span', 'Add')).click()
          .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async editFirstRestaurant(): Promise<any> {
    return element(by.cssContainingText('restaurant-card:first-child .crt-restaurant-card-links mat-button a', 'Edit')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async deleteFirstRestaurant(): Promise<any> {
    return element(by.cssContainingText('restaurant-card:first-child .crt-restaurant-card-links mat-button', 'Delete')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async getRestaurantEditName(){
    return element(by.css('#crt-restaurant-editable form #crt-restaurant-editable-name input')).getAttribute('value');
  }

  async setRestaurantEditName(value: string){
    await element(by.css('#crt-restaurant-editable form #crt-restaurant-editable-name input')).clear();
    return element(by.css('#crt-restaurant-editable form #crt-restaurant-editable-name input')).sendKeys(value);
  }

  async confirmEditRestaurant(): Promise<any> {
    return element(by.cssContainingText('mat-dialog-actions button span', 'Edit')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async confirmDeleteRestaurant(): Promise<any> {
    return element(by.cssContainingText('mat-dialog-actions button span', 'Yes')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }
}
