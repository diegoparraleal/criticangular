import { browser, by, element, protractor } from 'protractor';
import { DEFAULT_CRITIC_SLEEP_TIME } from './critic.protactor.defaults';

export class CriticRegisterPage {
  async selectRegularUser() {
    return element(by.css("#ctr-register-wrapper span img")).click().then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

}
