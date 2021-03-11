import { AppendRestaurantReviews } from './actions';
import { createReducer, on } from '@ngrx/store';
import { AppState } from './models';
import * as CriticStoreActions from 'src/state/actions';

export const featureKey = 'critic';
export const RESTAURANTS_PER_PAGE = 5;
export const REVIEWS_PER_PAGE = 5;
export const initialState: AppState = {
};

export const _reducer = createReducer(
  initialState,
  on(CriticStoreActions.SetUser, (state, { user }) => ({ ... state, user: user })),
  on(CriticStoreActions.RegisterAppUser, (state) => ({ ... state, needsRegister: true })),
  on(CriticStoreActions.UnregisterAppUser, (state) => ({ ... state, needsRegister: false })),
  on(CriticStoreActions.SetAppUser, (state, { user }) => ({ ... state, appUser: user })),
  on(CriticStoreActions.LoadUsersSucceeded, (state, { users }) => ({ ... state, users: users })),
  on(CriticStoreActions.LoadUsersFailed, (state) => ({ ... state, users: [] })),
  on(CriticStoreActions.LoadRestaurantsSucceeded, (state, { restaurants }) => ({ ... state,
                                                                                 restaurantsHaveMoreResults: (restaurants.length >= RESTAURANTS_PER_PAGE),
                                                                                 restaurants: restaurants
                                                                               })),
  on(CriticStoreActions.AppendRestaurants, (state, { restaurants }) => ({ ... state,
                                                                          restaurantsHaveMoreResults: (restaurants.length >= RESTAURANTS_PER_PAGE),
                                                                          restaurants:  [...state.restaurants, ...restaurants]
                                                                        })),
  on(CriticStoreActions.LoadRestaurantsFailed, (state) => ({ ... state, restaurants: [] })),
  on(CriticStoreActions.LoadRestaurantsNoResults, (state) => ({ ... state, restaurantsHaveMoreResults: false })),
  on(CriticStoreActions.LoadRestaurantWithDetailsSucceeded, (state, { restaurantWithDetails }) => ({ ... state,
                                                                                                     reviewsHaveMoreResults: (restaurantWithDetails.reviews.length >= REVIEWS_PER_PAGE),
                                                                                                     restaurantWithDetails: restaurantWithDetails
                                                                                                   })),
  on(CriticStoreActions.LoadRestaurantWithDetailsFailed, (state) => ({ ... state, restaurant: null })),
  on(CriticStoreActions.AppendRestaurantReviews, (state, {reviews}) => ({ ... state,
                                                                          reviewsHaveMoreResults: (reviews.length >= REVIEWS_PER_PAGE),
                                                                          restaurantWithDetails: {
                                                                              ...state.restaurantWithDetails,
                                                                              reviews: [...state.restaurantWithDetails.reviews, ... reviews]
                                                                          }
                                                                        })),
  on(CriticStoreActions.LoadRestaurantReviewsNoResults, (state) => ({ ... state, reviewsHaveMoreResults: false })),
  on(CriticStoreActions.LoadPendingReviewsSucceeded, (state, { pendingReviews }) => ({ ... state, pendingReviews: pendingReviews })),
  on(CriticStoreActions.LoadPendingReviewsFailed, (state) => ({ ... state, pendingReviews: [] })),
);

export function reducer(state, action) {
  return _reducer(state, action);
}
