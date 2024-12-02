import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {ActivatedRoute, Route, Router, RouterOutlet} from '@angular/router';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { products } from '../products';
import {
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule
} from '@angular/material/card';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {CurrencyPipe, NgForOf} from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButtonModule,
    MatCardImage,
    CurrencyPipe,
    NgForOf,
    MatCardModule
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'cupcake';
  isHandset$: Observable<boolean>;
  products = products;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cartService: CartService,
    private router : Router,
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  addToCart(product: { price: number; imageUrl: string; name: string; description: string; id: number }) {
    const productWithQuantity = { ...product, quantity: 1 };
    this.cartService.addToCart(productWithQuantity);
    window.alert('Your product has been added to the cart!');
  }

  loadCart(): void {
    this.products = this.cartService.getItems();
  }

  loadProducts(): void {
    this.products = products;
  }
  ngOnInit(): void {
    this.loadProducts();
  }
  }
