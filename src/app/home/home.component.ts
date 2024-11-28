import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {CurrencyPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardImage,
    CurrencyPipe,
    NgForOf,
    MatCardModule,
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'cupcake';
  isHandset$: Observable<boolean>;
  products: Product[] = [
    { id: 1, name: 'Product 1', price: 10, description: 'Description 1', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2', imageUrl: 'https://via.placeholder.com/150' },
    // Add more products as needed
  ];
  loading$: Observable<boolean>;

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
    this.loading$ = this.cartService.loading$;
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
