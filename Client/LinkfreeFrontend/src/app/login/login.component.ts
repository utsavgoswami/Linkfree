import { Component, OnInit } from '@angular/core';
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

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  shouldButtonBeEnabled(): void {
    if (this.loginUserData.UserName != "" && this.loginUserData.Password != "") {
      this.buttonIsEnabled = true;
    } else {
      this.buttonIsEnabled = false;
    }
  }

  modelChange(modifiedValue: string, name: string): void {
    this.loginUserData[name] = modifiedValue;
    this.shouldButtonBeEnabled();
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
        .subscribe(
          res => console.log(res),
          err => console.log(err)
        );
  }

}
