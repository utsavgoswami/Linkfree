import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() showNavbarItems: boolean = true;
  isLoggedIn: boolean;
  burgerMenuExpanded: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleBurgerMenu() {
    this.burgerMenuExpanded = !this.burgerMenuExpanded;
  }
}
