import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  public alert;
  public token;
  public identity;
  constructor(
    private _userSevice: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { 

    this.user = new User(null, "", "", "ROLE_USER", "", "", "", "");

  }

  ngOnInit(): void {
  }


  public onSubmit() {
    //console.log(this.user);

    this._userSevice.login(this.user).subscribe(
      response => {
      
        if(response.status != error){
          this.token = response;
          localStorage.setItem('token',JSON.stringify(response));

          console.log(this.token);   

          this.getUser();    
        }else{
          this.alert= response.message
        }           

      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          this.alert = error.error.message;
          console.log(error);

        }
      }

    );
  }


  getUser(){
    this._userSevice.login(this.user,true).subscribe(
      response => {
        
       this.identity= response;
       console.log(this.identity);
       localStorage.setItem('identity', JSON.stringify(this.identity));
       this._router.navigate(['/inicio']);

      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          this.alert = error.error.message;
          console.log(error);

        }
      }

    );

  }

}
