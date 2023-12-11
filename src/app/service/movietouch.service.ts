import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favourite } from '../models/favourite';
import { Movie } from '../models/movie';
import { environment } from 'src/environments/environment';
import { Auth } from '../auth/auth';

@Injectable({
  providedIn: 'root',
})
export class MovietouchService {
  apiURL = environment.apiURL;
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<Movie[]>(`${this.apiURL}users`);
  }
  getMovie() {
    return this.http.get<Movie[]>(`${this.apiURL}movies-popular`);
  }
  getFavorite() {
    return this.http.get<Favourite[]>(`${this.apiURL}favorites`);
  }

  addFavorite(movieId: number, userId: number) {
    const favorite: Favourite = {
      movieId: movieId,
      userId: userId,
    };

    return this.http.post<Favourite>(`${this.apiURL}favorites`, favorite);
  }

  getUserId(): number {
    const user = localStorage.getItem('user');
    if (user) {
      const userData: Auth = JSON.parse(user);
      return userData.user.id;
    }
    return 0;
  }
  getUserInfo(): Auth | null {
    const user = localStorage.getItem('user');
    if (user) {
      const userInfo: Auth = JSON.parse(user);
      return userInfo;
    }
    return null;
  }
  removeFavorite(id: number) {
    return this.http.delete<Favourite>(`${this.apiURL}favorites/${id}`);
  }
}
