import { SocialUser } from 'angularx-social-login';
import { AppUser } from './../../state/models';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CriticStoreActions from 'src/state/actions';
import * as CriticStoreSelectors from 'src/state/selectors';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'critic-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  loggedIn: boolean;

  constructor(private router: Router,
              public ngZone: NgZone,
              private store: Store) { }

  ngOnInit(): void {

    this.store.select(CriticStoreSelectors.GetCurrentAppUser)
              .pipe(
                filter(user => user != null)
              )
              .subscribe(user => this.validateUser(user));

    this.store.select(CriticStoreSelectors.NeedsRegister)
              .subscribe((value) => this.redirectToRegister(value));
  }

  validateUser(user: AppUser){
    this.redirectToSecuredZone()
  }

  redirectToSecuredZone(){
    this.router.navigate(['/restaurants']);
  }

  redirectToRegister(value: boolean){
    if (value == true)
      this.router.navigate(['/register']);
  }

  authenticate(){
    this.store.dispatch(CriticStoreActions.Login());
  }
}
