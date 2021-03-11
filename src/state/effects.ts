import { EditRestaurantReview, AppendRestaurantReviews } from './actions';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ApiService } from 'src/services/api.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, catchError, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, from, of } from 'rxjs';
import * as CriticStoreActions from 'src/state/actions';
import * as CriticStoreSelectors from 'src/state/selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class CriticEffects {

  constructor( private actions$: Actions,
               private apiService: ApiService,
               private authService: SocialAuthService,
               private store: Store) {
  }

  // Initialize the app
  Init$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.Init),
        mergeMap(() => of(localStorage.getItem('user'))
                            .pipe(
                              map((sUser) => JSON.parse(sUser)),
                              map((user) => CriticStoreActions.SetUser( {user: user})),
                              catchError(() => EMPTY)
                            )
        )
    );
  });

  // Performs a login
  Login$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.Login),
        mergeMap(() => from(this.authService.signIn(GoogleLoginProvider.PROVIDER_ID))
                            .pipe(
                              tap((user) => localStorage.setItem('user', JSON.stringify(user))),
                              map((user) => CriticStoreActions.SetUser( {user: user})),
                              catchError(() => EMPTY)
                            )
        )
    );
  });

  // Performs a logout
  Logout$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.Logout),
        mergeMap(() => from(this.authService.signOut(true).catch(() => EMPTY))
                            .pipe(
                              tap(() => localStorage.removeItem('user')),
                              switchMap( () => [
                                CriticStoreActions.SetUser( {user: null}),
                                CriticStoreActions.SetAppUser( {user: null}),
                                CriticStoreActions.UnregisterAppUser()
                              ]),
                              catchError(() => {
                                localStorage.removeItem('user');
                                return switchMap( () => [
                                  CriticStoreActions.SetUser( {user: null}),
                                  CriticStoreActions.SetAppUser( {user: null}),
                                  CriticStoreActions.UnregisterAppUser()
                                ]);
                              })
                            )
        )
    );
  });

  // Loads an app user
  LoadAppUser$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.LoadAppUser),
        mergeMap((action) => this.apiService.loadAppUser(action.user)
                            .pipe(
                              map((user) => CriticStoreActions.SetAppUser( {user: user})),
                              catchError(() => of(CriticStoreActions.RegisterAppUser( {user: action.user} )))
                            )
        )
    );
  });

  // Create an app user
  CreateAppUser$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.CreateAppUser),
        mergeMap((action) => this.apiService.createAppUser(action.user)
                           .pipe(
                              map((createdUser) => CriticStoreActions.SetAppUser( {user: createdUser})),
                              catchError(() => EMPTY)
                           )
        )
    );
  });


  // Load all app users
  LoadUsers$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.LoadUsers),
        mergeMap((action) => this.apiService.getUsers(action.name)
                           .pipe(
                             map(users => CriticStoreActions.LoadUsersSucceeded( {users: users})),
                             catchError(() => of(CriticStoreActions.LoadUsersFailed()))
                           )
        )
    );
  });

  // Edit a user
  EditUser$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.EditUser),
        withLatestFrom(this.store.select(CriticStoreSelectors.GetCurrentAppUser)),
        mergeMap(([action, appUser]) => this.apiService.editUser(action.user)
                            .pipe(
                              map(() => CriticStoreActions.LoadUsers({name: null})),
                              catchError(() => EMPTY)
                            )
        )
    );
  });

  // Delete a user
  DeleteUser$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.DeleteUser),
        mergeMap((action) => this.apiService.deleteUser(action.userId)
                            .pipe(
                              map(() => CriticStoreActions.LoadUsers({name: null})),
                              catchError(() => EMPTY)
                            )
        )
    );
  });

  // Load all restaurants
  LoadRestaurants$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.LoadRestaurants),
        mergeMap((action) => this.apiService.getRestaurants(action.rating, action.name, action.ownerId, action.page)
                           .pipe(
                             map(restaurants => {
                                if (action.page > 0 && restaurants.length > 0)
                                  return CriticStoreActions.AppendRestaurants( {restaurants: restaurants});
                                else if (action.page > 0 && restaurants.length == 0)
                                  return CriticStoreActions.LoadRestaurantsNoResults();
                                return CriticStoreActions.LoadRestaurantsSucceeded( {restaurants: restaurants});
                             }),
                             catchError(() => of(CriticStoreActions.LoadRestaurantsFailed()))
                           )
        )
    );
  });

  // Load a specific restaurant detail
  LoadRestaurant$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.LoadRestaurantWithDetails),
        mergeMap((action) => this.apiService.getRestaurant(action.id)
                           .pipe(
                             map(restaurantWithDetails => CriticStoreActions.LoadRestaurantWithDetailsSucceeded( {restaurantWithDetails: restaurantWithDetails})),
                             catchError(() => of(CriticStoreActions.LoadRestaurantWithDetailsFailed()))
                           )
        )
    );
  });

  // Load a specific restaurant reviews
  LoadRestaurantReviews$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.LoadRestaurantReviews),
        mergeMap((action) => this.apiService.getRestaurantReviews(action.restaurantId, action.page)
                            .pipe(
                              map(reviews => {
                                if (reviews.length == 0)
                                  return CriticStoreActions.LoadRestaurantReviewsNoResults();
                                return CriticStoreActions.AppendRestaurantReviews( {reviews: reviews})
                              }),
                              catchError(() => of(CriticStoreActions.LoadRestaurantWithDetailsFailed()))
                            )
        )
    );
  });

  // Add a new restaurant
  AddRestaurant$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.AddRestaurant),
        withLatestFrom(this.store.select(CriticStoreSelectors.GetCurrentAppUser)),
        mergeMap(([action, appUser]) => this.apiService.addRestaurant(action.restaurant)
                           .pipe(
                             map(() => CriticStoreActions.LoadRestaurants({rating: null, name: null, ownerId: appUser.id, page: 0})),
                             catchError(() => of(CriticStoreActions.LoadRestaurantWithDetailsFailed()))
                           )
        )
    );
  });

  // Edit a restaurant
  EditRestaurant$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.EditRestaurant),
        withLatestFrom(this.store.select(CriticStoreSelectors.GetCurrentAppUser)),
        mergeMap(([action, appUser]) => this.apiService.editRestaurant(action.restaurant)
                            .pipe(
                              map(() => CriticStoreActions.LoadRestaurants({rating: null, name: null, ownerId: appUser.role == "owner" ? appUser.id : null, page: 0})),
                              catchError(() => EMPTY)
                            )
        )
    );
  });

  // Delete a restaurant
  DeleteRestaurant$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.DeleteRestaurant),
        mergeMap((action) => this.apiService.deleteRestaurant(action.restaurantId)
                            .pipe(
                              map(() => CriticStoreActions.LoadRestaurants({rating: null, name: null, ownerId: null, page: 0})),
                              catchError(() => EMPTY)
                            )
        )
    );
  });

  // Add a restaurant review
  AddRestaurantReview$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.AddRestaurantReview),
        mergeMap((action) => this.apiService.postReview(action.restaurantId, action.review)
                           .pipe(
                              map((o) => CriticStoreActions.LoadRestaurantWithDetails( {id: action.restaurantId})),
                              catchError(() => EMPTY)
                           )
        )
    );
  });

  // Edit a restaurant review
  EditRestaurantReview$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.EditRestaurantReview),
        mergeMap((action) => this.apiService.editReview(action.restaurantId, action.review)
                            .pipe(
                              map((o) => CriticStoreActions.LoadRestaurantWithDetails( {id: action.restaurantId})),
                              catchError(() => EMPTY)
                            )
        )
    );
  });

  // Delete a restaurant review
  DeleteRestaurantReview$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.DeleteRestaurantReview),
        mergeMap((action) => this.apiService.deleteReview(action.restaurantId, action.reviewId)
                            .pipe(
                              map((o) => CriticStoreActions.LoadRestaurantWithDetails( {id: action.restaurantId})),
                              catchError(() => EMPTY)
                            )
        )
    );
  });

  // Load all pending reviews
  LoadPendingReviews$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.LoadPendingReviews),
        mergeMap((action) => this.apiService.getPendingReviews(action.ownerId)
                           .pipe(
                             map(pendingReviews => CriticStoreActions.LoadPendingReviewsSucceeded( {pendingReviews: pendingReviews})),
                             catchError(() => of(CriticStoreActions.LoadPendingReviewsFailed()))
                           )
        )
    );
  });

  // Post a reply for a review
  PostReplyForReview$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CriticStoreActions.PostReplyForReview),
        withLatestFrom(this.store.select(CriticStoreSelectors.GetCurrentAppUser)),
        mergeMap(([action, appUser]) => this.apiService.postReply(action.restaurantId, action.reviewId, action.reply)
                           .pipe(
                              map(() => {
                                if (action.isInPendingReviews)
                                  return CriticStoreActions.LoadPendingReviews( {ownerId: appUser.id});
                                return CriticStoreActions.LoadRestaurantWithDetails( {id: action.restaurantId});
                              }),
                              catchError(() => EMPTY)
                           )
        )
    );
  });

}
