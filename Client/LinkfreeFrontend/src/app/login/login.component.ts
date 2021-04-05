import { Component, OnInit } from '@angular/core';

interface LoginState {
  "username": string;
  "password": string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData: LoginState = {
    "username": "",
    "password": ""
  }

  buttonIsEnabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  shouldButtonBeEnabled(): void {
    if (this.loginUserData.username != "" && this.loginUserData.password != "") {
      this.buttonIsEnabled = true;
    } else {
      this.buttonIsEnabled = false;
    }
  }

  modelChange(modifiedValue: string, name: string): void {
    this.loginUserData[name] = modifiedValue;
    this.shouldButtonBeEnabled();
  }

}
