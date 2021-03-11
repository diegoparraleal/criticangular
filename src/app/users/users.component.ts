import { ConfirmationComponent } from './../confirmation/confirmation.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as CriticStoreSelectors from 'src/state/selectors';
import * as CriticStoreActions from 'src/state/actions';
import { AppUser } from 'src/state/models';
import { MatDialog } from '@angular/material/dialog';
import { UserEditableComponent } from '../user.editable/user.editable.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  searchText: string = "";
  users$ : Observable<AppUser[]> = this.store.select(CriticStoreSelectors.GetUsers);

  constructor(private store: Store,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.store.dispatch(CriticStoreActions.LoadUsers({name: this.searchText}));
  }

  clearTextFilter(){
    this.searchText = "";
  }

  filterUsersByText(){
    this.loadUsers();
  }

  deleteUser(user: AppUser){
    const dialogRef = this.dialog.open(ConfirmationComponent, {data: "Are you sure you want to delete this user?"});
    dialogRef.afterClosed().subscribe(result => {
      if (result == true){
        this.store.dispatch(CriticStoreActions.DeleteUser({userId: user.id}));
      }
    });
  }

  editUser(user: AppUser){
    let updatedUser = Object.assign({}, user);
    const dialogRef = this.dialog.open(UserEditableComponent, {data: updatedUser, disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
      if (result == true){
        this.store.dispatch(CriticStoreActions.EditUser({user: updatedUser}));
      }
    });
  }

}
