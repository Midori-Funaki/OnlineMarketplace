import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "./auth.service";
import { User } from '../models/User';


@Injectable()
export class UserService {
  user: User

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUser(): Observable<User> {
    return this.http.get<User>('/api/users/profile', {
      headers: new HttpHeaders().set(
        'Authorization', 'Bearer ' + this.authService.token)
    });
  }

}
