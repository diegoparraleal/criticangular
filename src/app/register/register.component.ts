import { AppUser, Role } from './../../state/models';
import { SocialUser } from 'angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/services/api.service';
import * as CriticStoreSelectors from 'src/state/selectors';
import * as CriticStoreActions from 'src/state/actions';

@Component({
  selector: 'critic-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public user: SocialUser;

  constructor(private router: Router,
              private store: Store) { }

  ngOnInit() {
    this.store.select(CriticStoreSelectors.GetCurrentUser).subscribe(user => this.user = user);
    this.store.select(CriticStoreSelectors.GetCurrentAppUser).subscribe(appUser => this.onAppUserCreated(appUser));
  }

  onAppUserCreated(appUser: AppUser){
    if (appUser != null) this.goToRestaurants();
  }

  selectRestaurantClient(){
    this.createAppUser({
      name: this.user.name,
      email: this.user.email,
      image: this.user.photoUrl,
      role:  Role.User
    });
  }

  selectRestaurantOwner(){
    this.createAppUser({
      name: this.user.name,
      email: this.user.email,
      image: this.user.photoUrl,
      role:  Role.Owner
    });
  }

  createAppUser(user: AppUser){
    this.store.dispatch(CriticStoreActions.CreateAppUser({user: user}));
  }

  goToRestaurants(){
    this.router.navigate(['/restaurants']);
  }
}
