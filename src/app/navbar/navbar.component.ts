import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatAnchor} from '@angular/material/button';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbar,
    MatAnchor,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
