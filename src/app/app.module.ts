import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularMaterialModule } from 'src/angular-material/angular-material.module';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashComponent } from './splash/splash.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RatingComponent } from './rating/rating.component';
import * as fromCritic  from 'src/state/reducers';
import * as Effects  from 'src/state/effects';
import { RestaurantCardComponent } from './restaurant.card/restaurant.card.component';
import { RestaurantDetailComponent } from './restaurant.detail/restaurant.detail.component';
import { ReviewCardComponent } from './review.card/review.card.component';
import { RestaurantEditableComponent } from './restaurant.editable/restaurant.editable.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ReviewPendingComponent } from './review.pending/review.pending.component';
import { UsersComponent } from './users/users.component';
import { UserCardComponent } from './user.card/user.card.component';
import { UserEditableComponent } from './user.editable/user.editable.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    RestaurantsComponent,
    RegisterComponent,
    RatingComponent,
    RestaurantCardComponent,
    RestaurantDetailComponent,
    ReviewCardComponent,
    RestaurantEditableComponent,
    ReviewPendingComponent,
    UsersComponent,
    UserCardComponent,
    UserEditableComponent,
      ConfirmationComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    SocialLoginModule,
    GooglePlaceModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([Effects.CriticEffects]),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true
        }
      }
    ),
    StoreModule.forFeature(
      fromCritic.featureKey,
      fromCritic.reducer
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '<PLEASE ADD YOUR CLIENT ID HERE>'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
