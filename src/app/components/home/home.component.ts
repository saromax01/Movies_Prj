import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovietouchService } from 'src/app/service/movietouch.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Favourite } from 'src/app/models/favourite';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userId: number = 0;
  movies: Movie[] | undefined;
  favorite!: Favourite[];
  constructor(
    private movieSrv: MovietouchService,
    private authSrv: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.movieSrv.getUserId();
    this.movieSrv.getMovie().subscribe((movie: Movie[]) => {
      this.movies = movie;
      this.getFavorite();
    });
  }

  isFavorite(movieId: number): boolean {
    return (
      Array.isArray(this.favorite) &&
      this.favorite.some((movie) => movie.movieId === movieId)
    );
  }

  addoRem(movieId: number) {
    if (this.isFavorite(movieId)) {
      let val: any = this.favorite.find((movie) => movie.movieId === movieId);
      if (val) {
        this.removeFavorite(val.id);
      }
    } else {
      this.addFavorite(movieId);
    }
  }

  removeFavorite(id: number) {
    this.movieSrv.removeFavorite(id).subscribe(() => {
      this.getFavorite();
    });
  }
  addFavorite(movieId: number) {
    this.movieSrv
      .addFavorite(movieId, this.userId)
      .subscribe((favorite: Favourite) => {
        this.getFavorite();
      });
  }

  getFavorite() {
    this.movieSrv.getFavorite().subscribe((favorite: Favourite[]) => {
      let userFavorite: Favourite[] = favorite.filter(
        (movie) => movie.userId === this.userId
      );
      this.favorite = userFavorite;
    });
  }
}
