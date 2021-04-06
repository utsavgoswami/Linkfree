import { Component, OnInit } from '@angular/core';
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

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  shouldButtonBeEnabled(): void {
    if (this.registerUserData.Email != "" && this.registerUserData.UserName != "" && this.registerUserData.Password != "") {
      this.buttonIsEnabled = true;
    } else {
      this.buttonIsEnabled = false;
    }
  }

  modelChange(modifiedValue: string, name: string): void {
    this.registerUserData[name] = modifiedValue;
    this.shouldButtonBeEnabled();
  }

  registerUser(): void {
    this._auth.registerUser(this.registerUserData)
        .subscribe(
          res => {
            localStorage.setItem('token', res.token);
          },
          err => console.log(err)
        );
  }

}
