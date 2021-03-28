import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isLoggedIn: boolean;
  burgerMenuExpanded: boolean = true;

  toggleBurgerMenu() {
    this.burgerMenuExpanded = !this.burgerMenuExpanded;
  }
}
