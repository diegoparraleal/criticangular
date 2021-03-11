import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, Restaurant } from './models';
import { featureKey } from './reducers';

export const GetCriticAppState = createFeatureSelector<AppState>(
  featureKey
);

export const GetCurrentUser = createSelector(
  GetCriticAppState,
  (state: AppState) => state.user
);

export const NeedsRegister = createSelector(
  GetCriticAppState,
  (state: AppState) => state.needsRegister
);


export const GetCurrentAppUser = createSelector(
  GetCriticAppState,
  (state: AppState) => state.appUser
);

export const GetRestaurants = createSelector(
  GetCriticAppState,
  (state: AppState) => state.restaurants
);

export const GetRestaurantsHaveMoreResults = createSelector(
  GetCriticAppState,
  (state: AppState) => state.restaurantsHaveMoreResults
);

export const GetRestaurantWithDetails = createSelector(
  GetCriticAppState,
  (state: AppState) => state.restaurantWithDetails
);

export const GetReviewsHaveMoreResults = createSelector(
  GetCriticAppState,
  (state: AppState) => state.reviewsHaveMoreResults
);

export const GetPendingReviews = createSelector(
  GetCriticAppState,
  (state: AppState) => state.pendingReviews
);

export const GetUsers = createSelector(
  GetCriticAppState,
  (state: AppState) => state.users
);

