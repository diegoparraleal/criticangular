import { AppUser } from 'src/state/models';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'user-editable',
  templateUrl: './user.editable.component.html',
  styleUrls: ['./user.editable.component.scss']
})
export class UserEditableComponent implements OnInit {
  @ViewChild('userForm',{static:false}) public userForm: NgForm;

  constructor(@Inject(MAT_DIALOG_DATA) public user: AppUser,
              private dialogRef: MatDialogRef<UserEditableComponent>,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  validate(){
    if (!this.userForm.valid){
      this.snackBar.open("Please check the all the fields for the user", "", {duration: 3000});
      return;
    }
    this.dialogRef.close(true);
  }

}
