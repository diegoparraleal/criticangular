import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Restaurant } from 'src/state/models';

@Component({
  selector: 'restaurant.editable',
  templateUrl: './restaurant.editable.component.html',
  styleUrls: ['./restaurant.editable.component.scss']
})
export class RestaurantEditableComponent implements OnInit {

  restaurant: Restaurant;
  editing: boolean;
  imageUrlRegex = /^(https?:\/\/?.*)|(data:image\/jpeg.*)/i;
  @ViewChild('restaurantForm',{static:false}) public restaurantForm: NgForm;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<RestaurantEditableComponent>,
              private snackBar: MatSnackBar) {
    this.restaurant = data.restaurant;
    this.editing = data.editing;
  }

  ngOnInit() {
  }

  validate(){
    if (!this.restaurantForm.valid){
      this.snackBar.open("Please check the all the fields for the restaurant", "", {duration: 3000});
      return;
    }
    this.dialogRef.close(true);
  }
}
