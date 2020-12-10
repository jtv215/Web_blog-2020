import { GLOBAL } from './../../services/global';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public title;
  public user;
  public alert;
  public identity;
  public token;
  public url
  constructor(
    private _userSevice: UserService,
  ) {
    this.user = new User(null, "", "", "ROLE_USER", "", "", "", "");
    this.title = 'Modifica tus datos personales de usurio';
    this.url = GLOBAL.url;
  }


  ngOnInit(): void {
    this.alert = "";
    this.identity = this._userSevice.getIdentity();
    this.token = this._userSevice.getToken();
    console.log(this.alert);
    this.getUser();

  }

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .jpeg",
    maxSize: "50",
    uploadAPI: {
      url: GLOBAL.url + 'user/upload',
      headers: {
        "Authorization": this._userSevice.getToken(),
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube la imagen'

  };

  onSubmit(form) {
    this._userSevice.udpateUser(this.user, this.token).subscribe(
      response => {
        console.log(response);
        if (response.code == 200) {
          this.getUser2();
        } else {
          this.alert = "no se ha podido actualizar";
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

  getUser() {
    this._userSevice.getuser(this.identity.sub).subscribe(
      response => {
        this.user = response.user;

        if (response.code == 200) {
         // this.alert = "Se ha actualizado correctamente";
        } else {
          this.alert = "no se ha podido actualizar";
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

  getUser2() {
    this._userSevice.getuser(this.identity.sub).subscribe(
      response => {
        this.user = response.user;

        if (response.code == 200) {
          this.alert = "Se ha actualizado correctamente";
        } else {
          this.alert = "no se ha podido actualizar";
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

  uploadImage(datos) {
    let data = JSON.parse(datos.response);
    console.log(data);
    this.user.image = data.image;

  }


}