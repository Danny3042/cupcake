import {Component, OnDestroy, OnInit} from '@angular/core';
import { CartService } from '../services/cart.service';
import {CartItem, Product} from '../models/product.model';
import { products } from '../products';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import { CommonModule, CurrencyPipe, NgForOf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {Subscription, window} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    CurrencyPipe,
    MatCardContent,
    MatCardImage,
    MatCardActions,
    MatButton,
    NgForOf,
    CommonModule
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  products = products;

  cartItems: CartItem[] = [];
  private cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    const productWithQuantity = { ...product, quantity: 1 };
    this.cartService.addToCart(productWithQuantity);
  }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCartItems().subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }
}
