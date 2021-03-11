import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'star-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input()  starCount: number = 5;
  @Input()  color: string = 'accent';
  @Input()  editable: boolean = true;
  @Input()  rating: number = 3;
  @Input()  showText: boolean = true;
  @Input()  showRatingMessage: boolean = true;
  @Output() ratingChanged:EventEmitter<number> = new EventEmitter<number>();

  snackBarDuration: number = 2000;
  ratingArr = [];

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating:number) {
    if (!this.editable) return;
    if (this.showRatingMessage){
      this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
        duration: this.snackBarDuration
      });
    }
    this.rating = rating;
    this.ratingChanged.emit(this.rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else if (this.rating >=  index + 0.5 ) {
      return 'star_half';
    } else {
      return 'star_border';
    }
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
