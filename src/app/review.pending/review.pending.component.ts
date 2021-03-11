import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppUser, Reply, Restaurant, Review, ReviewWithRestaurant } from 'src/state/models';
import { filter } from 'rxjs/operators';
import * as CriticStoreSelectors from 'src/state/selectors';
import * as CriticStoreActions from 'src/state/actions';

@Component({
  selector: 'review-pending',
  templateUrl: './review.pending.component.html',
  styleUrls: ['./review.pending.component.scss']
})
export class ReviewPendingComponent implements OnInit {

  appUser: AppUser;
  reviewsWithRestaurant$: Observable<ReviewWithRestaurant[]> = this.store.select(CriticStoreSelectors.GetPendingReviews);
  constructor(private store: Store) { }

  ngOnInit() {
    this.store.select(CriticStoreSelectors.GetCurrentAppUser)
              .pipe(filter(user => user != null))
              .subscribe(user => this.initialize(user));
  }

  initialize(user: AppUser): void {
    this.appUser = user;
    this.store.dispatch(CriticStoreActions.LoadPendingReviews({ownerId: this.appUser.id}));
  }

  postReply(restaurantId: number, reviewId: number, reply: Reply){
    reply.user = this.appUser.id;
    this.store.dispatch(CriticStoreActions.PostReplyForReview({restaurantId: restaurantId, reviewId: reviewId, reply: reply, isInPendingReviews: true}));
  }

}
