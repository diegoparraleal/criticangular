import { browser, by, element } from 'protractor';
import { DEFAULT_CRITIC_SLEEP_TIME } from './critic.protactor.defaults';

export class CriticAppPage {

  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getAppDescription(): Promise<string> {
    return element(by.css('critic-splash h3')).getText();
  }

  async getAppLogo(): Promise<string> {
    return element(by.css('mat-toolbar img:first-child')).getAttribute("src");
  }

  async getAppWelcomeImage(): Promise<string> {
    return element(by.css('#crt-home-image')).getAttribute("src");
  }

  async performLogin(): Promise<any> {
    return element(by.css('critic-splash button')).click();
  }

  async performLogout(): Promise<any> {
    await element(by.css('#crt-user img')).click();
    await element(by.cssContainingText('.cdk-overlay-container button span', "Logout")).click();
  }

  simulateLoginNewUserWithGoogle() {
    var userInfo = JSON.stringify({
      "id":"115918222690896264237",
      "name":"User Critic",
      "email":"user1.critic@gmail.com",
      "photoUrl":"https://lh3.googleusercontent.com/a-/AOh14GjDPKFlpDw5hEJk3ZwL4z0hARDm5hBulUHVv2yq=s96-c",
      "firstName":"User",
      "lastName":"Critic",
      "authToken":"<DOES NOT MATTER>",
      "idToken":"<DOES NOT MATTER>",
      "response":{
        "KR":"115918222690896264237",
        "sd":"User Critic",
        "oT":"User",
        "qR":"Critic",
        "wI":"https://lh3.googleusercontent.com/a-/AOh14GjDPKFlpDw5hEJk3ZwL4z0hARDm5hBulUHVv2yq=s96-c",
        "lt":"user1.critic@gmail.com"
      },
      "provider":"GOOGLE"
    });

    browser.executeScript(`localStorage.setItem('user', '${userInfo}')`);
  }

  simulateLoginNormalUserWithGoogle() {
    var userInfo = JSON.stringify({
      "id":"115918222690896264237",
      "name":"User X Critic",
      "email":"userX.critic@fakegmail.com",
      "photoUrl":"https://lh3.googleusercontent.com/a-/AOh14GjDPKFlpDw5hEJk3ZwL4z0hARDm5hBulUHVv2yq=s96-c",
      "firstName":"User X",
      "lastName":"Critic",
      "authToken":"<DOES NOT MATTER>",
      "idToken":"<DOES NOT MATTER>",
      "response":{
        "KR":"115918222690896264237",
        "sd":"User Critic",
        "oT":"User",
        "qR":"Critic",
        "wI":"https://lh3.googleusercontent.com/a-/AOh14GjDPKFlpDw5hEJk3ZwL4z0hARDm5hBulUHVv2yq=s96-c",
        "lt":"userX.critic@gmail.com"
      },
      "provider":"GOOGLE"
    });

    browser.executeScript(`localStorage.setItem('user', '${userInfo}')`);
  }

  simulateLoginOwnerUserWithGoogle() {
    var userInfo = JSON.stringify({
      "id": "104919415888367343636",
      "name": "Owner Critic",
      "email": "owner.critic@gmail.com",
      "photoUrl": "https://lh3.googleusercontent.com/a-/AOh14Gg5HyyJJ67wVj02K4da1GeGvqPTbLS36NkSCWay=s96-c",
      "firstName": "Owner",
      "lastName": "Critic",
      "authToken":"<DOES NOT MATTER>",
      "idToken":"<DOES NOT MATTER>",
      "response": {
        "KR": "104919415888367343636",
        "sd": "Owner Critic",
        "oT": "Owner",
        "qR": "Critic",
        "wI": "https://lh3.googleusercontent.com/a-/AOh14Gg5HyyJJ67wVj02K4da1GeGvqPTbLS36NkSCWay=s96-c",
        "lt": "owner.critic@gmail.com"
      },
      "provider": "GOOGLE"
    });
    browser.executeScript(`localStorage.setItem('user', '${userInfo}')`);
  }

  simulateLoginAdmonUserWithGoogle() {
    var userInfo = JSON.stringify({
      "id": "116929492511008857096",
      "name": "Diego Parra",
      "email": "diego.parra.leal@gmail.com",
      "photoUrl": "https://lh3.googleusercontent.com/a-/AOh14Ggg_uw6vJGERDZ1CE88_oK8_P0pR6kp3y9hGO6ECw=s96-c",
      "firstName": "Diego",
      "lastName": "Parra",
      "authToken":"<DOES NOT MATTER>",
      "idToken":"<DOES NOT MATTER>",
      "response": {
        "KR": "116929492511008857096",
        "sd": "Diego Parra",
        "oT": "Diego",
        "qR": "Parra",
        "wI": "https://lh3.googleusercontent.com/a-/AOh14Ggg_uw6vJGERDZ1CE88_oK8_P0pR6kp3y9hGO6ECw=s96-c",
        "lt": "diego.parra.leal@gmail.com"
      },
      "provider": "GOOGLE"
    });
    browser.executeScript(`localStorage.setItem('user', '${userInfo}')`);
  }

  async goToRestaurants(): Promise<unknown> {
    return browser.get(browser.baseUrl + "/restaurants");
  }

  async goToRegister(): Promise<unknown> {
    return browser.get(browser.baseUrl + "/register");
  }

  async clickMenuRestaurants(){
    return element(by.cssContainingText("#crt-menu-items button span", "Restaurants")).click().then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async clickMenuPendingReviews(){
    return element(by.cssContainingText("#crt-menu-items button span", "Pending Reviews")).click().then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }

  async clickMenuPendingUsers(){
    return element(by.cssContainingText("#crt-menu-items button span", "Users")).click().then( () => browser.sleep(DEFAULT_CRITIC_SLEEP_TIME));
  }
}
