import { browser, by, element, protractor } from 'protractor';
import { DEFAULT_CRITIC_SLEEP_TIME } from './critic.protactor.defaults';

export class CriticRestaurantPendingReviewsPage {
  performReplyToLastReview() {
    return element.all(by.css('#crt-pending-reviews-content .crt-review-card-buttons button')).last().click()
                 .then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  addCommentToLastReply(value: string) {
    return element.all(by.css('#crt-pending-reviews-content .crt-review-reply-editable textarea')).last().sendKeys(value);
  }


  getNumberOfReviews(): any {
    return element.all(by.tagName('review-card')).count();
  }

}
