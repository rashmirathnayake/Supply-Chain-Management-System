import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetUserResponse } from '../model/getuser-response.model';
import { User } from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private successfulLogin:boolean=false;

  private baseUrl='http://localhost:8000/api/login';
  constructor(private http :HttpClient) { }

  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'}),
  };

  getUserCount(user :User) : Observable<GetUserResponse>{
    return this.http.post<GetUserResponse>(this.baseUrl, user ,this.httpOptions)
  }




}
