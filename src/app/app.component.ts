import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import {Router, RouterOutlet} from '@angular/router';
import { Product } from './models/product.model';
import { CartService } from './services/cart.service';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {AppModule} from './app.module';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    NavbarComponent,
    RouterOutlet,
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cupcake';
  isHandset$: Observable<boolean>;
  @ViewChild('drawer') sidenav: MatSidenav | undefined;
  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }
}
