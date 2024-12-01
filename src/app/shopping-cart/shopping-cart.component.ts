// src/app/shopping-cart/shopping-cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  imports: [
    CurrencyPipe,
    NgForOf,
    NgIf,
    MatButton
  ],
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  items: Product[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.items = this.cartService.getItems();
    this.totalAmount = this.cartService.getTotalAmount();
    console.log("cart items", this.items);
  }

  removeItem(product: Product): void {
    this.cartService.removeItem(product);
    this.loadCart();
  }
}
