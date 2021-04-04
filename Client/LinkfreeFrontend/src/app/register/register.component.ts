import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
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

  modelChange(modifiedValue, name: string) {
    this.registerUserData[name] = modifiedValue;

    // console.log("Value of " + name + " = " + this.registerUserData[name]);

    this.shouldButtonBeEnabled();
  }

}
