import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }


  register(obj): Observable<any> {
    let json = JSON.stringify(obj);
    let params = 'json=' + json;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded',
      })
      //aplicacion /x-ww form- es como un formulario de html
    };
    return this._http.post(this.url + 'register', params, httpOptions);
  }


  login(user, gettoken = null): Observable<any> {
    if (gettoken != null) {
      user.gettoken = true;
    }
    let json = JSON.stringify(user);
    let params = 'json=' + json;

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded',
      })
    }
    return this._http.post(this.url + 'login', params, httpOptions);
  }


  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));
    if (identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  udpateUser(user, token): Observable<any> {

    let json = JSON.stringify(user);
    let params = "json=" + json;

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': token

      })
    };

    return this._http.put(this.url + 'user/update', params, httpOptions);
  }

  getuser(id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded'

      })
    };

    return this._http.get(this.url + 'user/' + id, httpOptions);
  }

}
