import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


interface RegisterState {
  "Email": string;
  "UserName": string;
  "Password": string;
  "ConfirmPassword": string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData: RegisterState = {
    "Email": "",
    "UserName": "",
    "Password": "",
    "ConfirmPassword": ""
  }

  buttonIsEnabled: boolean = false;

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  shouldButtonBeEnabled(): void {
    if (this.registerUserData.Email != "" && this.registerUserData.UserName != "" && this.registerUserData.Password != "" && this.registerUserData.ConfirmPassword != "") {
      this.buttonIsEnabled = true;
    } else {
      this.buttonIsEnabled = false;
    }
  }

  modelChange(): void {
    this.shouldButtonBeEnabled();
  }

  registerUser(): void {
    this._auth.registerUser(this.registerUserData)
        .subscribe(
          res => {
            localStorage.setItem('token', res.token);
            this._router.navigate(['/dashboard']);
          },
          err => console.log(err)
        );
  }

}
