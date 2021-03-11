import { UsersComponent } from './users/users.component';
import { ReviewPendingComponent } from './review.pending/review.pending.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { RestaurantDetailComponent } from './restaurant.detail/restaurant.detail.component';

const routes: Routes = [
  { path: '', component: SplashComponent},
  { path: 'restaurants', component: RestaurantsComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'restaurants/:id', component: RestaurantDetailComponent},
  { path: 'pendingReviews', component: ReviewPendingComponent},
  { path: 'users', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
