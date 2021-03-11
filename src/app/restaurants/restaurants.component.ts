import { AppUser, Role } from './../../state/models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/state/models';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { RestaurantEditableComponent } from '../restaurant.editable/restaurant.editable.component';
import * as CriticStoreSelectors from 'src/state/selectors';
import * as CriticStoreActions from 'src/state/actions';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'critic-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

  rating: number = null;
  searchText: string = null;
  appUser: AppUser;
  restaurants$: Observable<Restaurant[]> = this.store.select(CriticStoreSelectors.GetRestaurants);
  restaurantsHaveMoreResults$: Observable<boolean> = this.store.select(CriticStoreSelectors.GetRestaurantsHaveMoreResults);
  newRestaurant: Restaurant;
  isOwner: boolean = false;
  isAdmin: boolean = false;
  page: number = 0;

  constructor(private router: Router,
              private dialog: MatDialog,
              private store: Store<{ restaurants: Restaurant[] }>) { }

  ngOnInit(): void {
    this.store.select(CriticStoreSelectors.GetCurrentAppUser)
              .pipe(filter(user => user != null))
              .subscribe(user => this.initialize(user));
  }

  initialize(user: AppUser): void {
    this.appUser = user;
    this.loadRestaurants();
  }

  loadRestaurants(){
    let ownerId:number = null;
    if (this.appUser?.role == Role.Owner){
      ownerId = this.appUser.id;
      this.isOwner = true;
    } else if (this.appUser?.role == Role.Admin){
      this.isAdmin = true;
    }
    this.store.dispatch(CriticStoreActions.LoadRestaurants({rating: this.rating, name: this.searchText, ownerId: ownerId, page: this.page}));
  }

  filterRestaurantsByRating(rating){
    this.rating = rating;
    this.page = 0;
    this.loadRestaurants();
  }

  clearTextFilter(){
    this.searchText = null;
    this.page = 0;
    this.loadRestaurants();
  }

  filterRestaurantsByText(){
    this.page = 0;
    this.loadRestaurants();
  }

  loadMore(){
    this.page++;
    this.loadRestaurants();
  }

  goToReviews(restaurant:Restaurant){
    this.router.navigate(['/restaurants', restaurant.id]);
  }

  addRestaurant(){
    this.newRestaurant = {
      owner: this.appUser.id
    };
    const dialogRef = this.dialog.open(RestaurantEditableComponent, {data: {restaurant: this.newRestaurant}, disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
      if (result == true){
        this.store.dispatch(CriticStoreActions.AddRestaurant({restaurant: this.newRestaurant}));
      }
    });
  }

  deleteRestaurant(restaurant: Restaurant){
    const dialogRef = this.dialog.open(ConfirmationComponent, {data: "Are you sure you want to delete this restaurant?"});
    dialogRef.afterClosed().subscribe(result => {
      if (result == true){
        this.store.dispatch(CriticStoreActions.DeleteRestaurant({restaurantId: restaurant.id}));
      }
    });
  }

  editRestaurant(restaurant: Restaurant){
    let updatedRestaurant = Object.assign({}, restaurant);
    const dialogRef = this.dialog.open(RestaurantEditableComponent, {data: {restaurant:updatedRestaurant, editing: true, disableClose: true}});
    dialogRef.afterClosed().subscribe(result => {
      if (result == true){
        this.store.dispatch(CriticStoreActions.EditRestaurant({restaurant: updatedRestaurant}));
      }
    });
  }

}
