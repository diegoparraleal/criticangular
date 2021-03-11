import { SocialUser } from "angularx-social-login";
import { ReplaySubject } from "rxjs";

export interface AppState{
  user?: SocialUser;
  appUser?: AppUser;
  users?: AppUser[];
  restaurants?: Restaurant[],
  restaurantsHaveMoreResults?: boolean,
  restaurantWithDetails? : RestaurantWithDetails,
  reviewsHaveMoreResults?: boolean,
  pendingReviews? : ReviewWithRestaurant[],
  needsRegister?: boolean;
}

export enum Role{
  None = "none",
  User = "user",
  Owner = "owner",
  Admin = "admin"
}

export interface AppUser{
  id?: number;
  name: string;
  email: string;
  image: string;
  role: Role;
}

export interface Restaurant{
  id?: number;
  name?: string;
  city?: string;
  address?: string;
  price?: number;
  image?: string;
  description?: string;
  rating?: number;
  owner?: number;
}

export interface RestaurantWithDetails{
  bestReview: Review;
  restaurant: Restaurant;
  reviews: Review[];
  worstReview: Review;
}

export interface Review{
  id?: number;
  comment: string;
  userImage?: string;
  user: number;
  date: Date;
  rating: number;
  reply?: Reply;
}

export interface ReviewWithRestaurant{
  review: Review;
  restaurant: Restaurant;
}

export interface Reply{
  id?: number;
  comment?: string;
  userImage?: string;
  date?: Date;
  user?: number;
}
