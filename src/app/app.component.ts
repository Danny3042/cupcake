// src/app/app.component.ts
import { Component } from '@angular/core';
import { AsyncPipe, NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from './models/product.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, RouterLink, MatButtonModule, RouterOutlet, NgIf, NgFor, MatCardModule, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cupcake';
  isHandset$: Observable<boolean>;
  products: Product[] = [
    { id: 1, name: 'Product 1', price: 10, description: 'Description 1', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2', imageUrl: 'https://via.placeholder.com/150' },
    // Add more products as needed
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cartService: CartService,
    private router: Router
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }


  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']).then(success => {
      if (!success) {
        console.error('Navigation to cart failed!');
      }
    });
  }

  viewProduct(productId: number) {
    this.router.navigate(['/products', productId]).then(r => console.log(r));
  }
}
