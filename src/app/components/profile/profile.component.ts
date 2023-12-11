import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { MovietouchService } from 'src/app/service/movietouch.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private movieSrv: MovietouchService) {}

  user!: User | undefined;

  ngOnInit(): void {
    this.user = this.movieSrv.getUserInfo()?.user;
  }
}
