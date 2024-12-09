import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
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
export class HomeComponent {
  products = products;

  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    const productWithQuantity = { ...product, quantity: 1 };
    this.cartService.addToCart(productWithQuantity);
    window.alert('Your product has been added to the cart!');
  }
}
