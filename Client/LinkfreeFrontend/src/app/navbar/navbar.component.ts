import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() showNavbarItems: boolean = true;

  @Input()
  isLoggedIn: boolean;
  
  burgerMenuExpanded: boolean = false;

  @Input()
  internalRouteButtonText: string = "sign up free";

  @Input()
  internalRoute: string = "register";

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    if (!this.showNavbarItems) {
      this.burgerMenuExpanded = false;
    }
  }

  toggleBurgerMenu() {
    this.burgerMenuExpanded = !this.burgerMenuExpanded;
  }

  logout() {
    this._authService.logoutUser();
  }
}
