import { AppUser } from 'src/state/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'user-card',
  templateUrl: './user.card.component.html',
  styleUrls: ['./user.card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user:AppUser;
  @Output() onEditClick = new EventEmitter<AppUser>();
  @Output() onDeleteClick = new EventEmitter<AppUser>();

  constructor() { }

  ngOnInit() {
  }

  editUser(){
    this.onEditClick.emit(this.user);
  }

  deleteUser(){
    this.onDeleteClick.emit(this.user);
  }

}
