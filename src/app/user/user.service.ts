import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  login(login: string, password: string): Observable<User>{
    return this.http.get(`http://localhost:41589/api/user/${login}/${password}`) as Observable<User>
  }

}
