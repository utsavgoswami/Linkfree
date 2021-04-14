import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface LoginState {
  "UserName": string;
  "Password": string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData: LoginState = {
    "UserName": "",
    "Password": ""
  }

  buttonIsEnabled: boolean = false;

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  shouldButtonBeEnabled(): void {
    if (this.loginUserData.UserName != "" && this.loginUserData.Password != "") {
      this.buttonIsEnabled = true;
    } else {
      this.buttonIsEnabled = false;
    }
  }

  modelChange(): void {
    this.shouldButtonBeEnabled();
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
        .subscribe(
          res => {
            localStorage.setItem('token', res.token);
            this._router.navigate(['/dashboard']);
          },
          err => console.log(err)
        );
  }

}
