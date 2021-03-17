import { SocialUser } from 'angularx-social-login';
import { Reply, Restaurant, Review, AppUser } from 'src/state/models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiURL = environment.apiUrl;
  defaultHeaders: HttpHeaders;
  user: SocialUser;

  constructor(private httpClient: HttpClient) {

    var sUser = localStorage.getItem('user');
    if (sUser != null ){
      this.initializeUser(JSON.parse(sUser));
    } else {
      this.initializeHeaders();
    }
  }

  public loadAppUser(user: SocialUser):Observable<any> {
    this.initializeUser(user);
    return this.httpClient.get(`${this.apiURL}/users/byEmail/${user.email}`, { headers: this.defaultHeaders });
  }

  initializeUser(user: SocialUser){
    this.user = user;
    this.initializeHeaders(user);
  }

  initializeHeaders(user: SocialUser = null){
    this.defaultHeaders = new HttpHeaders();
    this.defaultHeaders = this.defaultHeaders.append('Content-Type', 'application/json');
    if (user != null)
      this.defaultHeaders = this.defaultHeaders.append('Authorization', 'Bearer ' + user.idToken);
  }

  createAppUser(appUser: any):Observable<any> {
    return this.httpClient.post(`${this.apiURL}/users/`, appUser, { headers: this.defaultHeaders });
  }

  getUsers(name: string = null): Observable<any> {
    let params = new HttpParams();
    if (name != null) params = params.append('name', name);
    return this.httpClient.get(`${this.apiURL}/users/`, {params,  headers: this.defaultHeaders });
  }

  editUser(user: AppUser) {
    return this.httpClient.put(`${this.apiURL}/users/${user.id}`, user, { headers: this.defaultHeaders });
  }

  deleteUser(userId: number) {
    return this.httpClient.delete(`${this.apiURL}/users/${userId}`, { headers: this.defaultHeaders });
  }

  getRestaurants(rating:number = null, name: string = null, ownerId: number = null, page: number = 0): Observable<any> {
    let params = new HttpParams();
    if (rating != null) params = params.append('rating', rating.toString());
    if (name != null) params = params.append('name', name);
    if (ownerId != null) params = params.append('ownerId', ownerId.toString());
    if (page != null) params = params.append('page', page.toString());
    return this.httpClient.get(`${this.apiURL}/restaurants/`, { params:params, headers: this.defaultHeaders });
  }

  getRestaurant(id:number): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/restaurants/${id}`, { headers: this.defaultHeaders });
  }

  getRestaurantReviews(restaurantId: number, page: number): Observable<any>{
    let params = new HttpParams();
    if (page != null) params = params.append('page', page.toString());
    return this.httpClient.get(`${this.apiURL}/restaurants/${restaurantId}/reviews`, { params:params, headers: this.defaultHeaders });
  }

  addRestaurant(restaurant: Restaurant) {
    return this.httpClient.post(`${this.apiURL}/restaurants/`, restaurant, { headers: this.defaultHeaders });
  }

  editRestaurant(restaurant: Restaurant) {
    return this.httpClient.put(`${this.apiURL}/restaurants/${restaurant.id}`, restaurant, { headers: this.defaultHeaders });
  }

  deleteRestaurant(restaurantId: number) {
    return this.httpClient.delete(`${this.apiURL}/restaurants/${restaurantId}`, { headers: this.defaultHeaders });
  }

  postReview(restaurantId:number, review:Review){
    return this.httpClient.post(`${this.apiURL}/restaurants/${restaurantId}/reviews`, review, { headers: this.defaultHeaders });
  }

  editReview(restaurantId:number, review:Review){
    return this.httpClient.post(`${this.apiURL}/restaurants/${restaurantId}/reviews/${review.id}`, review, { headers: this.defaultHeaders });
  }

  deleteReview(restaurantId:number, reviewId: number) {
    return this.httpClient.delete(`${this.apiURL}/restaurants/${restaurantId}/reviews/${reviewId}`, { headers: this.defaultHeaders });
  }

  getPendingReviews(ownerId: number): Observable<any> {
    let params = new HttpParams();
    if (ownerId != null) params = params.append('ownerId', ownerId.toString());
    return this.httpClient.get(`${this.apiURL}/reviews/pending/`, { params, headers: this.defaultHeaders });
  }

  postReply(restaurantId:number, reviewId:number, reply:Reply){
    return this.httpClient.post(`${this.apiURL}/restaurants/${restaurantId}/reviews/${reviewId}/reply`, reply, { headers: this.defaultHeaders });
  }
}
