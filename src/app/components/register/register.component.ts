import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public title;
  public user;
  public alert;

  constructor(
    private _userSevice: UserService,
  ) {
    this.title = 'Registrate';
    this.user = new User(null, "", "", "ROLE_USER", "", "", "", "");

  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    console.log(this.user);



    this._userSevice.register(this.user).subscribe(
      response => {
        console.log(response);
        let user = response['user'];
        //this.user = user;
        console.log(response.code);
        console.log(response['code']);


        if (response.code != 200) {
          this.alert = "Error al registrarse";
        } else {
          this.alert = "El registro se ha realizado correctamente " + this.user.email;
          this.user = new User(null, "", "", "ROLE_USER", "", "", "", "");
          form.reset();
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




}
