import { browser, by, element, protractor } from 'protractor';
import { DEFAULT_CRITIC_SLEEP_TIME } from './critic.protactor.defaults';

export class CriticRestaurantDetailPage {

  async getRestaurantName(): Promise<any> {
    return element(by.tagName('#crt-restaurant-detail-header restaurant-card:first-child h2')).getText();
  }

  async getTopReviewText(): Promise<any> {
    return element(by.css('#crt-restaurant-detail-topreviews > span:first-child p:first-child')).getText();
  }

  async hasTopReviewAReply(): Promise<any> {
    return element(by.css('#crt-restaurant-detail-topreviews > span:first-child .crt-review-card-reply img')).isPresent();
  }

  async getTopReviewReply(): Promise<any> {
    return element(by.css('#crt-restaurant-detail-topreviews > span:first-child p:last-child')).getText();
  }

  async getTopReviewRating(): Promise<any> {
    return element(by.css('#crt-restaurant-detail-topreviews > span:first-child star-rating label')).getText();
  }

  async getWorstReviewText(): Promise<any> {
    return element(by.css('#crt-restaurant-detail-topreviews > span:last-child p:first-child')).getText();
  }

  async hasWorstReviewAReply(): Promise<any> {
    return element(by.css('#crt-restaurant-detail-topreviews > span:last-child .crt-review-card-reply img')).isPresent();
  }

  async getWorstReviewReply(): Promise<any> {
    return element(by.css('#crt-restaurant-detail-topreviews > span:last-child p:last-child')).getText();
  }

  async getWorstReviewRating(): Promise<any> {
    return element(by.css('#crt-restaurant-detail-topreviews > span:last-child star-rating label')).getText();
  }

  async getNumberOfReviews(): Promise<any> {
    return element.all(by.css('#crt-restaurant-detail-reviews review-card')).count();
  }

  async loadMore(): Promise<any> {
    return element(by.css('#crt-restaurant-detail-loadmore button')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async isLoadMorePresent(): Promise<any> {
    return element(by.css('#crt-restaurant-detail-loadmore button')).isPresent();
  }

  async isAddReviewPresent(): Promise<any> {
    return element(by.css('#crt-restaurant-detail-links mat-button')).isPresent();
  }

  async addReview(): Promise<any> {
    return element(by.css('#crt-restaurant-detail-links mat-button')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async addReviewComment(value: string): Promise<any> {
    return element(by.css('#crt-restaurant-detail-addReview textarea')).sendKeys(value);
  }

  async addReviewRating(value:number): Promise<any> {
    return element(by.css(`#crt-restaurant-detail-addReview #star_${value-1}`)).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async confirmAddReview(): Promise<any> {
    return element(by.css(`#crt-restaurant-detail-addReview .crt-review-card-buttons button:last-child`)).click()
                .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async addCommentToFirstReply(value: string): Promise<any> {
    return element(by.css('#crt-restaurant-detail-reviews .crt-review-reply-editable:first-child textarea')).sendKeys(value);
  }

  async performReplyToFirstReview(): Promise<any> {
    return element(by.css('#crt-restaurant-detail-reviews .crt-review-card-buttons button')).click()
                 .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async editFirstReview(): Promise<any> {
    return element.all(by.cssContainingText('#crt-restaurant-detail-reviews .crt-review-card-header mat-button a', 'Edit')).get(0).click()
                 .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async editSecondReview(): Promise<any> {
    return element.all(by.cssContainingText('#crt-restaurant-detail-reviews .crt-review-card-header mat-button a', 'Edit')).get(1).click()
    .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async deleteFirstReview(): Promise<any> {
    return element(by.cssContainingText('#crt-restaurant-detail-reviews .crt-review-card-header mat-button', 'Delete')).click()
                 .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async modifyReviewComment(value: string): Promise<any> {
    await element(by.css('.crt-review-card-editable .crt-review-editable-comment textarea')).clear();
    return element(by.css('.crt-review-card-editable .crt-review-editable-comment textarea')).sendKeys(value);
  }

  async modifyReplyComment(value: string): Promise<any> {
    await element(by.css('.crt-review-card-editable .crt-review-reply-comment textarea')).clear();
    return element(by.css('.crt-review-card-editable .crt-review-reply-comment textarea')).sendKeys(value);
  }

  async confirmEditReview(): Promise<any> {
    return element(by.css(`review-card .crt-review-card-buttons button:last-child`)).click()
                .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async confirmDeleteReview(): Promise<any> {
    return element(by.cssContainingText('mat-dialog-actions button span', 'Yes')).click()
                  .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }
}
