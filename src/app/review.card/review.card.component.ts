import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reply, Review } from 'src/state/models';

@Component({
  selector: 'review-card',
  templateUrl: './review.card.component.html',
  styleUrls: ['./review.card.component.scss']
})
export class ReviewCardComponent {

  reply: Reply;
  originalReview: Review;
  @Input() showReplyButton: boolean = false;
  @Input() showBorder:boolean = true;
  @Input() showEdit:boolean = false;
  @Input() showDelete:boolean = false;
  @Input() editable:boolean = false;
  @Input() review: Review;
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onAdd: EventEmitter<Review> = new EventEmitter<Review>();
  @Output() onEdit: EventEmitter<Review> = new EventEmitter<Review>();
  @Output() onDelete: EventEmitter<Review> = new EventEmitter<Review>();
  @Output() onReply: EventEmitter<Reply> = new EventEmitter<Reply>();
  @ViewChild('replyForm',{static:false}) public replyForm: NgForm;
  @ViewChild('reviewForm',{static:false}) public reviewForm: NgForm;

  constructor(private snackBar: MatSnackBar) {

  }

  ngOnChanges() {
    if (this.showReplyButton){
      this.reply = {};
    }
  }

  cancel(){
    this.onCancel.emit();
  }

  add(){
    if (!this.reviewForm.valid){
      this.snackBar.open("Please fill the all the fields for the review");
      return;
    }

    if (this.review.rating == 0){
      this.snackBar.open("Please assign a valid rating");
      return;
    }

    this.onAdd.emit(this.review);
  }

  postReply(){
    if (!this.replyForm.valid){
      this.snackBar.open("Please fill the reply field");
      return;
    }
    this.onReply.emit(this.reply);
  }

  editReview(){
    this.originalReview = this.review;
    this.review = Object.assign({}, this.review);
    if (this.review.reply != null)
      this.reply = Object.assign({}, this.review.reply);
    this.editable = true;
  }

  finishEdition(){
    this.editable = false;
    this.onEdit.emit(this.review);
    if (this.reply != null)
      this.onReply.emit(this.reply);
  }

  cancelEdition(){
    this.review = this.originalReview;
    this.editable = false;
  }

  deleteReview(){
    this.onDelete.emit(this.review);
  }

}
