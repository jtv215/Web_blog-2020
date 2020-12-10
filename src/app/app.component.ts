import { UserService } from './services/user.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'blog-angular';
  public identity;
  public token;

  constructor(
    private _userSevice: UserService,
    private _router: Router
  ) {
    this.loadUser();
  }

  logout() {

    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear()
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
  }


 ngOnInit() {
  

  }

  //cada vez que se produce un cambio en el local store se ejecuta
  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity= this._userSevice.getIdentity();
    this.token = this._userSevice.getToken();
  }

}
