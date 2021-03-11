import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Restaurant } from 'src/state/models';

@Component({
  selector: 'restaurant-card',
  templateUrl: './restaurant.card.component.html',
  styleUrls: ['./restaurant.card.component.scss']
})
export class RestaurantCardComponent implements OnInit {

  @Input() restaurant: Restaurant;
  @Input() showEdit: boolean = false;
  @Input() showDelete: boolean = false;
  @Input() showReviews: boolean = true;
  @Output() onReviewsClick = new EventEmitter<Restaurant>();
  @Output() onEditClick = new EventEmitter<Restaurant>();
  @Output() onDeleteClick = new EventEmitter<Restaurant>();


  constructor() { }

  ngOnInit() {
  }

  editRestaurant(){
    this.onEditClick.emit(this.restaurant);
  }

  deleteRestaurant(){
    this.onDeleteClick.emit(this.restaurant);
  }

  goToReviews(){
    this.onReviewsClick.emit(this.restaurant);
  }

}
