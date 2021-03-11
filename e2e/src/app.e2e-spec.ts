import { CriticRestaurantDetailPage } from './critic.restaurant.detail.po';
import { browser, logging, protractor } from 'protractor';
import { CriticAppPage } from './critic.homepage.po';
import { CriticRestaurantsPage } from './critic.restaurants.po';
import { CriticRestaurantPendingReviewsPage } from './critic.restaurants.pendingreviews';
import { CriticRegisterPage } from './critic.restaurants.register';
import { CriticUsersPage } from './critic.restaurants.users';

browser.waitForAngularEnabled(false);
//var origFn = browser.driver.controlFlow().execute;

// browser.driver.controlFlow().execute = function() {
//   var args = arguments;

//   // queue 100ms wait
//   origFn.call(browser.driver.controlFlow(), function() {
//     return protractor.promise.delayed(100);
//   });

//   return origFn.apply(browser.driver.controlFlow(), args);
// };

describe('Critic User journey for new user', () => {
  let mainPage: CriticAppPage;
  let registerPage: CriticRegisterPage;
  let restaurantsPage: CriticRestaurantsPage;

  beforeEach(() => {
    mainPage = new CriticAppPage();
    registerPage = new CriticRegisterPage();
    restaurantsPage = new CriticRestaurantsPage();
  });

  it('Should display welcome message, logo and welcome image', async () => {
    await mainPage.navigateTo();
    expect(await mainPage.getAppDescription()).toEqual('Welcome to critic, the leading world site for restaurant reviews!');
    expect(await mainPage.getAppLogo()).toEqual('http://localhost:4200/assets/logo.png');
    expect(await mainPage.getAppWelcomeImage()).toEqual('http://localhost:4200/assets/home-image.jpg');
  });

  it('Should register the user', async () => {
    mainPage.simulateLoginNewUserWithGoogle();
    await mainPage.goToRegister();
    await browser.sleep(500);
    await registerPage.selectRegularUser();
    expect(await restaurantsPage.getNumberOfRestaurants()).toEqual(5);
  });

  it('Should be able to logout', async () => {
    await mainPage.performLogout();
  });
});

describe('Critic User journey', () => {
  let mainPage: CriticAppPage;
  let restaurantsPage: CriticRestaurantsPage;
  let restaurantDetailPage: CriticRestaurantDetailPage;

  beforeEach(() => {
    mainPage = new CriticAppPage();
    restaurantsPage = new CriticRestaurantsPage();
    restaurantDetailPage = new CriticRestaurantDetailPage();
  });

  it('Should display welcome message, logo and welcome image', async () => {
    await mainPage.navigateTo();
    expect(await mainPage.getAppDescription()).toEqual('Welcome to critic, the leading world site for restaurant reviews!');
    expect(await mainPage.getAppLogo()).toEqual('http://localhost:4200/assets/logo.png');
    expect(await mainPage.getAppWelcomeImage()).toEqual('http://localhost:4200/assets/home-image.jpg');
  });

  it('Should go to restaurants for regular user', async () => {
    mainPage.simulateLoginNormalUserWithGoogle();
    await mainPage.goToRestaurants();
    await browser.sleep(500);
    expect(await restaurantsPage.getNumberOfRestaurants()).toEqual(5);
    expect(await restaurantsPage.getFirstRestaurantName()).toEqual("Mirazur");
    expect(await restaurantsPage.getLastRestaurantName()).toEqual("Noma");
    expect(await restaurantsPage.isAddRestaurantPresent()).toBeFalsy();
  });

  it('Should be able load more', async () => {
    expect(await restaurantsPage.isLoadMorePresent()).toBeTruthy();
    await restaurantsPage.loadMore();
    expect(await restaurantsPage.getNumberOfRestaurants()).toEqual(9);
    expect(await restaurantsPage.isLoadMorePresent()).toBeFalsy();
  });

  it('Should be able to filter by text', async () => {
    await restaurantsPage.setTextFilter("g");
    expect(await restaurantsPage.getNumberOfRestaurants()).toEqual(3);
    await restaurantsPage.clearTextFilter();
    expect(await restaurantsPage.getNumberOfRestaurants()).toEqual(5);
    expect(await restaurantsPage.isLoadMorePresent()).toBeTruthy();
  });

  it('Should be able to filter by rating', async () => {
    await restaurantsPage.setRating(5);
    expect(await restaurantsPage.getNumberOfRestaurants()).toEqual(3);
    expect(await restaurantsPage.getFirstRestaurantName()).toEqual("Mirazur");
    expect(await restaurantsPage.getLastRestaurantName()).toEqual("Gaggan");
  });

  it('Should be able to navigate to restaurant details', async () => {
    await restaurantsPage.setRating(3);
    await restaurantsPage.setTextFilter("grotta");
    await restaurantsPage.navigateToFirstRestaurantDetails();
    expect(await restaurantDetailPage.getRestaurantName()).toBe("Grotta Palazzese");
    expect(await restaurantDetailPage.getTopReviewText()).toBe("We booked for 6pm for dinner on a Wednesday so we could watched the sunset from the table. Even though the table was technically for two hours, the staff let us stay there the whole evening as it was a quiet night with only 3-4 other parties there. Alina (sp) and her team looked after us really well the entire evening.");
    expect(await restaurantDetailPage.getTopReviewRating()).toBe("5");
    expect(await restaurantDetailPage.hasTopReviewAReply()).toBeTruthy();
    expect(await restaurantDetailPage.getTopReviewReply()).toBe("Thank you for making all the way through here!");
    expect(await restaurantDetailPage.getWorstReviewText()).toBe("This unique location is absolutely breathtaking and magical . The magic disappears as soon as you have the deal with the staff, specially the door man and the gentleman at the cashier. They shouldn’t treat customers in such a despicable way, So much attitude and rudeness .The food is overpriced and nothing special.Only the location is worth your time and money. The rest is smoke and mirrors");
    expect(await restaurantDetailPage.getWorstReviewRating()).toBe("2");
    expect(await restaurantDetailPage.hasWorstReviewAReply()).toBeFalsy();
    expect(await restaurantDetailPage.getNumberOfReviews()).toBe(5);
    expect(await restaurantDetailPage.isLoadMorePresent()).toBeTruthy();
    await restaurantDetailPage.loadMore();
    expect(await restaurantDetailPage.getNumberOfReviews()).toBeGreaterThanOrEqual(6);
  });

  it('Should be able to add a review', async () => {
    await restaurantDetailPage.addReview();
    await restaurantDetailPage.addReviewComment("SO SO");
    await restaurantDetailPage.addReviewRating(3);
    await restaurantDetailPage.confirmAddReview();

    await restaurantDetailPage.addReview();
    await restaurantDetailPage.addReviewComment("WORST RESTAURANT EVER!!!");
    await restaurantDetailPage.addReviewRating(1);
    await restaurantDetailPage.confirmAddReview();
    await browser.sleep(500);
    expect(await restaurantDetailPage.getWorstReviewText()).toBe("WORST RESTAURANT EVER!!!");
    expect(await restaurantDetailPage.getWorstReviewRating()).toBe("1");
  });

  it('Should be able to logout', async () => {
    await mainPage.performLogout();
  });
});

describe('Critic Owner journey', () => {
  let mainPage: CriticAppPage;
  let restaurantsPage: CriticRestaurantsPage;
  let restaurantDetailPage: CriticRestaurantDetailPage;
  let restaurantPendingReviewsPage: CriticRestaurantPendingReviewsPage;

  beforeEach(() => {
    mainPage = new CriticAppPage();
    restaurantsPage = new CriticRestaurantsPage();
    restaurantDetailPage = new CriticRestaurantDetailPage();
    restaurantPendingReviewsPage = new CriticRestaurantPendingReviewsPage();
  });

  it('Should display welcome message, logo and welcome image', async () => {
    await mainPage.navigateTo();
    expect(await mainPage.getAppDescription()).toEqual('Welcome to critic, the leading world site for restaurant reviews!');
    expect(await mainPage.getAppLogo()).toEqual('http://localhost:4200/assets/logo.png');
    expect(await mainPage.getAppWelcomeImage()).toEqual('http://localhost:4200/assets/home-image.jpg');
  });

  it('Should go to restaurants for owner user', async () => {
    mainPage.simulateLoginOwnerUserWithGoogle();
    await mainPage.goToRestaurants();
    await browser.sleep(500);
    expect(await restaurantsPage.getNumberOfRestaurants()).toEqual(3);
    expect(await restaurantsPage.getFirstRestaurantName()).toEqual("Gaggan");
    expect(await restaurantsPage.getLastRestaurantName()).toEqual("Grotta Palazzese");
  });

  it('Should allow add a restaurant', async () => {
    expect(await restaurantsPage.isAddRestaurantPresent()).toBeTruthy();
    await restaurantsPage.addRestaurant();
    await restaurantsPage.simulateAddRestaurantFields();
    await restaurantsPage.confirmAddRestaurant();
    expect(await restaurantsPage.getNumberOfRestaurants()).toEqual(4);
  });

  it('Should allow edit a restaurant', async () => {
    await restaurantsPage.setTextFilter("THIS IS A NEW RESTAURANT");
    expect(await restaurantsPage.getFirstRestaurantName()).toBe("THIS IS A NEW RESTAURANT");
    await restaurantsPage.editFirstRestaurant();
    expect(await restaurantsPage.getRestaurantEditName()).toBe("THIS IS A NEW RESTAURANT");
    await restaurantsPage.setRestaurantEditName("THIS IS A MODIFIED RESTAURANT");
    await restaurantsPage.confirmEditRestaurant();
    expect(await restaurantsPage.getNumberOfRestaurants()).toEqual(4);
    await restaurantsPage.clearTextFilter();
    await restaurantsPage.setTextFilter("THIS IS A MODIFIED RESTAURANT");
    expect(await restaurantsPage.getFirstRestaurantName()).toBe("THIS IS A MODIFIED RESTAURANT");
  });

  it('Should allow go to restaurant detail and reply a review', async () => {
    await restaurantsPage.clearTextFilter();
    await restaurantsPage.setTextFilter("grotta");
    await restaurantsPage.navigateToFirstRestaurantDetails();
    expect(await restaurantDetailPage.getRestaurantName()).toBe("Grotta Palazzese");
    expect(await restaurantDetailPage.isAddReviewPresent()).toBeFalsy();
    await restaurantDetailPage.addCommentToFirstReply("You don't know anything about fine dining. Please don't come back");
    await restaurantDetailPage.performReplyToFirstReview();
    expect(await restaurantDetailPage.getWorstReviewReply()).toBe("You don't know anything about fine dining. Please don't come back");
  });

  it('Should allow go to pending reviews', async () => {
    await mainPage.clickMenuPendingReviews();
    expect(await restaurantPendingReviewsPage.getNumberOfReviews()).toEqual(8);
    await restaurantPendingReviewsPage.addCommentToLastReply("THANKS!!!");
    await restaurantPendingReviewsPage.performReplyToLastReview();
    expect(await restaurantPendingReviewsPage.getNumberOfReviews()).toEqual(7);
  });


  it('Should be able to logout', async () => {
    await mainPage.performLogout();
  });

});

describe('Critic Admon journey', () => {
  let mainPage: CriticAppPage;
  let restaurantsPage: CriticRestaurantsPage;
  let restaurantDetailPage: CriticRestaurantDetailPage;
  let usersPage: CriticUsersPage;

  beforeEach(() => {
    mainPage = new CriticAppPage();
    restaurantsPage = new CriticRestaurantsPage();
    restaurantDetailPage = new CriticRestaurantDetailPage();
    usersPage = new CriticUsersPage();
  });

  it('Should display welcome message, logo and welcome image', async () => {
    await mainPage.navigateTo();
    expect(await mainPage.getAppDescription()).toEqual('Welcome to critic, the leading world site for restaurant reviews!');
    expect(await mainPage.getAppLogo()).toEqual('http://localhost:4200/assets/logo.png');
    expect(await mainPage.getAppWelcomeImage()).toEqual('http://localhost:4200/assets/home-image.jpg');
  });

  it('Should go to restaurants for admin user', async () => {
    mainPage.simulateLoginAdmonUserWithGoogle();
    await mainPage.goToRestaurants();
    await browser.sleep(500);
    expect(await restaurantsPage.getNumberOfRestaurants()).toEqual(5);
    expect(await restaurantsPage.getFirstRestaurantName()).toEqual("Mirazur");
    expect(await restaurantsPage.getLastRestaurantName()).toEqual("Noma");
    expect(await restaurantsPage.isAddRestaurantPresent()).toBeFalsy();
  });

  it('Should allow edit a restaurant', async () => {
    await restaurantsPage.setTextFilter("THIS IS A MODIFIED RESTAURANT");
    expect(await restaurantsPage.getFirstRestaurantName()).toBe("THIS IS A MODIFIED RESTAURANT");
    await restaurantsPage.editFirstRestaurant();
    expect(await restaurantsPage.getRestaurantEditName()).toBe("THIS IS A MODIFIED RESTAURANT");
    await restaurantsPage.setRestaurantEditName("THIS IS A ADMON MODIFIED RESTAURANT");
    await restaurantsPage.confirmEditRestaurant();
    await restaurantsPage.clearTextFilter();
    await restaurantsPage.setTextFilter("THIS IS A ADMON MODIFIED RESTAURANT");
    expect(await restaurantsPage.getFirstRestaurantName()).toBe("THIS IS A ADMON MODIFIED RESTAURANT");
  });

  it('Should allow delete a restaurant', async () => {
    await restaurantsPage.deleteFirstRestaurant();
    await restaurantsPage.confirmDeleteRestaurant();
    await restaurantsPage.clearTextFilter();
    await restaurantsPage.setTextFilter("THIS IS A ADMON MODIFIED RESTAURANT");
    expect(await restaurantsPage.getNumberOfRestaurants()).toEqual(0);
  });

  it('Should allow edit a review', async () => {
    await restaurantsPage.clearTextFilter();
    await restaurantsPage.setTextFilter("grotta");
    await restaurantsPage.navigateToFirstRestaurantDetails();
    expect(await restaurantDetailPage.getRestaurantName()).toBe("Grotta Palazzese");
    expect(await restaurantDetailPage.isAddReviewPresent()).toBeFalsy();

    await restaurantDetailPage.editFirstReview();
    await restaurantDetailPage.modifyReviewComment("REVIEW TO BE DELETED");
    await restaurantDetailPage.modifyReplyComment("REPLY TO BE DELETED");
    await restaurantDetailPage.confirmEditReview();
    await restaurantDetailPage.editSecondReview();
    await restaurantDetailPage.modifyReviewComment("REVIEW TO BE DELETED");
    await restaurantDetailPage.modifyReplyComment("REPLY TO BE DELETED");
    await restaurantDetailPage.confirmEditReview();
  });

  it('Should allow delete a review', async () => {
    await restaurantDetailPage.deleteFirstReview();
    await restaurantDetailPage.confirmDeleteReview();
    await restaurantDetailPage.deleteFirstReview();
    await restaurantDetailPage.confirmDeleteReview();
  });

  it('Should allow view users', async () => {
    await mainPage.clickMenuPendingUsers();
    expect(await usersPage.getNumbersOfUsers()).toEqual(11);;
  });

  it('Should allow filter users', async () => {
    await usersPage.setFilter("owner");
    expect(await usersPage.getNumbersOfUsers()).toEqual(1);
    expect(await usersPage.getFirstUserName()).toEqual("Owner - Critic");
    expect(await usersPage.getFirstUserEmail()).toEqual("owner.critic@gmail.com");
    expect(await usersPage.getFirstUserRole()).toEqual("Owner");
  });

  it('Should allow edit users', async () => {
    await usersPage.editFirstUser();
    await usersPage.changeRole("User");
    await usersPage.confirmEditUser();
    await usersPage.clearFilter();
    await usersPage.setFilter("Owner");
    expect(await usersPage.getFirstUserRole()).toEqual("User");
    await usersPage.editFirstUser();
    await usersPage.changeRole("Owner");
    await usersPage.confirmEditUser();
  });

  it('Should allow delete users', async () => {
    await usersPage.clearFilter();
    await usersPage.setFilter("User Critic");
    await usersPage.deleteFirstUser();
    await usersPage.confirmDeleteUser();
    expect(await usersPage.getNumbersOfUsers()).toEqual(10);;
  });

  it('Should be able to logout', async () => {
    await mainPage.performLogout();
  });

});
