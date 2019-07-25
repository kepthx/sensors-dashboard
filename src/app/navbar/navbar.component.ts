import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  title = 'Sensors';
  showNavbar = false;

  constructor() { }

  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }

  ngOnInit() {
  }

}
