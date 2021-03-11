import { SocialUser } from 'angularx-social-login';
import { createAction, props } from '@ngrx/store';
import { AppUser, Review, Restaurant, RestaurantWithDetails, ReviewWithRestaurant, Reply } from './models';

export const Init = createAction(
  '[ROOT] Init'
);

export const Login = createAction(
  '[ROOT] Login',
);

export const SetUser = createAction(
  '[ROOT] Set User',
  props<{ user: SocialUser; }>()
);

export const Logout = createAction(
  '[ROOT] Logout'
);

export const RegisterAppUser = createAction(
  '[ROOT] Register App User',
  props<{ user: SocialUser; }>()
);

export const UnregisterAppUser = createAction(
  '[ROOT] Forget Register App User'
);

export const LoadAppUser = createAction(
  '[ROOT] Load App User',
  props<{ user: SocialUser; }>()
);

export const CreateAppUser = createAction(
  '[ROOT] Create App User',
  props<{user: AppUser}>()
);

export const SetAppUser = createAction(
  '[ROOT] Set App User',
  props<{user: AppUser}>()
);

export const LoadUsers = createAction(
  '[USERS] Load',
  props<{name: string}>()
);

export const EditUser = createAction(
  '[USER] Edit',
  props<{user: AppUser}>()
);

export const DeleteUser = createAction(
  '[USER] Delete',
  props<{userId: number}>()
);

export const LoadUsersSucceeded = createAction(
  '[USERS] Load Succeeded',
  props<{users: AppUser[]}>()
);

export const LoadUsersFailed = createAction(
  '[USERS] Load Failed'
);

export const LoadRestaurants = createAction(
  '[RESTAURANTS] Load',
  props<{rating: number, name: string, ownerId: number, page: number}>()
);

export const AppendRestaurants = createAction(
  '[RESTAURANTS] Append',
  props<{restaurants: Restaurant[]}>()
);

export const LoadRestaurantsSucceeded = createAction(
  '[RESTAURANTS] Load success',
  props<{restaurants: Restaurant[]}>()
);

export const LoadRestaurantsFailed = createAction(
  '[RESTAURANTS] Load failed'
);

export const LoadRestaurantsNoResults = createAction(
  '[RESTAURANTS] Load returned no results'
);

export const AddRestaurant = createAction(
  '[RESTAURANTS] Add',
  props<{restaurant: Restaurant}>()
);

export const EditRestaurant = createAction(
  '[RESTAURANTS] Edit',
  props<{restaurant: Restaurant}>()
);

export const DeleteRestaurant = createAction(
  '[RESTAURANTS] Delete',
  props<{restaurantId: number}>()
);

export const LoadRestaurantWithDetails = createAction(
  '[RESTAURANT DETAIL] Load',
  props<{id: number}>()
);

export const LoadRestaurantWithDetailsSucceeded = createAction(
  '[RESTAURANT DETAIL] Load success',
  props<{restaurantWithDetails: RestaurantWithDetails}>()
);

export const LoadRestaurantWithDetailsFailed = createAction(
  '[RESTAURANT DETAIL] Load failed'
);

export const LoadRestaurantReviews = createAction(
  '[RESTAURANT] Load restaurant reviews',
  props<{restaurantId:number, page: number}>()
);

export const AppendRestaurantReviews = createAction(
  '[RESTAURANT] Append restaurant reviews',
  props<{reviews: Review[]}>()
);

export const LoadRestaurantReviewsNoResults = createAction(
  '[RESTAURANT] Load restaurant reviews returned no results'
);

export const AddRestaurantReview = createAction(
  '[RESTAURANT] Add review',
  props<{restaurantId:number, review: Review}>()
);

export const EditRestaurantReview = createAction(
  '[REVIEW] Edit review',
  props<{restaurantId:number, review: Review}>()
);

export const DeleteRestaurantReview = createAction(
  '[REVIEW] Delete review',
  props<{restaurantId:number, reviewId: number}>()
);

export const LoadPendingReviews = createAction(
  '[REVIEWS] Pending reviews',
  props<{ownerId: number}>()
);

export const LoadPendingReviewsSucceeded = createAction(
  '[REVIEWS] Pending reviews success',
  props<{pendingReviews: ReviewWithRestaurant[]}>()
);

export const LoadPendingReviewsFailed = createAction(
  '[REVIEWS] Pending reviews failed'
);

export const PostReplyForReview = createAction(
  '[REVIEW] Post reply',
  props<{restaurantId:number, reviewId:number, reply: Reply, isInPendingReviews: boolean}>()
);
