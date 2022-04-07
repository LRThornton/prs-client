import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user/user.class';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

   
  constructor(
    private http: HttpClient

  ) { }
  login(login: string, password: string): Observable<User>{
    return this.http.get(`http://localhost:47240/api/users/${login}/${password}`) as Observable<User>
  }

}
