import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserInterface } from '../shared/interfaces/user-interface';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authURL = environment.API_URL;
  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getLogged());

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  registerUser(name: string, email: string, password: string) {
    const urlApi = `${this.authURL}users/register/`;
    return this.http
      .post<UserInterface>(
        urlApi,
        { name, email, password },
        { headers: this.headers }
      )
      .pipe(tap(data => data),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  loginUser(email: string, password: string): Observable<any> {
    const urlApi = `${this.authURL}users/login/`;
    return this.http
      .post<UserInterface>(
        urlApi,
        { name, email, password },
        { headers: this.headers }
      )
      .pipe(tap((data: any) => {
        //console.log("LoginUser-DATA",data.id_user);
        if (data.id_user && data.token && data.name_user) {
          localStorage.setItem('isLogged', 'true');
          this.isLogged.next(true);
        }
        return data;
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        }));
  }

  setQuestion(question: any): void {
    const questionString = JSON.stringify(question);
    //console.log("setQuestion",question,questionString);
    sessionStorage.setItem('currentQuestion', question);
  }

  getQuestion() {
    const currentQuestion = sessionStorage.getItem('currentQuestion');
    if (!(currentQuestion === undefined || currentQuestion === null)) {
      return currentQuestion;
    } else {
      return null;
    }
  }

  setUser(user: any): void {
    const userString = JSON.stringify(user);
    //console.log("setUser",user,userString);
    sessionStorage.setItem('currentUser', user);
  }

  getUser() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (!(currentUser === undefined || currentUser === null)) {
      return currentUser;
    } else {
      return null;
    }
  }

  setName(name: UserInterface): void {
    const nameString = JSON.stringify(name);
    //console.log("setName",name,nameString);
    sessionStorage.setItem('currentName', nameString);
  }

  getName() {
    const currentName = sessionStorage.getItem('currentName');
    if (!(currentName === undefined || currentName === null)) {
      return currentName;
    } else {
      return null;
    }
  }

  setToken(token): void {
    localStorage.setItem('accessToken', token);
  }

  getToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (!(accessToken === undefined || accessToken === null)) {
      return accessToken;
    } else {
      return null;
    }
  }

  logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLogged');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentName');
    sessionStorage.removeItem('currentQuestion');
  }

  getLogged(): boolean {
    if (localStorage.getItem('isLogged') === 'true') {
      return true;
    } else { return false; }
  }
}
