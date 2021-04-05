import { Component, OnInit } from '@angular/core';

interface RegisterState {
  "email": string;
  "username": string;
  "password": string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData: RegisterState = {
    "email": "",
    "username": "",
    "password": ""
  }

  buttonIsEnabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  shouldButtonBeEnabled(): void {
    if (this.registerUserData.email != "" && this.registerUserData.username != "" && this.registerUserData.password != "") {
      this.buttonIsEnabled = true;
    } else {
      this.buttonIsEnabled = false;
    }
  }

  modelChange(modifiedValue: string, name: string): void {
    this.registerUserData[name] = modifiedValue;
    this.shouldButtonBeEnabled();
  }

}
