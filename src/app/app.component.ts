import { AppUser } from './../state/models';
import { SocialUser } from 'angularx-social-login';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CriticStoreSelectors from 'src/state/selectors';
import * as CriticStoreActions from 'src/state/actions';
import { delay, filter} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public user: SocialUser;
  public appUser: AppUser;

  constructor(private router: Router,
              private store: Store) {

  }

  ngOnInit(){
    this.store.dispatch(CriticStoreActions.Init());
  }

  ngAfterViewInit(){
    this.store.select(CriticStoreSelectors.GetCurrentUser)
              .pipe(delay(0))
              .subscribe(user => this.checkUser(user));

    this.store.select(CriticStoreSelectors.GetCurrentAppUser)
              .pipe(
                delay(0),
                filter(user => user != null)
              )
              .subscribe(user => this.appUser = user);
  }

  checkUser(user: SocialUser){
    this.user = user;
    if (user == null){
      this.appUser = null;
      this.router.navigate(['']);
    } else {
      this.store.dispatch(CriticStoreActions.LoadAppUser({user: user}));
    }
  }

  logout(){
    this.store.dispatch(CriticStoreActions.Logout());
  }

  goToRestaurants(){
    this.router.navigate(['/restaurants']);
  }

  goToPendingReviews(){
    this.router.navigate(['/pendingReviews']);
  }

  goToUsers(){
    this.router.navigate(['/users']);
  }
}
