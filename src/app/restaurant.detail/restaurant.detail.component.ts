import { LoadRestaurantReviews } from './../../state/actions';
import { SocialUser } from 'angularx-social-login';
import { AppUser, Reply, Restaurant, RestaurantWithDetails, Review } from './../../state/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CriticStoreActions from 'src/state/actions';
import * as CriticStoreSelectors from 'src/state/selectors';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'critic-restaurant.detail',
  templateUrl: './restaurant.detail.component.html',
  styleUrls: ['./restaurant.detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant;
  bestReview: Review;
  worstReview: Review;
  newReview: Review = null;
  reviews: Review[];
  addingReview: boolean = false;
  currentUser: SocialUser;
  appUser: AppUser;
  page: number = 0;
  reviewsHaveMoreResults$: Observable<boolean> = this.store.select(CriticStoreSelectors.GetReviewsHaveMoreResults);

  constructor(private route: ActivatedRoute,
              private store: Store,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var restaurantId = Number(params['id']);
      this.store.dispatch(CriticStoreActions.LoadRestaurantWithDetails({id: restaurantId}));
    });

    this.store.select(CriticStoreSelectors.GetRestaurantWithDetails).subscribe(r => this.loadContext(r));
    this.store.select(CriticStoreSelectors.GetCurrentUser).subscribe(user => this.currentUser = user);
    this.store.select(CriticStoreSelectors.GetCurrentAppUser).subscribe(user => this.appUser = user);
  }

  loadContext(restaurantWithDetails: RestaurantWithDetails){
    this.restaurant = restaurantWithDetails?.restaurant;
    this.bestReview = restaurantWithDetails?.bestReview;
    this.worstReview = restaurantWithDetails?.worstReview;
    this.reviews = restaurantWithDetails?.reviews;
  }

  loadMore(){
    this.page ++;
    this.store.dispatch(CriticStoreActions.LoadRestaurantReviews({restaurantId: this.restaurant.id, page: this.page}));
  }

  addReview(){
    this.addingReview = true;
    this.newReview = {
      comment: "",
      date: new Date(),
      userImage: this.currentUser?.photoUrl,
      user: this.appUser.id,
      rating: 0
    };
  }

  cancelAddition(){
    this.addingReview = false;
    this.newReview = null;
  }

  editReview(review: Review){
    this.store.dispatch(CriticStoreActions.EditRestaurantReview({restaurantId: this.restaurant.id, review: review}));
  }

  deleteReview(review: Review){
    const dialogRef = this.dialog.open(ConfirmationComponent, {data: "Are you sure you want to delete this review?"});
    dialogRef.afterClosed().subscribe(result => {
      if (result == true){
        this.store.dispatch(CriticStoreActions.DeleteRestaurantReview({restaurantId: this.restaurant.id, reviewId: review.id}));
      }
    });
  }

  postReview(review: Review){
    this.store.dispatch(CriticStoreActions.AddRestaurantReview({restaurantId: this.restaurant.id, review: review}));
    this.addingReview = false;
    this.newReview = null;
  }

  postReply(restaurantId: number, reviewId: number, reply: Reply){
    reply.user = this.appUser.id;
    this.store.dispatch(CriticStoreActions.PostReplyForReview({restaurantId: restaurantId, reviewId: reviewId, reply: reply, isInPendingReviews: false}));
  }

}
